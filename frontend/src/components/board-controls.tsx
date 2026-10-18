import Link from "next/link";
import { boardAirports } from "@/lib/airports";

export function AirportPicker({ current }: { current: string }) {
  return (
    <nav aria-label="Chọn sân bay" className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none]">
      <ul className="flex w-max gap-2">
        {boardAirports.map((a) => {
          const active = a.iata === current;
          return (
            <li key={a.iata}>
              <Link
                href={`/?airport=${a.iata}`}
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
