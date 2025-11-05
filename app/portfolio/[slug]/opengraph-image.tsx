import { ImageResponse } from "next/og";
import projects from "@/data/projects";

export const runtime = "edge";
export const alt = "Project Details";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    // Fallback image if project not found
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 64,
            background: "#0b0f13",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          Project Not Found
        </div>
      ),
      size
    );
  }

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
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: 64,
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
            gap: 16,
            zIndex: 1,
          }}
        >
          {/* Project Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              maxWidth: 1000,
            }}
          >
            {project.title}
          </div>
          
          {/* Tagline */}
          <div
            style={{
              fontSize: 32,
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            {project.tagline}
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            zIndex: 1,
          }}
        >
          {project.tech.slice(0, 5).map((tech) => (
            <div
              key={tech}
              style={{
                background: "rgba(22, 163, 74, 0.2)",
                border: "2px solid rgba(22, 163, 74, 0.4)",
                borderRadius: 8,
                padding: "12px 24px",
                fontSize: 28,
                color: "rgba(255, 255, 255, 0.9)",
                display: "flex",
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        {/* Footer branding */}
        <div
          style={{
            position: "absolute",
            bottom: 64,
            right: 64,
            fontSize: 28,
            color: "rgba(255, 255, 255, 0.6)",
            display: "flex",
            zIndex: 1,
          }}
        >
          heyimfuaad.me
        </div>
      </div>
    ),
    size
  );
}
