import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fuaad Abdullah - Finance x Software";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const chipStyle = {
  display: "flex",
  alignItems: "center",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.16)",
  padding: "12px 20px",
  fontSize: 22,
  color: "rgba(255,255,255,0.78)",
  background: "rgba(255,255,255,0.05)",
} as const;

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
            "radial-gradient(circle at top right, rgba(231, 76, 60, 0.26), transparent 32%), radial-gradient(circle at bottom left, rgba(34, 197, 94, 0.22), transparent 34%), linear-gradient(135deg, #050608 0%, #0d1117 58%, #121922 100%)",
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
              "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 54,
            left: 64,
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 24,
            color: "rgba(255,255,255,0.74)",
            letterSpacing: 1,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#ef4444",
              boxShadow: "0 0 24px rgba(239,68,68,0.6)",
            }}
          />
          heyimfuaad.me
        </div>

        <div
          style={{
            position: "absolute",
            top: 70,
            right: 64,
            display: "flex",
            alignItems: "center",
            gap: 10,
            borderRadius: 999,
            padding: "12px 18px",
            background: "rgba(239, 68, 68, 0.12)",
            border: "1px solid rgba(239, 68, 68, 0.34)",
            color: "#fca5a5",
            fontSize: 22,
          }}
        >
          Finance x Software
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "124px 64px 72px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 22,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.62)",
            }}
          >
            Builder • Trader • Finance Major
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 900,
              fontSize: 68,
              lineHeight: 1.04,
              fontWeight: 800,
              letterSpacing: -2.4,
            }}
          >
            <span>Fuaad Abdullah</span>
            <span style={{ color: "#e5e7eb" }}>Disciplined tools for traders and operators.</span>
          </div>

          <div
            style={{
              display: "flex",
              maxWidth: 850,
              marginTop: 28,
              fontSize: 28,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.76)",
            }}
          >
            Full-stack builds with a finance edge: trading tools, client sites, and numbers-first products that feel sharp, trustworthy, and production-ready.
          </div>

          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 34,
              flexWrap: "wrap",
            }}
          >
            <div style={chipStyle}>Next.js</div>
            <div style={chipStyle}>Python</div>
            <div style={chipStyle}>Trading Systems</div>
            <div style={chipStyle}>Client Builds</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
