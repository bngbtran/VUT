// Logo VÚT dạng inline SVG — nguồn gốc ở brand/logo/*.svg; hình học và màu lấy từ lib/brand.
import {
  brandColors,
  PLANE_PATH,
  SYMBOL_PLANE_TRANSFORM,
  SYMBOL_U_PATH,
  T_PATH,
  U_PATH,
  V_PATH,
  WORDMARK_PLANE_TRANSFORM,
} from "@/lib/brand";

export function LogoSymbol({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="VÚT">
      <rect width="64" height="64" rx="16" fill={brandColors.charcoal} />
      <path d={SYMBOL_U_PATH} fill={brandColors.bone} />
      <path d={PLANE_PATH} transform={SYMBOL_PLANE_TRANSFORM} fill={brandColors.terracotta} />
    </svg>
  );
}

/** Chữ dùng currentColor; máy bay ở dấu sắc luôn màu đất nung. */
export function LogoWordmark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 136 64" className={className} role="img" aria-label="VÚT">
      <g fill="currentColor">
        <path d={V_PATH} />
        <path d={U_PATH} />
        <path d={T_PATH} />
      </g>
      <path d={PLANE_PATH} transform={WORDMARK_PLANE_TRANSFORM} fill={brandColors.terracotta} />
    </svg>
  );
}
