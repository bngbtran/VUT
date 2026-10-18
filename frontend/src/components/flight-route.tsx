"use client";

import { useEffect, useState } from "react";
import type { FlightStatus } from "@/types/flight";
import { PLANE_PATH } from "@/lib/brand";

/** Thanh hành trình: máy bay chạy theo tiến độ thực tế (tính ở trình duyệt, cập nhật mỗi phút). */
export function FlightRoute({
  from,
  to,
  departEpoch,
  arriveEpoch,
  status,
}: {
  from: string;
  to: string;
  departEpoch: number | null;
  arriveEpoch: number | null;
  status: FlightStatus;
}) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 60_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  let progress = 0;
  if (status === "landed") progress = 1;
  else if (status === "active" && departEpoch && arriveEpoch && now)
    progress = Math.min(0.97, Math.max(0.03, (now - departEpoch) / (arriveEpoch - departEpoch)));

  const pct = `${progress * 100}%`;
  const muted = status === "cancelled";

  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-2xl font-bold sm:text-3xl">{from}</span>
      <div className="relative h-10 flex-1">
        <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-ink-700" />
        <div
          className="absolute top-1/2 left-0 h-0.5 -translate-y-px rounded bg-gradient-to-r from-terracotta/0 to-terracotta transition-[width] duration-700"
          style={{ width: pct }}
        />
        <span className="absolute top-1/2 left-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink-500" />
        <span className="absolute top-1/2 right-0 size-2.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-ink-500" />
        <svg
          viewBox="-12 -12 24 24"
          className={`absolute top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-700 ${
            muted ? "text-ink-500" : "text-terracotta"
          }`}
          style={{ left: pct }}
          aria-hidden
        >
          <path d={PLANE_PATH} transform="rotate(90)" fill="currentColor" />
        </svg>
      </div>
      <span className="font-mono text-2xl font-bold sm:text-3xl">{to}</span>
    </div>
  );
}
