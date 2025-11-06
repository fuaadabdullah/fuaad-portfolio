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
        <div tw="w-full h-full flex items-center justify-center bg-[#050608] text-white text-[64px]">
          <span tw="mr-4">🔍</span>
          Project Not Found
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div tw="w-full h-full flex flex-col items-start justify-between relative bg-gradient-to-br from-[#050608] to-[#13151a] text-white p-16">
        {/* Accent orbs */}
        <div tw="absolute top-[-15%] right-[-8%] w-[550px] h-[550px] rounded-full bg-emerald-700/25 blur-2xl" />
        <div tw="absolute bottom-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-blue-500/15 blur-2xl" />

        {/* Content */}
        <div tw="flex flex-col gap-5 z-10 max-w-[1050px]">
          <div tw="text-[56px]">📊</div>
          <div tw="text-[76px] font-black leading-[1.05] tracking-[-0.03em] drop-shadow">{project.title}</div>
          <div tw="text-[34px] text-white/85 leading-snug max-w-[950px]">{project.tagline}</div>
        </div>

        {/* Bottom: Tech + Branding */}
        <div tw="flex flex-col gap-6 z-10 w-full">
          <div tw="flex flex-wrap gap-3">
            {project.tech.slice(0, 6).map((tech) => (
              <div
                key={tech}
                tw="bg-emerald-600/15 text-emerald-400 px-5 py-2.5 rounded-full text-[20px] font-semibold border-2 border-emerald-600/40 shadow flex"
              >
                {tech}
              </div>
            ))}
          </div>

          <div tw="flex items-center gap-3 text-[24px] text-white/55 font-medium">
            <span>🌐</span>
            heyimfuaad.me
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
