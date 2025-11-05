// app/twitter-image.tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 600 }; // 2:1 ratio
export const contentType = "image/png";
export const alt = "Fuaad Abdullah — Portfolio";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background:
            "linear-gradient(135deg,#0B0F13 0%,#141B22 60%,#10151B 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 48, opacity: 0.85 }}>heyimfuaad.me</div>
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.1 }}>
          Numbers-first tools. Clean builds.
        </div>
        <div style={{ fontSize: 30, opacity: 0.9 }}>
          Finance @ GSU · RIZZK Calculator
        </div>
      </div>
    ),
    size
  );
}
