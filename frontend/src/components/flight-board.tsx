"use client";

import Link from "next/link";
import { useState } from "react";
import type { BoardType, Flight } from "@/types/flight";
import { StatusBadge } from "@/components/status-badge";
import { clock } from "@/lib/time";
import type { Weather } from "@/lib/weather";
import { WeatherIcon } from "@/components/weather-icon";

const COLS = "md:grid-cols-[5.5rem_6.5rem_1fr_5.5rem_4.5rem_4rem_9rem]";

export function FlightBoard({
  flights,
  type,
  airport,
  weather = {},
}: {
  flights: Flight[];
  type: BoardType;
  airport: string;
  /** Thời tiết theo mã sân bay (đầu còn lại của mỗi chuyến) */
  weather?: Record<string, Weather>;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const side = type === "departure" ? "departure" : "arrival";
  const other = type === "departure" ? "arrival" : "departure";
  const visible = q
    ? flights.filter((f) =>
        [f.code, f[other].iata, f[other].city, f.airline].some((v) => v.toLowerCase().includes(q)),
      )
    : flights;

  return (
    <div className="card overflow-hidden">
      <div className="border-b border-white/5 p-3">
        <label className="relative block">
          <span className="sr-only">Lọc bảng giờ bay</span>
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Lọc theo chuyến, hãng, ${type === "departure" ? "điểm đến" : "điểm đi"}…`}
            className="w-full rounded-xl bg-ink-950/60 py-2.5 pr-3 pl-10 text-sm text-bone placeholder:text-ink-500 focus:ring-2 focus:ring-slate/50 focus:outline-none"
          />
        </label>
      </div>

      <div
        className={`hidden gap-4 px-5 py-3 text-[11px] font-semibold uppercase tracking-widest text-ink-500 md:grid ${COLS}`}
      >
        <span>Giờ</span>
        <span>Chuyến</span>
        <span>{type === "departure" ? "Điểm đến" : "Điểm đi"}</span>
        <span>Thời tiết</span>
        <span>Nhà ga</span>
        <span>Cổng</span>
        <span>Trạng thái</span>
      </div>

      <ul className="divide-y divide-white/5">
        {visible.map((f) => {
          const sched = f[side].scheduled;
          const est = f[side].actual ?? f[side].estimated;
          const changed = est && sched && clock(est) !== clock(sched);
          return (
            <li key={`${f.code}-${f.date}`}>
              <Link
                href={`/flight/${f.code}?from=${airport}&type=${type}`}
                className={`grid grid-cols-[4.5rem_1fr_auto] items-center gap-x-4 gap-y-1 px-5 py-3.5 transition-colors hover:bg-white/[0.03] ${COLS}`}
              >
                <div className="font-mono">
                  <div className={`text-lg font-bold ${changed ? "text-status-delayed" : "text-clay"}`}>
                    {clock(changed ? est : sched)}
                  </div>
                  {changed && <div className="text-xs text-ink-500 line-through">{clock(sched)}</div>}
                </div>
                <div className="min-w-0">
                  <div className="font-mono font-semibold">{f.code}</div>
                  <div className="flex items-center gap-1.5 text-xs text-ink-500 md:hidden">
                    <span className="truncate">
                      {f[other].city} · {f[other].iata}
                    </span>
                    <WeatherChip w={weather[f[other].iata]} />
                  </div>
                </div>
                <div className="hidden min-w-0 md:block">
                  <div className="font-semibold break-words">{f[other].city}</div>
                  <div className="text-xs break-words text-ink-500">
                    {f[other].iata} · {f.airline}
                  </div>
                </div>
                <div className="hidden md:block">
                  <WeatherChip w={weather[f[other].iata]} big />
                </div>
                <div className="hidden font-mono text-ink-300 md:block">{f[side].terminal ?? "—"}</div>
                <div className="hidden font-mono text-lg font-bold md:block">{f[side].gate ?? "—"}</div>
                <div className="justify-self-end text-right md:justify-self-start md:text-left">
                  <StatusBadge status={f.status} />
                  {f[side].gate && (
                    <div className="mt-1 font-mono text-xs text-ink-300 md:hidden">Cổng {f[side].gate}</div>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
        {visible.length === 0 && (
          <li className="px-5 py-12 text-center text-ink-500">
            {flights.length === 0
              ? "Chưa có chuyến bay nào trong dữ liệu hiện tại."
              : `Không có chuyến nào khớp với “${query}”.`}
          </li>
        )}
      </ul>
    </div>
  );
}

function WeatherChip({ w, big }: { w?: Weather; big?: boolean }) {
  if (!w) return big ? <span className="text-ink-500">—</span> : null;
  return (
    <span className="inline-flex shrink-0 items-center gap-1 text-ink-300" title={w.description}>
      <WeatherIcon kind={w.kind} isDay={w.isDay} className={big ? "size-5" : "size-3.5"} />
      <span className={big ? "text-sm font-medium" : ""}>{w.temperature}°</span>
    </span>
  );
}

export function FlightBoardSkeleton() {
  return (
    <div className="card animate-pulse overflow-hidden" aria-busy>
      <div className="border-b border-white/5 p-3">
        <div className="h-10 rounded-xl bg-ink-800" />
      </div>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="flex items-center gap-6 border-b border-white/5 px-5 py-4">
          <div className="h-5 w-14 rounded bg-ink-700" />
          <div className="h-5 w-16 rounded bg-ink-700" />
          <div className="h-5 flex-1 rounded bg-ink-800" />
          <div className="h-6 w-20 rounded-full bg-ink-800" />
        </div>
      ))}
    </div>
  );
}
