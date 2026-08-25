import Link from "next/link";
import Badge from "@/components/Badge";
import ProjectProofMedia from "@/components/ProjectProofMedia";
import ProjectResultChips from "@/components/ProjectResultChips";
import GoblinArchitectureDiagram from "@/components/case-study/GoblinArchitectureDiagram";
import GoblinRoutingSequence from "@/components/case-study/GoblinRoutingSequence";
import ProductionObservability from "@/components/case-study/ProductionObservability";
import AtScalePlan from "@/components/case-study/AtScalePlan";
import { Project } from "@/data/projects";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">{children}</h2>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.15em] text-emerald-400 mb-3">{children}</p>
  );
}

export default function GoblinCaseStudy({ project }: { project: Project }) {
  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      {/* Back nav */}
      <Link
        href="/portfolio"
        className="inline-flex items-center text-sm text-white/50 hover:text-white transition-colors mb-10"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Portfolio
      </Link>

      {/* Flagship header */}
      <header className="mb-14">
        <p className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-4">Flagship case study</p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight mb-5">
          {project.title}
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mb-8 leading-relaxed">{project.tagline}</p>

        <div className="flex flex-wrap gap-4 mb-8">
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 font-medium text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live demo
            </a>
          )}
          {project.links?.source && (
            <a
              href={project.links.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/15 px-5 py-2.5 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub repo
            </a>
          )}
        </div>

        <ProjectResultChips results={project.results} />

        <div className="flex flex-wrap gap-5 mt-6 text-sm text-white/50">
          {project.timeline && <span><span className="text-white/70">Timeline:</span> {project.timeline}</span>}
          {project.role && <span><span className="text-white/70">Role:</span> {project.role}</span>}
        </div>
      </header>

      {/* Overview */}
      <section className="mb-14">
        <SectionLabel>What it is</SectionLabel>
        <SectionHeading>Overview</SectionHeading>
        <div className="mt-4 space-y-4">
          {project.description.split("\n\n").map((p, i) => (
            <p key={i} className="leading-relaxed text-white/75">{p}</p>
          ))}
        </div>
      </section>

      {/* Architecture diagram */}
      {project.architectureDiagram && (
        <section className="mb-14">
          <SectionLabel>How it&apos;s built</SectionLabel>
          <SectionHeading>System architecture</SectionHeading>
          <p className="mt-4 mb-6 leading-relaxed text-white/75">{project.architectureDiagram}</p>
          <GoblinArchitectureDiagram />
        </section>
      )}

      {/* Routing sequence */}
      {project.routingSequence && (
        <section className="mb-14">
          <SectionLabel>Request lifecycle</SectionLabel>
          <SectionHeading>Provider routing: the failover branch</SectionHeading>
          <p className="mt-4 mb-6 leading-relaxed text-white/75">{project.routingSequence}</p>
          <GoblinRoutingSequence />
        </section>
      )}

      {/* Observability */}
      {project.observability && (
        <section className="mb-14">
          <SectionLabel>Proof it&apos;s real</SectionLabel>
          <SectionHeading>Production observability</SectionHeading>
          <div className="mt-4">
            <ProductionObservability observability={project.observability} />
          </div>
        </section>
      )}

      {/* Major architectural tradeoff */}
      {project.tradeoffs && (
        <section className="mb-14">
          <SectionLabel>The biggest call</SectionLabel>
          <SectionHeading>Major architectural tradeoff</SectionHeading>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="leading-relaxed text-white/80">{project.tradeoffs}</p>
          </div>
        </section>
      )}

      {/* At scale */}
      {project.atScale && (
        <section className="mb-14">
          <SectionLabel>Thinking ahead</SectionLabel>
          <SectionHeading>What changes at 10× scale</SectionHeading>
          <div className="mt-4">
            <AtScalePlan atScale={project.atScale} />
          </div>
        </section>
      )}

      {/* Demo walkthrough */}
      {project.proofMedia && project.proofMedia.length > 0 && (
        <section className="mb-14">
          <SectionLabel>See it running</SectionLabel>
          <SectionHeading>Demo walkthrough</SectionHeading>
          <div className="mt-4">
            <ProjectProofMedia media={project.proofMedia} mode="detail" />
          </div>
        </section>
      )}

      {/* Tech stack */}
      <section className="mb-14">
        <SectionLabel>Stack</SectionLabel>
        <SectionHeading>Technologies</SectionHeading>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </section>

      {/* Problem / approach / impact */}
      <section className="mb-14 space-y-8">
        <div>
          <SectionLabel>Context</SectionLabel>
          <SectionHeading>Problem &amp; approach</SectionHeading>
        </div>
        {project.problem && (
          <div>
            <h3 className="text-base font-medium text-white/90 mb-2">Problem</h3>
            <p className="leading-relaxed text-white/70">{project.problem}</p>
          </div>
        )}
        {project.audienceAndStakes && (
          <div>
            <h3 className="text-base font-medium text-white/90 mb-2">Audience &amp; stakes</h3>
            <p className="leading-relaxed text-white/70">{project.audienceAndStakes}</p>
          </div>
        )}
        {project.approach && (
          <div>
            <h3 className="text-base font-medium text-white/90 mb-2">Approach</h3>
            <p className="leading-relaxed text-white/70">{project.approach}</p>
          </div>
        )}
        {project.impact && (
          <div>
            <h3 className="text-base font-medium text-white/90 mb-2">Outcome</h3>
            <p className="leading-relaxed text-white/70">{project.impact}</p>
          </div>
        )}
      </section>

      {/* Footer nav */}
      <footer className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
        <Link
          href="/portfolio"
          className="inline-flex items-center text-sm text-white/50 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Portfolio
        </Link>
        {project.links?.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Open live demo →
          </a>
        )}
      </footer>
    </article>
  );
}
