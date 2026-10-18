import { ImageResponse } from "next/og";
import { brandColors, PLANE_PATH, SYMBOL_PLANE_TRANSFORM, SYMBOL_U_PATH } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: brandColors.charcoal }}>
        <svg viewBox="0 0 64 64" width="180" height="180">
          <path d={SYMBOL_U_PATH} fill={brandColors.bone} />
          <path d={PLANE_PATH} transform={SYMBOL_PLANE_TRANSFORM} fill={brandColors.terracotta} />
        </svg>
      </div>
    ),
    size,
  );
}
