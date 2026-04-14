import Link from "next/link";
import Container from "@/components/layout/Container";
import { cvData } from "@/data/cv";
import { getLatestGitActivity } from "@/lib/git-activity";

export const metadata = {
  title: "CV – Fuaad Abdullah",
  description:
    "Academic CV for Fuaad Abdullah focused on finance, trading systems, applied problem-solving, and production software projects.",
  openGraph: {
    title: "CV – Fuaad Abdullah",
    description:
      "Academic-facing profile with project reasoning, education context, and a longer-form narrative connecting finance, trading, and building.",
    images: ["/og-default.png"],
  },
};

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-3xl border border-white/5 bg-[color:var(--color-coal)] p-6">
      <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
      {children}
    </section>
  );
}

function KeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">{label}</p>
      <p className="mt-2 text-sm text-zinc-200">{value}</p>
    </div>
  );
}

export default function CvPage() {
  const activity = getLatestGitActivity();

  return (
    <section aria-labelledby="cv-heading">
      <h1 id="cv-heading" className="sr-only">
        Curriculum Vitae
      </h1>
      <Container className="space-y-10 py-12">
        <section className="space-y-6">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Curriculum Vitae</p>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold md:text-5xl">{cvData.header.name}</h1>
              <p className="text-lg text-zinc-100">{cvData.header.tagline}</p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <KeyValue label="Document type" value="Academic CV (full)" />
            <KeyValue label="Core lens" value="Finance, trading systems, and applied software problem-solving" />
            <KeyValue label="Current focus" value="Graduate programs, intellectually serious product work, and research-minded builders" />
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

          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href={cvData.header.pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-accent)] px-5 py-2 font-medium text-black hover:bg-[color:var(--color-accent)]/90"
            >
              Download CV PDF
            </a>
            <Link
              href={cvData.header.resumeHref}
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-2 font-medium text-sm text-zinc-100 hover:bg-white/5"
            >
              View resume
            </Link>
            <a
              href={cvData.header.githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-2 font-medium text-sm text-zinc-100 hover:bg-white/5"
            >
              GitHub
            </a>
            <a
              href={cvData.header.linkedInHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-2 font-medium text-sm text-zinc-100 hover:bg-white/5"
            >
              LinkedIn
            </a>
          </div>
        </section>

        <SectionCard title={cvData.summary.title}>
          <div className="space-y-4">
            {cvData.summary.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-zinc-300">
                {paragraph}
              </p>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Education">
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-semibold text-zinc-100">
                {cvData.education.institution} · {cvData.education.degree}
              </h3>
              <p className="text-sm text-zinc-300">{cvData.education.years}</p>
            </div>
            {cvData.education.gpa ? (
              <p className="text-sm text-zinc-300">
                <span className="text-zinc-100">GPA:</span> {cvData.education.gpa}
              </p>
            ) : null}
            {cvData.education.coursework.length > 0 ? (
              <p className="text-sm text-zinc-300">
                <span className="text-zinc-100">Selected coursework:</span>{" "}
                {cvData.education.coursework.join(" · ")}
              </p>
            ) : null}
            {cvData.education.honors.length > 0 ? (
              <p className="text-sm text-zinc-300">
                <span className="text-zinc-100">Honors:</span> {cvData.education.honors.join(" · ")}
              </p>
            ) : null}
            {cvData.education.notes.map((note) => (
              <p key={note} className="text-sm text-zinc-400">
                {note}
              </p>
            ))}
          </div>
        </SectionCard>

        <div className="grid gap-6 md:grid-cols-2">
          {cvData.sections.map((section) => (
            <SectionCard key={section.title} title={section.title}>
              <div className="space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-zinc-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </SectionCard>
          ))}
        </div>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-100">Projects & problem-solving</h2>
          <div className="space-y-5">
            {cvData.projects.map((project) => (
              <article
                key={project.title}
                className="space-y-4 rounded-3xl border border-white/5 bg-[color:var(--color-coal)] p-6"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-zinc-100">{project.title}</h3>
                      <p className="text-sm text-zinc-300">{project.subtitle}</p>
                    </div>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{project.context}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span key={tech} className="rounded bg-white/10 px-2 py-1 text-xs text-zinc-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {project.problem ? <KeyValue label="Problem / research question" value={project.problem} /> : null}
                  {project.audienceAndStakes ? <KeyValue label="Why this problem matters" value={project.audienceAndStakes} /> : null}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {project.approach ? <KeyValue label="Approach / decision process" value={project.approach} /> : null}
                  {project.tradeoffs ? <KeyValue label="Tradeoffs / alternatives" value={project.tradeoffs} /> : null}
                </div>

                {project.learnings && project.learnings.length > 0 ? (
                  <div>
                    <h4 className="text-sm font-medium text-zinc-100">What changed my thinking</h4>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-zinc-300">
                      {project.learnings.map((learning) => (
                        <li key={learning}>{learning}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {project.impact ? (
                  <p className="text-sm leading-relaxed text-zinc-300">
                    <span className="text-zinc-100">Outcome:</span> {project.impact}
                  </p>
                ) : null}

                <div className="flex flex-wrap gap-3 text-xs">
                  {project.links?.live ? (
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      Live
                    </a>
                  ) : null}
                  {project.links?.source ? (
                    <a href={project.links.source} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      Source
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <SectionCard title="Certifications">
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-zinc-300">
            {cvData.certifications.map((certification) => (
              <li key={certification}>{certification}</li>
            ))}
          </ul>
        </SectionCard>
      </Container>
    </section>
  );
}
