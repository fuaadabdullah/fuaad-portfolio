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
          Quiet operator. Finance brain. Builder energy.
        </h1>
        <p className="text-white/80 leading-relaxed">
          I grew up between Saudi discipline and Atlanta chaos. Now I’m a
          finance major at GSU who writes code, trades intraday, and builds
          tools that bully people into respecting their risk instead of their
          ego. I’m not here to be the loudest person in the room. I’m here to
          ship things that work.
        </p>
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
          {
            src:
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
            alt: "Pair programming session",
          },
          {
            src:
              "https://images.unsplash.com/photo-1515165562835-c3b8c8e3d9da?q=80&w=1600&auto=format&fit=crop",
            alt: "City at dusk with calm tones",
          },
          {
            src:
              "https://images.unsplash.com/photo-1529336953121-4d4327e7e858?q=80&w=1600&auto=format&fit=crop",
            alt: "Notebook planning and coffee",
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
      </section>

      {/* Short "stats" row */}
      <section className="grid gap-6 md:grid-cols-3 text-sm text-white/70">
        <div>
          <p className="font-semibold text-white">Now</p>
          <p>GSU Finance · building risk tools, GoblinOS, and client projects.</p>
        </div>
        <div>
          <p className="font-semibold text-white">Next 1–2 years</p>
          <p>Day trading stack, gold import/export groundwork, stronger brand.</p>
        </div>
        <div>
          <p className="font-semibold text-white">How I work</p>
          <p>Low noise, high clarity, data first, ego last.</p>
        </div>
      </section>
    </main>
  );
}
