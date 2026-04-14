import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import projects from "@/data/projects";
import { servicesSummaryCard } from "@/data/services";
import { bookingCta, bookingLink, testimonials } from "@/data/contact";
import { resumeData } from "@/data/resume";
import { cvData } from "@/data/cv";
import { getLatestGitActivity } from "@/lib/git-activity";

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
  const activity = getLatestGitActivity();

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <section className="space-y-4">
        <div className="max-w-3xl space-y-5">
          <p className="text-sm uppercase tracking-[0.2em] text-white/50">
            Recruiter-ready portfolio • Finance x software • Trading tools • Production builds
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-white/80">
            <SignalChip tone="accent">{resumeData.header.availability}</SignalChip>
            <SignalChip>Finance major who actually trades</SignalChip>
            <SignalChip>Python · TypeScript · Next.js · FastAPI</SignalChip>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Finance student and developer building tools I use in my own trading.
          </h1>

          <p className="max-w-2xl text-white/80">
            I ship fintech, automation, and AI products end to end, from trader-facing risk tools to production web apps and API backends. Recruiters screening for can-this-person-ship, stack clarity, and seriousness should find that answer fast here.
          </p>

          <div className="grid gap-3 sm:grid-cols-3 text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">Finance edge</p>
              <p className="mt-2 text-white/85">Active trader building products around real market workflows.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">Shipping proof</p>
              <p className="mt-2 text-white/85">~90% fewer sizing mistakes, 60-70% grading time saved, 7-page client site shipped in 1 week.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">Current stack</p>
              <p className="mt-2 text-white/85">Next.js, React, TypeScript, Python, FastAPI, PostgreSQL, Redis, Docker, Azure, Fly.io.</p>
            </div>
          </div>

          {activity ? (
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-sm text-cyan-50">
              <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-100/70">Recently shipped</p>
              <p className="mt-1 font-medium">{activity.subject}</p>
              <p className="mt-1 text-cyan-100/80">
                Last commit {activity.relativeTime} on {activity.committedAt}.
              </p>
            </div>
          ) : null}

          {goblinProject && (
            <article className="mt-2 rounded-2xl border border-emerald-400/30 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium text-zinc-100">Flagship: {goblinProject.title}</p>
                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-[11px] text-emerald-100">
                  FastAPI · Postgres · Redis · Terraform · Fly.io
                </span>
              </div>
              <p className="mt-2 text-sm text-white/80">
                Multi-provider AI assistant with observable routing, live provider health, and production-ready infra split across edge, backend, and frontend.
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

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 rounded-2xl bg-[color:var(--color-accent)] px-6 py-3.5 font-semibold text-black transition-colors hover:bg-[color:var(--color-accent)]/90"
            >
              View resume <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 transition-colors hover:bg-white/15"
            >
              See portfolio <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              href="/cv"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 transition-colors hover:bg-white/15"
            >
              View CV <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a
              href={resumeData.header.linkedInHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 transition-colors hover:bg-white/15"
            >
              LinkedIn <ArrowRight size={18} aria-hidden="true" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 transition-colors hover:bg-white/15"
            >
              Contact <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a
              href="/Fuaad_Abdullah_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 transition-colors hover:bg-white/15"
            >
              Resume (1 page) <Download size={18} aria-hidden="true" />
            </a>
            <a
              href={cvData.header.pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 transition-colors hover:bg-white/15"
            >
              CV (full) <Download size={18} aria-hidden="true" />
            </a>
          </div>

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
        </div>
      </section>

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
