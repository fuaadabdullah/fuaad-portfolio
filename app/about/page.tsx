// app/about/page.tsx
import Image from "next/image";
import { aboutPhotos } from "../../data/aboutPhotos";

export const metadata = {
  title: "About - Fuaad Abdullah",
  description:
    "Finance student, trader, and builder connecting disciplined decision-making with real-world software systems and problem-solving.",
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
            I'm Fuaad. Saudi raised, Atlanta based. I grew up playing a lot of soccer, recently got interested in tennis, and I'll happily sit and watch basketball for hours. When I'm not on some finance or code thing, I'm probably gaming, checking scores, or zoning out while I build little ecosystems in tanks.
          </p>
          <p>
            I'm Muslim and that's a big part of how I move, what I care about, and how I try to treat people. I came to the US to keep studying and stretch my world a bit, but at my core I'm a pretty chill, observant person who likes simple things: good people, good food, good vibes, and a life that feels honest to who I am.
          </p>
          <p>
            Finance is not a side note in my story. I trade, review risk, and live in numbers-heavy decisions, so when I build for traders or other operators who care about precision, I'm building from my own workflow instead of guessing what the job feels like.
          </p>
          <p>
            The reason I keep building is that software gives me a way to turn abstract finance ideas into something testable. Studying finance taught me to think about incentives, uncertainty, and downside. Trading made those ideas immediate. Building tools is how I close the gap between theory and behavior, whether that means making risk clearer, reducing workflow friction, or turning messy decisions into processes you can actually learn from.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {aboutPhotos.map((p, i) => (
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
