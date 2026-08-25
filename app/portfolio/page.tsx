import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import ProjectProofMedia from "@/components/ProjectProofMedia";
import ProjectResultChips from "@/components/ProjectResultChips";
import projects from "@/data/projects";

export const metadata = {
  title: "Portfolio — Fuaad Abdullah",
  description: "A few things I've shipped: GoblinOS Assistant, RIZZK Calculator, client sites, and AI tools — focused on real-world utility and measurable outcomes.",
  openGraph: {
    title: "Portfolio — Fuaad Abdullah",
    description: "Selected projects including GoblinOS Assistant, RIZZK Calculator, and client work built with Next.js, FastAPI, and Python.",
    images: ["/og-default.png"]
  }
};

export default function PortfolioPage() {
  const goblinProject = projects.find((p) => p.slug === "goblin-assistant");
  const featuredRest = projects.filter(
    (p) => p.featured && p.slug !== "goblin-assistant"
  );
  const experiments = projects.filter((p) => !p.featured);

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Portfolio</h1>
      <p className="text-white/80 mt-3">Four projects worth your time. Everything else is below.</p>

      {goblinProject && (
        <article className="mt-8 rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 via-white/[0.03] to-cyan-500/10 p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.15em] text-emerald-300">Flagship Build</p>
            <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs text-emerald-200">
              Deepest stack in portfolio
            </span>
          </div>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold">{goblinProject.title}</h2>
          <p className="mt-3 max-w-3xl text-white/80">
            {goblinProject.description.split("\n\n")[0]}
          </p>
          <ProjectResultChips className="mt-5" results={goblinProject.results} />
          <p className="mt-3 text-sm text-emerald-200/80">
            Full case study: architecture diagram · provider-routing sequence · production
            observability · incident postmortem · 10×-scale plan.
          </p>
          <ProjectProofMedia className="mt-5" media={goblinProject.proofMedia} mode="card" />
          <p className="mt-5 text-sm text-white/70">
            Stack depth: {goblinProject.tech.slice(0, 7).join(" · ")} · +{Math.max(goblinProject.tech.length - 7, 0)} more.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/portfolio/${goblinProject.slug}`}
              className="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-white hover:bg-emerald-400 transition-colors"
            >
              Read full case study
            </Link>
            {goblinProject.links?.live && (
              <a
                href={goblinProject.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/15 transition-colors"
              >
                Live demo
              </a>
            )}
            {goblinProject.links?.source && (
              <a
                href={goblinProject.links.source}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/15 transition-colors"
              >
                Source code
              </a>
            )}
          </div>
        </article>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {featuredRest.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {experiments.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xs uppercase tracking-[0.15em] text-white/40">Other experiments</h2>
          <ul className="mt-4 divide-y divide-white/10">
            {experiments.map((p) => (
              <li key={p.slug} className="py-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <div>
                  <Link
                    href={`/portfolio/${p.slug}`}
                    className="font-medium text-white/80 hover:text-white transition-colors"
                  >
                    {p.title}
                  </Link>
                  <span className="ml-3 text-sm text-white/40">{p.tagline}</span>
                </div>
                <div className="flex gap-3 text-xs text-white/40">
                  {p.links?.live && (
                    <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
                      Live
                    </a>
                  )}
                  {p.links?.source && (
                    <a href={p.links.source} target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
                      Source
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
