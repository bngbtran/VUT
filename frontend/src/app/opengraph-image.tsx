import { ImageResponse } from "next/og";
import {
  brandColors,
  PLANE_PATH,
  T_PATH,
  U_PATH,
  V_PATH,
  WORDMARK_PLANE_TRANSFORM,
} from "@/lib/brand";

export const alt = "VÚT — Theo dõi chuyến bay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: brandColors.charcoal,
          color: brandColors.bone,
        }}
      >
        <svg viewBox="0 0 136 64" width="408" height="192">
          <g fill={brandColors.bone}>
            <path d={V_PATH} />
            <path d={U_PATH} />
            <path d={T_PATH} />
          </g>
          <path d={PLANE_PATH} transform={WORDMARK_PLANE_TRANSFORM} fill={brandColors.terracotta} />
        </svg>
        <div style={{ marginTop: 40, fontSize: 52, color: brandColors.stone }}>
          Theo dõi chuyến bay. Vút.
        </div>
      </div>
    ),
    size,
  );
}
