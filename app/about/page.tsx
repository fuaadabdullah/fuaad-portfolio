// app/about/page.tsx
import Image from "next/image";
import Script from "next/script";

export const metadata = {
  title: "About - Fuaad Abdullah",
  description:
    "Finance major, day trader, and dev building disciplined tools for traders, students, and lean teams.",
};

export default function AboutPage() {
  return (
    <>
      {/* Twitter embed script */}
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
        async
      />
      
      {/* Instagram embed script */}
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        async
      />

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
        
        {/* Live social meme feeds - placeholders for Twitter/Instagram embeds */}
        <div className="relative h-40 md:h-56 lg:h-64 rounded-lg overflow-hidden bg-[color:var(--color-coal)] ring-1 ring-white/10">
          <a
            className="twitter-timeline"
            data-height="100%"
            data-theme="dark"
            data-chrome="noheader nofooter noborders transparent"
            data-tweet-limit="1"
            href="https://twitter.com/search?q=%23memes%20OR%20%23meme%20min_faves%3A1000&src=typed_query&f=live"
          >
            Loading memes from X...
          </a>
        </div>
        
        <div className="relative h-40 md:h-56 lg:h-64 rounded-lg overflow-hidden bg-[color:var(--color-coal)] ring-1 ring-white/10">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/memes/"
            data-instgrm-version="14"
            style={{
              background: '#000',
              border: 0,
              borderRadius: '8px',
              boxShadow: 'none',
              margin: 0,
              minWidth: '100%',
              padding: 0,
              width: 'calc(100% - 2px)',
              height: '100%',
            }}
          >
            <a href="https://www.instagram.com/memes/" style={{ color: '#fff' }}>
              Loading Instagram memes...
            </a>
          </blockquote>
        </div>
        
        <div className="relative h-40 md:h-56 lg:h-64 rounded-lg overflow-hidden bg-[color:var(--color-coal)] ring-1 ring-white/10">
          <iframe
            src="https://www.reddit.com/r/memes/top/.embed?theme=dark&showmedia=true&limit=1"
            title="Latest Memes"
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-popups"
            loading="lazy"
          />
        </div>
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
    </>
  );
}
