import { ImageResponse } from "next/og";

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
          background: "#0A1430",
          color: "#F4F6FB",
        }}
      >
        <svg viewBox="0 0 140 64" width="420" height="192">
          <g fill="none" stroke="#F4F6FB" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 24 L24 56 L38 24" />
            <path d="M52 24 V42 A14 14 0 0 0 80 42 V24" />
            <path d="M94 24 H130 M112 24 V56" />
          </g>
          <path d="M59 15 L74 5" fill="none" stroke="#FFB020" strokeWidth="7" strokeLinecap="round" />
        </svg>
        <div style={{ marginTop: 40, fontSize: 52, color: "#A9B4D0" }}>
          Theo dõi chuyến bay. Vút.
        </div>
      </div>
    ),
    size,
  );
}
