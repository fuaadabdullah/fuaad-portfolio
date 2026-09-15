import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import projects from "@/data/projects";
import { servicesSummaryCard } from "@/data/services";
import { bookingCta, bookingLink, testimonials } from "@/data/contact";
import { resumeData } from "@/data/resume";
import { nowActivity } from "@/data/now";
import ProjectPreview from "@/components/ProjectPreview";
import ProjectCard from "@/components/ProjectCard";
import HeroSignal from "@/components/HeroSignal";

export default function HomePage() {
  const flagship = projects.find(
    (project) => project.slug === "goblin-assistant",
  );
  const selected = projects
    .filter(
      (project) => project.featured && project.slug !== "goblin-assistant",
    )
    .slice(0, 2);
  const testimonial = testimonials[0];
  return (
    <div className="page-shell home-page">
      <section className="hero-grid entrance" aria-labelledby="home-heading">
        <div className="hero-copy">
          <p className="eyebrow mb-5">Fuaad Abdullah / Finance × Engineering</p>
          <p className="availability mb-7">{resumeData.header.availability}</p>
          <h1 id="home-heading" className="hero-title">
            I build software for{" "}
            <span className="hero-title-accent">
              markets, automation, and AI.
            </span>
          </h1>
          <p className="intro-text mt-6">
            Fintech and AI products built end to end — from trader-facing tools
            to production backends.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/portfolio" className="button button-primary">
              See the work <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/resume" className="button button-secondary">
              View résumé
            </Link>
          </div>
          <p className="mt-7 text-sm text-[var(--color-muted)]">
            Atlanta, GA{" "}
            <span className="mx-3 text-[var(--color-border)]">/</span> Finance ×
            software engineering
          </p>
        </div>
        {flagship && (
          <div className="hero-preview hero-preview-animated">
            <HeroSignal />
            <div className="hero-preview-heading">
              <p className="eyebrow">Featured build / 01</p>
              <span className="text-sm text-[var(--color-muted)]">AI / Full stack</span>
            </div>
            <Link
              href={`/portfolio/${flagship.slug}`}
              className="project-preview"
              aria-label={`Explore ${flagship.title} case study`}
            >
              <ProjectPreview project={flagship} priority decorative />
            </Link>
            <div className="hero-preview-caption">
              <div>
                <p className="font-display text-2xl font-semibold">
                  {flagship.title}
                </p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  Multi-provider AI. Observable by design.
                </p>
              </div>
              <Link href={`/portfolio/${flagship.slug}`} className="project-open" aria-label={`Read the ${flagship.title} case study`}>
                <ArrowUpRight size={22} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-preview-stack" aria-label="Featured project technologies">
              {flagship.tech.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}
            </div>
          </div>
        )}
      </section>

      <section className="section-space" aria-labelledby="selected-heading">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5 border-t border-[var(--color-border)] pt-8">
          <div>
            <p className="eyebrow mb-3">Selected work / 02</p>
            <h2 id="selected-heading" className="section-title">
              Built for real workflows.
            </h2>
          </div>
          <Link href="/portfolio" className="text-link">
            All projects <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-7 md:grid-cols-2">
          {selected.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section
        className="section-space border-t border-[var(--color-border)] pt-8"
        aria-labelledby="approach-heading"
      >
        <p className="eyebrow mb-3">How I work / 03</p>
        <h2 id="approach-heading" className="section-title">
          Market context. Engineering discipline.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            [
              "01",
              "Start with the workflow",
              "I trade, review risk, and build around decisions I understand firsthand. The problem comes before the stack.",
            ],
            [
              "02",
              "Own the whole system",
              "From a React interface to a Python backend, data storage, and deployment — I connect the pieces and ship.",
            ],
            [
              "03",
              "Make the work inspectable",
              "Live products, source code, architecture decisions, and clearly attributed outcomes. Follow the evidence in each case study.",
            ],
          ].map(([number, title, body]) => (
            <div key={number} className="approach-card">
              <span className="text-sm text-[var(--color-accent)]">
                {number}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-relaxed text-[var(--color-muted)]">
                {body}
              </p>
            </div>
          ))}
        </div>
        <aside
          className="surface mt-12 grid gap-4 p-6 md:grid-cols-[160px_1fr]"
          aria-label="What I'm building right now"
        >
          <div>
            <p className="availability">Building now</p>
            <p className="mt-2 text-xs text-[var(--color-muted)]">
              Updated {nowActivity.updatedAt}
            </p>
          </div>
          <div>
            <p className="font-medium">{nowActivity.building}</p>
            {nowActivity.detail && (
              <p className="mt-1 text-[var(--color-muted)]">
                {nowActivity.detail}
              </p>
            )}
          </div>
        </aside>
      </section>

      <section
        className="section-space home-about grid items-center gap-10 md:grid-cols-[240px_1fr]"
        aria-labelledby="about-preview-heading"
      >
        <Image
          src="/fuaad-headshot.png"
          alt="Fuaad Abdullah"
          width={480}
          height={480}
          sizes="(min-width: 768px) 240px, 180px"
          className="aspect-square w-44 rounded-xl object-cover md:w-full"
        />
        <div>
          <p className="eyebrow mb-3">A little context</p>
          <h2 id="about-preview-heading" className="section-title">
            Finance student. Trader. Builder.
          </h2>
          <p className="intro-text mt-4">
            Saudi raised, Atlanta based. I connect what I learn in finance with
            what I build in software — making risk clearer and everyday work
            simpler.
          </p>
          <Link href="/about" className="text-link mt-5">
            More about me <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section
        className="section-space home-contact"
        aria-labelledby="contact-heading"
      >
        <p className="eyebrow mb-4">What comes next</p>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2 id="contact-heading" className="section-title">
              Let’s build something useful.
            </h2>
            <p className="intro-text mt-4">
              Hiring for a software engineering role or internship? Let’s talk.
            </p>
          </div>
          <Link href="/contact" className="button button-primary">
            Get in touch <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section
        className="mt-12 grid gap-10 md:grid-cols-2"
        aria-label="Client work"
      >
        <div>
          <p className="eyebrow mb-3">Selective contract work</p>
          <h2 className="text-xl font-semibold">{servicesSummaryCard.title}</h2>
          <p className="mt-3 text-[var(--color-muted)]">
            {servicesSummaryCard.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-5">
            <Link href="/services" className="text-link">
              Explore services
            </Link>
            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
              aria-label={`${bookingCta.label} (opens in a new tab)`}
            >
              {bookingCta.label} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        {testimonial && (
          <figure className="border-l border-[var(--color-border)] pl-6">
            <blockquote className="font-display text-xl leading-relaxed">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-4 text-sm text-[var(--color-muted)]">
              {testimonial.client} · {testimonial.context}
            </figcaption>
          </figure>
        )}
      </section>
    </div>
  );
}
