import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0A1430" }}>
        <svg viewBox="0 0 64 64" width="180" height="180">
          <path d="M12 26 L24 52 L36 26" fill="none" stroke="#F4F6FB" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M42 18 L53 10.5" fill="none" stroke="#FFB020" strokeWidth="7" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
