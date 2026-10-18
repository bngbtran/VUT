// Logo VÚT dạng inline SVG — nguồn gốc ở brand/logo/*.svg, giữ hình học đồng bộ.

const AMBER = "#FFB020";

export function LogoSymbol({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="VÚT">
      <rect width="64" height="64" rx="16" fill="#0A1430" />
      <path
        d="M12 26 L24 52 L36 26"
        fill="none"
        stroke="#F4F6FB"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M42 18 L53 10.5" fill="none" stroke={AMBER} strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

export function LogoWordmark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 64" className={className} role="img" aria-label="VÚT">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 24 L24 56 L38 24" />
        <path d="M52 24 V42 A14 14 0 0 0 80 42 V24" />
        <path d="M94 24 H130 M112 24 V56" />
      </g>
      <path d="M59 15 L74 5" fill="none" stroke={AMBER} strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}
