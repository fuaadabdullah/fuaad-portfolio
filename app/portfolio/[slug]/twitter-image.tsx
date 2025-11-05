import { ImageResponse } from "next/og";
import projects from "@/data/projects";

export const runtime = "edge";
export const alt = "Project Details";
export const size = {
  width: 1200,
  height: 600, // 2:1 ratio for Twitter
};
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
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
          padding: 48,
          position: "relative",
        }}
      >
        {/* Background gradient */}
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
            gap: 12,
            zIndex: 1,
          }}
        >
          {/* Project Title */}
          <div
            style={{
              fontSize: 60,
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
              fontSize: 28,
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.3,
            }}
          >
            {project.tagline}
          </div>
        </div>

        {/* Tech Tags */}
        <div
          style={{
            display: "flex",
            gap: 12,
            zIndex: 1,
            alignItems: "center",
          }}
        >
          {project.tech.slice(0, 4).map((tech) => (
            <div
              key={tech}
              style={{
                background: "rgba(22, 163, 74, 0.2)",
                border: "2px solid rgba(22, 163, 74, 0.4)",
                borderRadius: 8,
                padding: "8px 20px",
                fontSize: 24,
                color: "rgba(255, 255, 255, 0.9)",
                display: "flex",
              }}
            >
              {tech}
            </div>
          ))}
          <div
            style={{
              fontSize: 24,
              color: "rgba(255, 255, 255, 0.5)",
              marginLeft: 8,
              display: "flex",
            }}
          >
            heyimfuaad.me
          </div>
        </div>
      </div>
    ),
    size
  );
}
