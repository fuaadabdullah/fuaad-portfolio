import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fuaad Abdullah - Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        className="w-full h-full flex flex-col items-center justify-center relative bg-gradient-to-br from-[#050608] to-[#13151a] text-white"
      >
        {/* Accent orbs */}
  <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-700/20 blur-2xl" />
  <div className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-400/15 blur-2xl" />

        {/* Content */}
          <div className="flex flex-col items-center justify-center gap-6 z-10">
          {/* Emoji + Name */}
          <div className="text-7xl font-extrabold tracking-tight flex items-center gap-5 drop-shadow">
            <span className="text-6xl">👨🏾‍💻</span>
            Fuaad Abdullah
          </div>

          {/* Tagline */}
          <div className="text-3xl text-white/85 flex items-center gap-3 text-center max-w-[900px]">
            <span>📊</span>
            Building disciplined tools for traders and students
            <span>🎓</span>
          </div>

          {/* Tech Stack */}
          <div className="flex gap-4 mt-10 flex-wrap justify-center">
            <div className="bg-emerald-700/15 text-lime-400 px-6 py-3 rounded-full text-2xl font-semibold border-2 border-emerald-700/40 flex items-center gap-2 shadow">
              <span>⚡</span>
              Next.js
            </div>
            <div className="bg-emerald-700/15 text-lime-400 px-6 py-3 rounded-full text-2xl font-semibold border-2 border-emerald-700/40 flex items-center gap-2 shadow">
              <span>🐍</span>
              Python
            </div>
            <div className="bg-cyan-400/15 text-cyan-400 px-6 py-3 rounded-full text-2xl font-semibold border-2 border-cyan-400/40 flex items-center gap-2 shadow">
              <span>☁️</span>
              Azure
            </div>
          </div>
        </div>

        {/* Footer badge */}
  <div className="absolute bottom-12 flex items-center gap-3 text-2xl text-white/60 font-medium">
          <span>🌐</span>
          heyimfuaad.me
        </div>
      </div>
    ),
    { ...size }
  );
}
