import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fuaad Edition | Fuaad Abdullah",
  description: "A personal introduction to Fuaad Abdullah: software, quantitative thinking, projects, and the places that shaped his perspective.",
  alternates: { canonical: "/fuaad" },
};

const work = [
  { number: "01", title: "GoblinOS Assistant", category: "AI / SYSTEMS", description: "Multi-provider AI, transparent routing, and tools built to make complex decisions observable.", href: "/portfolio/goblin-assistant" },
  { number: "02", title: "RIZZK Calculator", category: "FINANCE / DATA", description: "Position sizing and risk calculations designed around real trading workflows.", href: "/portfolio/rizzk-calculator" },
  { number: "03", title: "Elbey Projects", category: "CLIENT / WEB", description: "A practical, approachable digital presence built for a real business.", href: "/portfolio/elbey-projects" },
];

const paths = [
  { label: "CUSTOMERS", title: "Let's make it useful.", copy: "Websites, workflows, and custom tools designed around the problem, not the buzzwords.", href: "/services", action: "Explore services" },
  { label: "EMPLOYERS", title: "Proof over promises.", copy: "Real code, architectural decisions, and the engineering thinking behind shipped projects.", href: "/resume", action: "View résumé" },
  { label: "SCHOOLS", title: "Curiosity meets rigor.", copy: "Georgia State University undergraduate exploring statistics, economics, and software through study and building.", href: "/cv", action: "Academic profile" },
];

export default function FuaadEditionPage() {
  return (
    <main className="min-h-screen bg-[#0d0e12] text-[#f5eff2]">
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#493b4c] pb-7">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d9b9d9]">Fuaad / An introduction</div>
          <div className="text-xs text-[#aca2b0]">Software · Data · AI</div>
        </div>
        <section className="grid items-center gap-12 py-16 md:grid-cols-[1.2fr_.8fr] md:py-24">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.27em] text-[#d4b0d5]">Philadelphia → Jeddah → Atlanta</p>
            <h1 className="max-w-[12ch] font-serif text-[clamp(3.6rem,9vw,7.7rem)] leading-[.97] tracking-[-.065em]">I make complex <span className="text-[#d5b5d9]">systems</span> feel human.</h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#c4bbc8]">I&apos;m Fuaad Abdullah. I build software at the intersection of practical problems, quantitative thinking, and curiosity. I care about what works, why it works, and who it helps.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/portfolio" className="rounded-lg bg-[#e8d5e8] px-6 py-3 text-sm font-semibold text-[#1a1420] transition hover:bg-white">Explore my work ↗</Link>
              <Link href="/contact" className="rounded-lg border border-[#65526b] px-6 py-3 text-sm font-semibold transition hover:border-[#e8d5e8]">Start a conversation ↗</Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm">
            <div className="rounded-full border border-[#755b79] p-3 shadow-[0_0_90px_rgba(150,83,163,.12)]">
              <Image src="/fuaad-professional-portrait.jpg" alt="Professional portrait of Fuaad Abdullah" width={600} height={600} priority className="aspect-square w-full rounded-full object-cover" />
            </div>
            <p className="mt-5 text-center text-xs uppercase tracking-[.2em] text-[#9e92a3]">Independent builder · Georgia State undergraduate</p>
          </div>
        </section>
        <section className="grid gap-8 border-y border-[#493b4c] py-14 md:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-xs uppercase tracking-[.25em] text-[#d5b5d9]">01 / Perspective</p><h2 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">More than one way to see a problem.</h2></div>
          <div className="space-y-5 text-base leading-8 text-[#c6bdc9]"><p>Growing up across different places taught me to question assumptions before accepting an answer. I bring that habit to engineering: understand the incentives, examine the evidence, then build something that holds up in practice.</p><p>I&apos;m drawn to AI systems, financial tools, and the mathematics behind decisions. The common thread is making complicated things more useful and more understandable.</p></div>
        </section>
        <section className="py-20">
          <p className="text-xs uppercase tracking-[.25em] text-[#d5b5d9]">02 / Selected work</p>
          <div className="mb-10 mt-4 flex flex-wrap items-end justify-between gap-4"><h2 className="font-serif text-4xl tracking-tight md:text-6xl">Proof, not promises.</h2><Link href="/portfolio" className="text-sm text-[#d9b9d9] underline underline-offset-4">All projects ↗</Link></div>
          <div className="grid gap-4 md:grid-cols-3">{work.map(item => <Link key={item.number} href={item.href} className="group flex min-h-72 flex-col rounded-xl border border-[#493b4c] bg-[#18161d] p-6 transition hover:-translate-y-1 hover:border-[#c69cca]"><div className="flex justify-between text-xs tracking-widest text-[#b9a1c0]"><span>{item.number}</span><span>{item.category}</span></div><h3 className="mt-12 font-serif text-3xl">{item.title}</h3><p className="mt-4 flex-1 text-sm leading-7 text-[#bcb1c1]">{item.description}</p><span className="mt-6 text-sm font-medium text-[#e4c6e8]">Read case study ↗</span></Link>)}</div>
        </section>
        <section className="border-t border-[#493b4c] py-20">
          <p className="text-xs uppercase tracking-[.25em] text-[#d5b5d9]">03 / Find your path</p><h2 className="mb-10 mt-4 font-serif text-4xl tracking-tight md:text-6xl">What brings you here?</h2>
          <div className="grid gap-4 md:grid-cols-3">{paths.map(path => <div key={path.label} className="rounded-xl border border-[#493b4c] p-6"><p className="text-xs tracking-[.22em] text-[#d9b9d9]">{path.label}</p><h3 className="mt-5 font-serif text-3xl">{path.title}</h3><p className="my-5 min-h-24 text-sm leading-7 text-[#c1b6c5]">{path.copy}</p><Link className="text-sm font-semibold text-[#e4c6e8] underline underline-offset-4" href={path.href}>{path.action} ↗</Link></div>)}</div>
        </section>
        <section className="flex flex-wrap items-end justify-between gap-7 rounded-2xl border border-[#715678] bg-[#211a27] p-8 md:p-12"><div><p className="text-xs uppercase tracking-[.25em] text-[#d9b9d9]">04 / Contact</p><h2 className="mt-4 font-serif text-4xl md:text-5xl">Let's build something useful.</h2><p className="mt-4 text-sm text-[#c8bbcd]">Projects, recruiting, or academic conversations.</p></div><a href="mailto:ayahos.dev@gmail.com" className="rounded-lg bg-[#e8d5e8] px-6 py-3 text-sm font-semibold text-[#1a1420]">Email me ↗</a></section>
      </div>
    </main>
  );
}
