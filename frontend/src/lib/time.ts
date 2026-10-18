// aviationstack trả giờ ĐỊA PHƯƠNG của sân bay nhưng gắn nhãn "+00:00".
// Vì vậy ta giữ dạng "YYYY-MM-DDTHH:mm" (giờ địa phương) và chỉ quy đổi sang epoch khi cần tính toán.

/** "2026-10-18T15:30:00+00:00" → "2026-10-18T15:30" */
export function stripOffset(iso: string | null | undefined): string | null {
  return iso ? iso.slice(0, 16) : null;
}

/** "2026-10-18T15:30" → "15:30" */
export function clock(local: string | null | undefined): string {
  return local ? local.slice(11, 16) : "—";
}

function tzOffsetMs(utcMs: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(utcMs));
  const p = Object.fromEntries(parts.map((x) => [x.type, x.value]));
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - utcMs;
}

/** Giờ địa phương + múi giờ IANA → epoch ms. */
export function localToEpoch(local: string | null, timeZone: string): number | null {
  if (!local) return null;
  const naive = Date.parse(`${local}:00Z`);
  if (Number.isNaN(naive)) return null;
  try {
    return naive - tzOffsetMs(naive, timeZone);
  } catch {
    return naive; // múi giờ lạ → coi như UTC
  }
}

/** 125 → "2 giờ 05 phút" */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h === 0) return `${m} phút`;
  return `${h} giờ ${String(m).padStart(2, "0")} phút`;
}

/** ISO (UTC) → "HH:mm" theo múi giờ cho trước. */
export function clockIn(isoUtc: string, timeZone: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(isoUtc));
}
