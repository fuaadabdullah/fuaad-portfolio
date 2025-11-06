import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";

// Updated: 2025-11-05 - Latest changes deployed
export default function HomePage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <section className="grid items-center gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Text / hero copy */}
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-white/50">
            Portfolio · Fintech · Trading tools
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Shipping tools for traders, founders, and lean teams.
          </h1>
          <p className="text-white/80 max-w-2xl">
            Finance major at GSU · freelance dev · day trader building disciplined, numbers-first tools instead of vibe-based gambling.
          </p>

          {/* Feature row: Risk tools */}
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
            <div>
              <p className="font-medium text-zinc-100">Risk tools</p>
              <p className="text-[11px] text-zinc-400">
                Position sizing, R:R, and trade planning without guesswork.
              </p>
            </div>
            <span className="rounded-full bg-[color:var(--color-accent)]/15 px-3 py-1 text-[11px] text-[color:var(--color-accent)]">
              Risk engine
            </span>
          </div>

          {/* CTA row */}
          <div className="mt-6 flex gap-3 flex-wrap">
            <Link href="/portfolio" className="inline-flex items-center gap-2 rounded-2xl bg-[color:var(--color-accent)] px-5 py-3 font-medium text-white hover:bg-[color:var(--color-accent)]/90 transition-colors">
              See portfolio <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/Fuaad_Abdullah_Resume.pdf" className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 hover:bg-white/15 transition-colors">
              Résumé PDF <Download size={18} aria-hidden="true" />
            </Link>
            <Link href="/services" className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 hover:bg-white/15 transition-colors">
              Services <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Headshot card */}
        <div className="relative h-[320px] w-full max-w-[320px] justify-self-center">
          <div className="absolute inset-0 rounded-3xl bg-[color:var(--color-coal)] border border-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.8)]" />
          <Image
            src="/fuaad-headshot-2025-roomy.jpg"
            alt="Fuaad Abdullah, calmly staring down bad risk management."
            fill
            className="rounded-3xl object-cover object-top saturate-[0.9] contrast-[1.05]"
            priority
          />
        </div>
      </section>
      <div className="mt-16 grid md:grid-cols-2 gap-6">
        <article className="rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold">Position Sizing Web App</h2>
          <p className="text-white/80 mt-2">Production-grade risk calculator that forces day traders to respect their risk, not their ego. Built with Python, Streamlit, and Azure (internal codename: RIZZK).</p>
          <div className="mt-4 flex gap-3">
            <a className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/15 transition-colors" href="https://rizzk-calculator-demo-eus2-f1.azurewebsites.net" target="_blank" rel="noopener noreferrer">
              Live demo
            </a>
            <a className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/15 transition-colors" href="https://github.com/fuaadabdullah/rr-calculator" target="_blank" rel="noopener noreferrer">
              Source
            </a>
          </div>
        </article>
        <article className="rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold">Consulting</h2>
          <p className="text-white/80 mt-2">Frontend polish, Streamlit/Next.js builds, and deployment-ready MVPs.</p>
          <a className="mt-4 inline-block rounded-lg bg-[color:var(--color-accent)] px-4 py-2 text-white hover:bg-[color:var(--color-accent)]/90 transition-colors" href="/services">
            View services
          </a>
        </article>
      </div>
    </section>
  );
}
