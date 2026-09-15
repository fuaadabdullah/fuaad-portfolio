import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import ProjectPreview from "@/components/ProjectPreview";
import ProjectResultChips from "@/components/ProjectResultChips";
import projects from "@/data/projects";

export const metadata = {
  title: "Portfolio — Fuaad Abdullah",
  description:
    "Selected engineering work in markets, automation, and AI. Shipped products, source code, and the decisions behind them.",
  openGraph: {
    title: "Portfolio — Fuaad Abdullah",
    description:
      "Selected projects including GoblinOS Assistant, RIZZK Calculator, and client work.",
    images: ["/og-default.png"],
  },
};

export default function PortfolioPage() {
  const flagship = projects.find((p) => p.slug === "goblin-assistant");
  const selected = projects.filter(
    (p) => p.featured && p.slug !== "goblin-assistant",
  );
  const experiments = projects.filter((p) => !p.featured);
  return (
    <div className="page-shell">
      <PageHeader label="Selected engineering work" title="Ideas, shipped.">
        <p>
          Four projects worth your time. Real workflows, inspectable systems,
          and the decisions behind the build.
        </p>
      </PageHeader>
      {flagship && (
        <article className="surface p-5 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="eyebrow">Flagship build</p>
            <p className="text-xs text-[var(--color-muted)]">
              01 / Markets, automation & AI
            </p>
          </div>
          <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_1fr]">
            <Link
              href={`/portfolio/${flagship.slug}`}
              className="project-preview"
              aria-label={`Explore ${flagship.title}`}
            >
              <ProjectPreview project={flagship} priority decorative />
            </Link>
            <div>
              <h2 className="section-title">{flagship.title}</h2>
              <p className="intro-text mt-4">{flagship.tagline}</p>
              <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
                Explore the architecture, provider routing, observability, and
                the plan for scaling the system.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/portfolio/${flagship.slug}`}
                  className="button button-primary"
                >
                  Read full case study{" "}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                {flagship.links?.live && (
                  <a
                    href={flagship.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-secondary"
                    aria-label={`${flagship.title} live demo (opens in a new tab)`}
                  >
                    Live demo
                  </a>
                )}
              </div>
              {flagship.links?.source && (
                <a
                  href={flagship.links.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link mt-4 text-sm"
                  aria-label={`${flagship.title} source code (opens in a new tab)`}
                >
                  Source code <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
          <ProjectResultChips
            className="mt-8 border-t border-[var(--color-border)] pt-6"
            results={flagship.results}
          />
          <p className="mt-5 text-sm text-[var(--color-muted)]">
            {flagship.tech.join(" · ")}
          </p>
        </article>
      )}
      <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
        {selected.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      {experiments.length > 0 && (
        <section className="section-space">
          <p className="eyebrow mb-3">The workshop</p>
          <h2 className="section-title">Other experiments</h2>
          <ul className="mt-8 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {experiments.map((project) => (
              <li
                key={project.slug}
                className="flex flex-wrap items-center justify-between gap-4 py-6"
              >
                <div className="max-w-2xl">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="font-display text-xl font-medium hover:text-[var(--color-accent)]"
                  >
                    {project.title}
                  </Link>
                  <p className="mt-2 text-[var(--color-muted)]">
                    {project.tagline}
                  </p>
                </div>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="text-link text-sm"
                  aria-label={`View ${project.title}`}
                >
                  View project <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
