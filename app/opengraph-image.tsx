import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fuaad Abdullah - Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "#0b0f13",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Background gradient effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 30% 40%, rgba(22, 163, 74, 0.15), transparent 50%)",
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
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            Fuaad Abdullah
          </div>
          
          <div
            style={{
              fontSize: 32,
              color: "rgba(255, 255, 255, 0.7)",
              display: "flex",
            }}
          >
            Building disciplined tools for traders and students
          </div>
          
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 32,
            }}
          >
            <div
              style={{
                background: "rgba(22, 163, 74, 0.2)",
                color: "#16a34a",
                padding: "8px 16px",
                borderRadius: 6,
                fontSize: 20,
                border: "1px solid rgba(22, 163, 74, 0.3)",
                display: "flex",
              }}
            >
              Next.js
            </div>
            <div
              style={{
                background: "rgba(22, 163, 74, 0.2)",
                color: "#16a34a",
                padding: "8px 16px",
                borderRadius: 6,
                fontSize: 20,
                border: "1px solid rgba(22, 163, 74, 0.3)",
                display: "flex",
              }}
            >
              FastAPI
            </div>
            <div
              style={{
                background: "rgba(22, 163, 74, 0.2)",
                color: "#16a34a",
                padding: "8px 16px",
                borderRadius: 6,
                fontSize: 20,
                border: "1px solid rgba(22, 163, 74, 0.3)",
                display: "flex",
              }}
            >
              Azure
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 24,
            color: "rgba(255, 255, 255, 0.5)",
            display: "flex",
          }}
        >
          heyimfuaad.me
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
