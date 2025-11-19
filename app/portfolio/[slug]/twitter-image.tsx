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

  if (!project) {
    return new ImageResponse(
      (
        <div className="w-full h-full flex items-center justify-center bg-[#050608] text-white text-[48px]">
          <span className="mr-3">🔍</span>
          Project Not Found
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
  (
  <div className="w-full h-full flex flex-col items-start justify-between relative bg-gradient-to-br from-[#050608] to-[#13151a] text-white p-14">
        {/* Accent orbs */}
  <div className="absolute top-[-18%] right-[-10%] w-[480px] h-[480px] rounded-full bg-emerald-700/25 blur-2xl" />
  <div className="absolute bottom-[-12%] left-[-6%] w-[380px] h-[380px] rounded-full bg-blue-500/15 blur-2xl" />

        {/* Content */}
        <div className="flex flex-col gap-4 z-10 max-w-[1080px]">
          <div className="text-[48px]">📊</div>
          <div className="text-[64px] font-black leading-[1.05] tracking-[-0.03em] drop-shadow">{project.title}</div>
          <div className="text-[28px] text-white/85 leading-snug max-w-[900px]">{project.tagline}</div>
        </div>

        {/* Bottom: Tech + Branding */}
  <div className="flex flex-col gap-5 z-10 w-full">
          <div className="flex flex-wrap gap-3">
            {project.tech.slice(0, 5).map((tech) => (
              <div
                key={tech}
                className="bg-emerald-600/15 text-emerald-400 px-4 py-2 rounded-full text-[18px] font-semibold border-2 border-emerald-600/40 shadow flex"
              >
                {tech}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2.5 text-[22px] text-white/55 font-medium">
            <span>🌐</span>
            heyimfuaad.me
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
