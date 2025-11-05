import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fuaad Abdullah - Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  // Fetch custom font (Inter Bold)
  const interBold = fetch(
    new URL("https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "linear-gradient(135deg, #0b0f13 0%, #0f1419 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: '"Inter"',
        }}
      >
        {/* Animated gradient orb effects */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(22, 163, 74, 0.2), transparent 70%)",
            borderRadius: "50%",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            left: "-5%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.15), transparent 70%)",
            borderRadius: "50%",
            display: "flex",
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            zIndex: 1,
          }}
        >
          {/* Emoji + Name */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.03em",
              display: "flex",
              alignItems: "center",
              gap: 20,
              textShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
            }}
          >
            <span style={{ fontSize: 72 }}>👨🏾‍💻</span>
            Fuaad Abdullah
          </div>
          
          {/* Tagline with emoji */}
          <div
            style={{
              fontSize: 36,
              color: "rgba(255, 255, 255, 0.85)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              textAlign: "center",
              maxWidth: 900,
            }}
          >
            <span>📊</span>
            Building disciplined tools for traders and students
            <span>🎓</span>
          </div>
          
          {/* Tech Stack with Tailwind-like styling */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 40,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "rgba(22, 163, 74, 0.15)",
                color: "#22c55e",
                padding: "12px 24px",
                borderRadius: 9999,
                fontSize: 22,
                fontWeight: 600,
                border: "2px solid rgba(22, 163, 74, 0.4)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 4px 12px rgba(22, 163, 74, 0.2)",
              }}
            >
              <span>⚡</span>
              Next.js
            </div>
            <div
              style={{
                background: "rgba(22, 163, 74, 0.15)",
                color: "#22c55e",
                padding: "12px 24px",
                borderRadius: 9999,
                fontSize: 22,
                fontWeight: 600,
                border: "2px solid rgba(22, 163, 74, 0.4)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 4px 12px rgba(22, 163, 74, 0.2)",
              }}
            >
              <span>🐍</span>
              Python
            </div>
            <div
              style={{
                background: "rgba(34, 211, 238, 0.15)",
                color: "#22d3ee",
                padding: "12px 24px",
                borderRadius: 9999,
                fontSize: 22,
                fontWeight: 600,
                border: "2px solid rgba(34, 211, 238, 0.4)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 4px 12px rgba(34, 211, 238, 0.2)",
              }}
            >
              <span>☁️</span>
              Azure
            </div>
          </div>
        </div>
        
        {/* Footer badge with emoji */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 26,
            color: "rgba(255, 255, 255, 0.6)",
            fontWeight: 500,
          }}
        >
          <span>🌐</span>
          heyimfuaad.me
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await interBold,
          style: "normal",
          weight: 800,
        },
      ],
    }
  );
}
