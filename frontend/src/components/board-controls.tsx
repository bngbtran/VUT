import Link from "next/link";
import { boardAirports } from "@/lib/airports";
import type { BoardType } from "@/types/flight";

export function AirportPicker({ current, type }: { current: string; type: BoardType }) {
  return (
    <nav aria-label="Chọn sân bay" className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none]">
      <ul className="flex w-max gap-2 md:w-auto md:flex-wrap">
        {boardAirports.map((a) => {
          const active = a.iata === current;
          return (
            <li key={a.iata}>
              <Link
                href={`/?airport=${a.iata}&type=${type}`}
                scroll={false}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm whitespace-nowrap ring-1 transition ${
                  active
                    ? "bg-bone text-charcoal ring-bone"
                    : "text-ink-300 ring-white/10 hover:bg-white/5 hover:text-bone"
                }`}
              >
                <span className="font-mono text-xs font-bold">{a.iata}</span>
                {a.city}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function BoardTabs({ airport, type }: { airport: string; type: BoardType }) {
  const tabs: { key: BoardType; label: string }[] = [
    { key: "departure", label: "Khởi hành" },
    { key: "arrival", label: "Đến" },
  ];
  return (
    <div className="inline-flex rounded-xl bg-ink-900 p-1 ring-1 ring-white/5" role="tablist">
      {tabs.map((t) => (
        <Link
          key={t.key}
          href={`/?airport=${airport}&type=${t.key}`}
          scroll={false}
          role="tab"
          aria-selected={t.key === type}
          className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${
            t.key === type ? "bg-ink-700 text-bone shadow" : "text-ink-500 hover:text-bone"
          }`}
        >
          {t.label}
        </Link>
      ))}
    </div>
  );
}
