// app/about/page.tsx
import Image from "next/image";

export const metadata = {
  title: "About - Fuaad Abdullah",
  description:
    "Finance major, day trader, and dev building disciplined tools for traders, students, and lean teams.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-12">
        {/* Intro (photos deferred) */}
        <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-white/50">LORE</p>
        <h1 className="text-3xl md:text-4xl font-semibold">
          Soccer kid. Tank builder. Late-night thinker. 👺
        </h1>
        <div className="space-y-4 text-white/80 leading-relaxed">
          <p>
            I am Fuaad. Saudi-raised, Atlanta-based. I grew up playing soccer, became interested in tennis, and enjoy watching basketball for hours. When I am not working on finance or code projects, I am likely gaming, checking scores, or building small ecosystems in tanks.
          </p>
          <p>
            I am Muslim, and that is a meaningful part of my identity — it informs how I move, what I care about, and how I try to treat others. I moved to the United States to continue my studies and broaden my worldview. At my core, I am a thoughtful, observant person who values simple things: good people, good food, meaningful work, and living honestly.
          </p>
        </div>
      </section>

      {/* Real photos from iCloud */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          {
            src: "/lore-10.jpg",
            alt: "Fuaad - lore photo 10",
          },
          {
            src: "/lore-3.jpg",
            alt: "Fuaad - lore photo 3",
          },
          {
            src: "/lore-11.jpg",
            alt: "Fuaad - lore photo 11",
          },
        ].map((p, i) => (
          <div
            key={i}
            className="relative h-40 md:h-56 lg:h-64 rounded-lg overflow-hidden bg-[color:var(--color-coal)] ring-1 ring-white/10"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 45vw"
              priority={i < 2}
            />
          </div>
        ))}

        {/* Coming soon placeholders */}
        <div className="relative h-40 md:h-56 lg:h-64 rounded-lg overflow-hidden bg-[color:var(--color-coal)] ring-1 ring-white/10 flex items-center justify-center">
          <div className="text-center space-y-2 px-4">
            <p className="text-2xl">🎭</p>
            <p className="text-xs text-white/60 font-medium">Coming soon</p>
          </div>
        </div>

        <div className="relative h-40 md:h-56 lg:h-64 rounded-lg overflow-hidden bg-[color:var(--color-coal)] ring-1 ring-white/10 flex items-center justify-center">
          <div className="text-center space-y-2 px-4">
            <p className="text-2xl">🎪</p>
            <p className="text-xs text-white/60 font-medium">Coming soon</p>
          </div>
        </div>

        <div className="relative h-40 md:h-56 lg:h-64 rounded-lg overflow-hidden bg-[color:var(--color-coal)] ring-1 ring-white/10 flex items-center justify-center">
          <div className="text-center space-y-2 px-4">
            <p className="text-2xl">🎨</p>
            <p className="text-xs text-white/60 font-medium">Coming soon</p>
          </div>
        </div>
      </section>

      {/* Short "stats" row */}
      <section className="grid gap-6 md:grid-cols-3 text-sm text-white/70">
        <div>
          <p className="font-semibold text-white">Now</p>
          <p>Georgia State University (GSU) — Finance: building risk tools, GoblinOS, and client projects.</p>
        </div>
        <div>
          <p className="font-semibold text-white">Next 1–2 years</p>
          <p>Day-trading stack, gold import/export groundwork, and a stronger brand.</p>
        </div>
        <div>
          <p className="font-semibold text-white">How I work</p>
          <p>Low noise, high clarity — data-first, ego-last.</p>
        </div>
      </section>

      {/* Case studies are available on the Case Studies page */}
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-white/50">CASE STUDIES</p>
        <h2 className="text-2xl font-semibold">More Case Studies</h2>

        <div className="space-y-3 text-white/80 leading-relaxed">
          <p>
            I keep in-depth case studies — detailing context, constraints, solutions, artifacts, and results — on a dedicated page.
          </p>
        </div>

        <p className="text-sm text-white/70">
          <a href="/case-studies" className="text-white underline">View Case Studies</a>
        </p>
      </section>
    </main>
  );
}
