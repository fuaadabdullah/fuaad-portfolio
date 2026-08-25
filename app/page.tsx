import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import projects from "@/data/projects";
import { servicesSummaryCard } from "@/data/services";
import { bookingCta, bookingLink, testimonials } from "@/data/contact";
import { resumeData } from "@/data/resume";
import { cvData } from "@/data/cv";
import { nowActivity } from "@/data/now";

function SignalChip({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "accent" }) {
  const classes =
    tone === "accent"
      ? "rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5"
      : "rounded-full border border-white/10 bg-white/5 px-3 py-1.5";

  return <span className={classes}>{children}</span>;
}

export default async function HomePage() {
  const goblinProject = projects.find((project) => project.slug === "goblin-assistant");
  const rizzkProject = projects.find((project) => project.slug === "rizzk-calculator");
  const testimonial = testimonials[0];
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <section className="max-w-3xl space-y-6">
        <SignalChip tone="accent">{resumeData.header.availability}</SignalChip>

        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            I build software for markets, automation, and AI.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-white/75">
            Fintech and AI products built end to end — from trader-facing tools to production backends — deployed in actual market workflows.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <Link
            href="/portfolio"
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-white/90"
          >
            See the work
          </Link>
          <Link
            href="/resume"
            className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
          >
            View résumé
          </Link>
        </div>
      </section>

      <div className="mt-12 grid gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-white/45">Finance edge</p>
          <p className="mt-2 text-white/85">Active trader building products around real market workflows.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-white/45">Shipping proof</p>
          <p className="mt-2 text-white/85">~90% fewer sizing mistakes and 60-70% grading time saved (self-reported), 7-page client site shipped in 1 week.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-white/45">Current stack</p>
          <p className="mt-2 text-white/85">Next.js, React, TypeScript, Python, FastAPI, PostgreSQL, Redis, Docker, Azure, Vercel.</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-sm text-cyan-50">
        <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-100/70">Building now</p>
        <p className="mt-1 font-medium">{nowActivity.building}</p>
        {nowActivity.detail && <p className="mt-0.5 text-cyan-100/80">{nowActivity.detail}</p>}
        {nowActivity.shipped.length > 0 && (
          <div className="mt-3 border-t border-cyan-400/15 pt-3">
            <p className="mb-1.5 text-[10px] uppercase tracking-[0.18em] text-cyan-100/50">
              Recently shipped
            </p>
            <ul className="space-y-0.5 text-cyan-100/75">
              {nowActivity.shipped.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </div>
        )}
        {nowActivity.next && (
          <p className="mt-3 text-cyan-100/70">
            <span className="text-[10px] uppercase tracking-widest text-cyan-100/40">Next up </span>
            {nowActivity.next}
          </p>
        )}
        <p className="mt-2 text-[10px] text-cyan-100/40">Updated {nowActivity.updatedAt}</p>
      </div>

      {goblinProject && (
        <article className="mt-6 rounded-2xl border border-emerald-400/30 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium text-zinc-100">Featured build: {goblinProject.title}</p>
            <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-[11px] text-emerald-100">
              FastAPI · Postgres · Redis · Docker · Vercel
            </span>
          </div>
          <p className="mt-2 text-sm text-white/80">
            Multi-provider AI assistant with observable routing, live provider health, and production-ready infra split across backend and frontend.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {goblinProject.results.map((result) => (
              <span key={result.label} className="rounded-full bg-white/10 px-2.5 py-1 text-white/90">
                {result.value} {result.label}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/portfolio/${goblinProject.slug}`}
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-400"
            >
              Explore flagship case study
            </Link>
            <Link
              href="/resume"
              className="rounded-lg bg-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/15"
            >
              View web resume
            </Link>
            <Link
              href="/cv"
              className="rounded-lg bg-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/15"
            >
              View academic CV
            </Link>
          </div>
        </article>
      )}

      {testimonial ? (
        <figure className="mt-8 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <blockquote className="text-lg font-medium text-white">
            "{testimonial.quote}"
          </blockquote>
          <figcaption className="mt-3 text-sm text-white/65">
            {testimonial.client} · {testimonial.context}
          </figcaption>
        </figure>
      ) : null}

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {rizzkProject && (
          <article className="rounded-2xl border border-white/10 p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">Trading proof</p>
            <h2 className="mt-2 text-xl font-semibold">{rizzkProject.title}</h2>
            <p className="mt-2 text-white/80">{rizzkProject.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {rizzkProject.results.map((result) => (
                <span key={result.label} className="rounded-full bg-white/10 px-2.5 py-1 text-white/90">
                  {result.value} {result.label}
                </span>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              {rizzkProject.links?.live && (
                <a
                  className="rounded-lg bg-white/10 px-4 py-2 transition-colors hover:bg-white/15"
                  href={rizzkProject.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live demo
                </a>
              )}
              {rizzkProject.links?.source && (
                <a
                  className="rounded-lg bg-white/10 px-4 py-2 transition-colors hover:bg-white/15"
                  href={rizzkProject.links.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source
                </a>
              )}
            </div>
          </article>
        )}

        <article className="rounded-2xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-white/45">Selective contract work</p>
          <h2 className="mt-2 text-xl font-semibold">{servicesSummaryCard.title}</h2>
          <p className="mt-2 text-white/80">{servicesSummaryCard.description}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--color-accent)] px-4 py-2 text-white transition-colors hover:bg-[color:var(--color-accent)]/90"
              href={servicesSummaryCard.href}
            >
              {servicesSummaryCard.ctaLabel}
            </a>
            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 transition-colors hover:bg-white/15"
            >
              {bookingCta.label} <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
