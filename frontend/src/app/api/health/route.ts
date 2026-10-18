import { connection } from "next/server";
import { getUsage } from "@/lib/quota";

// Kiểm tra cấu hình khi deploy: chỉ trả về có/không, KHÔNG BAO GIỜ trả giá trị key.
export async function GET() {
  await connection(); // đọc biến môi trường lúc chạy, không prerender lúc build
  const has = (name: string) => Boolean(process.env[name]?.trim());
  return Response.json({
    env: process.env.VERCEL_ENV ?? "local",
    commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
    AVIATIONSTACK_ACCESS_KEY: has("AVIATIONSTACK_ACCESS_KEY"),
    aviationstackQuota: await getUsage(),
  });
}
