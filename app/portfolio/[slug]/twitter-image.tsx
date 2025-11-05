import { ImageResponse } from "next/og";
import projects from "@/data/projects";

export const runtime = "edge";
export const alt = "Project Details";
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  // Fetch custom font
  const interBold = fetch(
    new URL("https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff", import.meta.url)
  ).then((res) => res.arrayBuffer());

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "#0b0f13",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontFamily: '"Inter"',
          }}
        >
          <span style={{ marginRight: 12 }}>🔍</span>
          Project Not Found
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
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: 56,
          position: "relative",
          fontFamily: '"Inter"',
        }}
      >
        {/* Background gradients */}
        <div
          style={{
            position: "absolute",
            top: "-18%",
            right: "-10%",
            width: "480px",
            height: "480px",
            background: "radial-gradient(circle, rgba(22, 163, 74, 0.25), transparent 65%)",
            borderRadius: "50%",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-12%",
            left: "-6%",
            width: "380px",
            height: "380px",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 65%)",
            borderRadius: "50%",
            display: "flex",
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            zIndex: 1,
            maxWidth: 1080,
          }}
        >
          {/* Emoji indicator */}
          <div
            style={{
              fontSize: 48,
              display: "flex",
            }}
          >
            📊
          </div>
          
          {/* Title */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              textShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            }}
          >
            {project.title}
          </div>
          
          {/* Tagline */}
          <div
            style={{
              fontSize: 28,
              color: "rgba(255, 255, 255, 0.85)",
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            {project.tagline}
          </div>
        </div>

        {/* Bottom: Tech + Branding */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            zIndex: 1,
            width: "100%",
          }}
        >
          {/* Tech tags - compact for Twitter */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            {project.tech.slice(0, 5).map((tech) => (
              <div
                key={tech}
                style={{
                  background: "rgba(22, 163, 74, 0.15)",
                  color: "#22c55e",
                  padding: "8px 16px",
                  borderRadius: 9999,
                  fontSize: 18,
                  fontWeight: 600,
                  border: "2px solid rgba(22, 163, 74, 0.4)",
                  boxShadow: "0 2px 8px rgba(22, 163, 74, 0.15)",
                  display: "flex",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
          
          {/* Branding with emoji */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 22,
              color: "rgba(255, 255, 255, 0.55)",
              fontWeight: 500,
            }}
          >
            <span>🌐</span>
            heyimfuaad.me
          </div>
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
          weight: 900,
        },
      ],
    }
  );
}
