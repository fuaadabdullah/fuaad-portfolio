import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";

// Updated: 2025-11-05 - Latest changes deployed
export default function HomePage() {
  return (
    <Container className="py-16">
      <PageHeader
        eyebrow="Finance • Tools • Automations"
        title="I build tools and automations for creators, founders or anyone tired of guessing."
        description="Finance student · freelance dev · day trader building disciplined, numbers based tooling and automations."
        actions={
          <>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-2xl bg-[color:var(--color-accent)] px-5 py-3 font-medium text-black hover:bg-[color:var(--color-accent)]/90 transition-colors"
            >
              See portfolio <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              href="/Fuaad_Abdullah_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 hover:bg-white/15 transition-colors"
            >
              Résumé PDF <Download size={18} aria-hidden="true" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 hover:bg-white/15 transition-colors"
            >
              Services <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </>
        }
      />

      {/* Feature row: Risk tools */}
      <div className="mt-8 max-w-3xl">
        <div className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2 border border-white/10">
          <div>
            <p className="font-medium text-zinc-100">GoblinOS</p>
            <p className="text-[11px] text-zinc-400">
              Ongoing automation engine powering this site, risk tools, and workflows.
            </p>
          </div>
          <span className="rounded-full bg-[color:var(--color-accent)]/15 px-3 py-1 text-[11px] text-[color:var(--color-accent)]">
            Active project
          </span>
        </div>
      </div>
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
    </Container>
  );
}
