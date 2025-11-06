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
        <div className="space-y-4 text-white/80 leading-relaxed">
          <p>
            I'm Fuaad. Saudi raised, Atlanta based. I grew up playing a lot of soccer, recently got interested in tennis, and I'll happily sit and watch basketball for hours. When I'm not on some finance or code thing, I'm probably gaming, checking scores, or zoning out while I build little ecosystems in tanks.
          </p>
          <p>
            I'm Muslim and that's a big part of how I move, what I care about, and how I try to treat people. I came to the US to keep studying and stretch my world a bit, but at my core I'm a pretty chill, observant person who likes simple things: good people, good food, good vibes, and a life that feels honest to who I am.
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
        
        {/* Goblin loading placeholders */}
        {[1, 2, 3].map((i) => (
          <div
            key={`goblin-${i}`}
            className="relative h-40 md:h-56 lg:h-64 rounded-lg overflow-hidden bg-[color:var(--color-coal)] ring-1 ring-white/10 flex items-center justify-center"
          >
            <div className="text-center space-y-2 px-4">
              <p className="text-4xl">👺</p>
              <p className="text-xs text-white/40 font-mono">
                goblin.loading({i})
              </p>
            </div>
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
