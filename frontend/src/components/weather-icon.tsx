import type { WeatherKind } from "@/lib/weather";

// Bộ icon nét thống nhất (stroke 1.75) — tự vẽ để đồng bộ với giao diện, không dùng ảnh từ nguồn dữ liệu.

const SUN = (
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
  </>
);
const MOON = <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />;
const CLOUD = <path d="M7 18h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.1 11.1 3.5 3.5 0 0 0 7 18Z" />;

export function WeatherIcon({
  kind,
  isDay,
  className,
}: {
  kind: WeatherKind;
  isDay: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {kind === "clear" && (isDay ? SUN : MOON)}
      {kind === "partly" && (
        <>
          <g transform="translate(-3 -4) scale(.75)" className="text-terracotta" stroke="currentColor">
            {isDay ? SUN : MOON}
          </g>
          <path d="M8 20h9a3.5 3.5 0 0 0 .5-6.96A5 5 0 0 0 8 13.5 3.25 3.25 0 0 0 8 20Z" />
        </>
      )}
      {kind === "cloudy" && CLOUD}
      {kind === "fog" && <path d="M4 9h16M6 13h12M4 17h16" />}
      {kind === "rain" && (
        <>
          <g transform="translate(0 -3)">{CLOUD}</g>
          <path d="M9 18l-1 3M13 18l-1 3M17 18l-1 3" className="text-status-boarding" stroke="currentColor" />
        </>
      )}
      {kind === "thunder" && (
        <>
          <g transform="translate(0 -3)">{CLOUD}</g>
          <path d="M13 15l-2.5 4h3l-2 3.5" className="text-status-delayed" stroke="currentColor" />
        </>
      )}
      {kind === "snow" && (
        <>
          <g transform="translate(0 -3)">{CLOUD}</g>
          <path d="M9 19h.01M12 21h.01M15 19h.01" strokeWidth="2.5" />
        </>
      )}
    </svg>
  );
}
