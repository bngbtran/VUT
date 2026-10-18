"use client";

import { useState } from "react";
import type { Flight } from "@/types/flight";
import { StatusBadge } from "@/components/status-badge";

export function FlightBoard({ flights }: { flights: Flight[] }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const visible = q
    ? flights.filter((f) =>
        [f.number, f.destination, f.destinationCity, f.airline].some((v) =>
          v.toLowerCase().includes(q),
        ),
      )
    : flights;

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="sr-only">Tìm chuyến bay</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Mã chuyến bay hoặc điểm đến, vd VN213"
          className="w-full rounded-xl border border-ink-700 bg-ink-900 px-4 py-3 text-base text-bone placeholder:text-ink-500 focus:border-slate focus:outline-none focus:ring-2 focus:ring-slate/30"
        />
      </label>

      <div className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-900">
        <div className="hidden grid-cols-[5rem_6rem_1fr_5rem_4rem_10rem] gap-4 border-b border-ink-800 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-ink-500 md:grid">
          <span>Giờ</span>
          <span>Chuyến</span>
          <span>Điểm đến</span>
          <span>Nhà ga</span>
          <span>Cổng</span>
          <span>Trạng thái</span>
        </div>

        <ul className="divide-y divide-ink-800">
          {visible.map((f) => (
            <li
              key={f.number}
              className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-x-4 gap-y-1 px-5 py-4 md:grid-cols-[5rem_6rem_1fr_5rem_4rem_10rem]"
            >
              <div className="font-mono text-lg font-bold text-clay">
                {f.estimatedTime ?? f.scheduledTime}
                {f.estimatedTime && (
                  <div className="text-xs font-medium text-ink-500 line-through">
                    {f.scheduledTime}
                  </div>
                )}
              </div>
              <div className="font-mono font-semibold md:order-none">
                {f.number}
                <div className="font-sans text-xs font-normal text-ink-500 md:hidden">
                  {f.destinationCity} · {f.destination}
                </div>
              </div>
              <div className="hidden md:block">
                <div className="font-semibold">{f.destinationCity}</div>
                <div className="text-xs text-ink-500">
                  {f.destination} · {f.airline}
                </div>
              </div>
              <div className="hidden font-mono text-ink-300 md:block">{f.terminal ?? "—"}</div>
              <div className="hidden font-mono text-lg font-bold md:block">{f.gate ?? "—"}</div>
              <div className="justify-self-end md:justify-self-start">
                <StatusBadge status={f.status} />
                {f.gate && (
                  <div className="mt-1 text-right font-mono text-xs text-ink-300 md:hidden">
                    Cổng {f.gate}
                  </div>
                )}
              </div>
            </li>
          ))}
          {visible.length === 0 && (
            <li className="px-5 py-10 text-center text-ink-500">
              Không tìm thấy chuyến bay nào khớp với “{query}”.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
