// @ts-nocheck
import "@/lib/suppressBaselineWarnings";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fuaad Abdullah - Portfolio";
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div tw="w-full h-full flex flex-col items-center justify-center relative bg-gradient-to-br from-[#050608] to-[#13151a] text-white">
        {/* Accent orbs */}
        <div tw="absolute top-[-25%] right-[-12%] w-[500px] h-[500px] rounded-full bg-emerald-700/20 blur-2xl" />
        <div tw="absolute bottom-[-20%] left-[-8%] w-[400px] h-[400px] rounded-full bg-cyan-400/15 blur-2xl" />

        {/* Content */}
        <div tw="flex flex-col items-center justify-center gap-5 z-10">
          {/* Emoji + Name */}
          <div tw="text-[68px] font-extrabold tracking-tight flex items-center gap-4 drop-shadow">
            <span tw="text-[60px]">👨🏾‍💻</span>
            Fuaad Abdullah
          </div>

          {/* Tagline */}
          <div tw="text-[30px] text-white/85 flex items-center gap-3 text-center max-w-[850px]">
            <span>📊</span>
            Numbers-first tools. Clean builds.
            <span>⚡</span>
          </div>

          {/* Tech badges */}
          <div tw="flex gap-3 mt-7 flex-wrap justify-center">
            <div tw="bg-emerald-700/15 text-lime-400 px-5 py-2.5 rounded-full text-[20px] font-semibold border-2 border-emerald-700/40 flex items-center gap-2 shadow">
              <span>⚡</span>
              Next.js
            </div>
            <div tw="bg-emerald-700/15 text-lime-400 px-5 py-2.5 rounded-full text-[20px] font-semibold border-2 border-emerald-700/40 flex items-center gap-2 shadow">
              <span>🐍</span>
              Python
            </div>
          </div>
        </div>

        {/* Footer badge */}
        <div tw="absolute bottom-10 flex items-center gap-2.5 text-[24px] text-white/60 font-medium">
          <span>🌐</span>
          heyimfuaad.me
        </div>
      </div>
    ),
    { ...size }
  );
}
