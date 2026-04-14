import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fuaad Abdullah - Finance x Software";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at top right, rgba(231, 76, 60, 0.24), transparent 30%), radial-gradient(circle at bottom left, rgba(34, 197, 94, 0.18), transparent 34%), linear-gradient(135deg, #050608 0%, #0d1117 58%, #121922 100%)",
          color: "white",
          fontFamily:
            'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 24,
            borderRadius: 28,
            border: "1px solid rgba(255,255,255,0.08)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            padding: "106px 64px 70px",
          }}
        >
          <div
            style={{
              display: "flex",
              marginBottom: 18,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            heyimfuaad.me
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 920,
              fontSize: 72,
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: -2.6,
            }}
          >
            <span>Fuaad Abdullah</span>
            <span style={{ color: "#f3f4f6" }}>Finance x software, shipped cleanly.</span>
          </div>

          <div
            style={{
              display: "flex",
              maxWidth: 820,
              marginTop: 26,
              fontSize: 30,
              lineHeight: 1.34,
              color: "rgba(255,255,255,0.76)",
            }}
          >
            Trader-built tools, portfolio case studies, and client-ready web products with strong UX and clear execution.
          </div>

          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 34,
            }}
          >
            {["Next.js", "Python", "Trading Tools"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.16)",
                  padding: "12px 20px",
                  fontSize: 22,
                  color: "rgba(255,255,255,0.78)",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
