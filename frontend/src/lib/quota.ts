import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Giới hạn lượt gọi aviationstack mỗi tháng. Gói miễn phí cho 100 lượt → dừng ở 95, chừa 5 lượt dự phòng.
export const MONTHLY_CALL_LIMIT = 95;

const TZ = "Asia/Ho_Chi_Minh";
const KEY_PREFIX = "vut:aviationstack:calls:";
const KEY_TTL_SECONDS = 40 * 24 * 3600; // tự dọn key cũ sau ~40 ngày

export type QuotaDenied = { ok: false; code: "quota_exhausted" | "quota_store_missing" | "quota_store_error"; resetsOn: string };
export type QuotaUsage = { month: string; used: number; limit: number; store: "redis" | "file" | "missing" };

/** Tháng hiện tại theo giờ Việt Nam, vd "2026-10". */
function currentMonth(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit" }).format(new Date());
}

/** "2026-10" → "01/11/2026" (ngày mở lại lượt gọi). */
function firstOfNextMonth(month: string): string {
  const [y, m] = month.split("-").map(Number);
  const next = m === 12 ? { y: y + 1, m: 1 } : { y, m: m + 1 };
  return `01/${String(next.m).padStart(2, "0")}/${next.y}`;
}

// ---- Kho đếm -------------------------------------------------------------
// Ưu tiên Upstash Redis (bền, dùng chung mọi instance). Tên biến theo tích hợp Vercel Marketplace.

function redisConfig() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

function storeKind(): QuotaUsage["store"] {
  if (redisConfig()) return "redis";
  // Trên Vercel không có ổ đĩa bền → bắt buộc phải có Redis.
  return process.env.VERCEL ? "missing" : "file";
}

async function redis(commands: (string | number)[][]): Promise<unknown[]> {
  const cfg = redisConfig()!;
  const res = await fetch(`${cfg.url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}` },
    body: JSON.stringify(commands),
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  const out = (await res.json()) as { result?: unknown; error?: string }[];
  return out.map((r) => {
    if (r.error) throw new Error(r.error);
    return r.result;
  });
}

// File cục bộ cho môi trường dev (frontend/.quota/, đã gitignore).
const FILE = path.join(process.cwd(), ".quota", "aviationstack.json");

async function readFileCounts(): Promise<Record<string, number>> {
  try {
    return JSON.parse(await readFile(FILE, "utf8"));
  } catch {
    return {};
  }
}

async function addToFile(month: string, delta: number): Promise<number> {
  const counts = await readFileCounts();
  counts[month] = (counts[month] ?? 0) + delta;
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(counts, null, 2));
  return counts[month];
}

// ---- API -----------------------------------------------------------------

/**
 * Giữ chỗ 1 lượt gọi trước khi gọi aviationstack. Đếm cả lượt gọi lỗi (aviationstack vẫn tính).
 * Thiếu kho đếm hoặc kho lỗi → từ chối (an toàn hơn là gọi vượt hạn mức).
 */
export async function reserveCall(): Promise<{ ok: true } | QuotaDenied> {
  const month = currentMonth();
  const resetsOn = firstOfNextMonth(month);
  const store = storeKind();
  if (store === "missing") return { ok: false, code: "quota_store_missing", resetsOn };

  const key = KEY_PREFIX + month;
  try {
    if (store === "redis") {
      const [used] = (await redis([
        ["INCR", key],
        ["EXPIRE", key, KEY_TTL_SECONDS],
      ])) as [number];
      if (used > MONTHLY_CALL_LIMIT) {
        await redis([["DECR", key]]); // trả lại lượt vừa giữ để số đếm phản ánh đúng lượt đã gọi
        return { ok: false, code: "quota_exhausted", resetsOn };
      }
      return { ok: true };
    }
    const used = await addToFile(month, 1);
    if (used > MONTHLY_CALL_LIMIT) {
      await addToFile(month, -1);
      return { ok: false, code: "quota_exhausted", resetsOn };
    }
    return { ok: true };
  } catch {
    return { ok: false, code: "quota_store_error", resetsOn };
  }
}

/** Số lượt đã dùng trong tháng (cho /api/health). */
export async function getUsage(): Promise<QuotaUsage & { error?: true }> {
  const month = currentMonth();
  const store = storeKind();
  const base = { month, limit: MONTHLY_CALL_LIMIT, store };
  try {
    if (store === "redis") {
      const [v] = await redis([["GET", KEY_PREFIX + month]]);
      return { ...base, used: Number(v ?? 0) };
    }
    if (store === "file") return { ...base, used: (await readFileCounts())[month] ?? 0 };
    return { ...base, used: 0 };
  } catch {
    return { ...base, used: 0, error: true };
  }
}
