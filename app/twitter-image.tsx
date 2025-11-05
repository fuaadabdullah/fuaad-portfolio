import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fuaad Abdullah - Portfolio";
export const size = {
  width: 1200,
  height: 600,
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
        {/* Background gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "-25%",
            right: "-12%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(22, 163, 74, 0.2), transparent 70%)",
            borderRadius: "50%",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-8%",
            width: "400px",
            height: "400px",
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
            gap: 20,
            zIndex: 1,
          }}
        >
          {/* Emoji + Name */}
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.03em",
              display: "flex",
              alignItems: "center",
              gap: 18,
              textShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
            }}
          >
            <span style={{ fontSize: 60 }}>👨🏾‍💻</span>
            Fuaad Abdullah
          </div>
          
          {/* Tagline with emojis */}
          <div
            style={{
              fontSize: 30,
              color: "rgba(255, 255, 255, 0.85)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              textAlign: "center",
              maxWidth: 850,
            }}
          >
            <span>📊</span>
            Numbers-first tools. Clean builds.
            <span>⚡</span>
          </div>
          
          {/* Tech badges */}
          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 28,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "rgba(22, 163, 74, 0.15)",
                color: "#22c55e",
                padding: "10px 20px",
                borderRadius: 9999,
                fontSize: 20,
                fontWeight: 600,
                border: "2px solid rgba(22, 163, 74, 0.4)",
                display: "flex",
                alignItems: "center",
                gap: 6,
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
                padding: "10px 20px",
                borderRadius: 9999,
                fontSize: 20,
                fontWeight: 600,
                border: "2px solid rgba(22, 163, 74, 0.4)",
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: "0 4px 12px rgba(22, 163, 74, 0.2)",
              }}
            >
              <span>🐍</span>
              Python
            </div>
          </div>
        </div>
        
        {/* Footer badge */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 24,
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
