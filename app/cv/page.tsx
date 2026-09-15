import Link from "next/link";
import Container from "@/components/layout/Container";
import { cvData } from "@/data/cv";
import { nowActivity } from "@/data/now";

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

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 document-row">
      <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
      {children}
    </section>
  );
}

function KeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-[var(--color-border)] py-2 pl-4">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
        {label}
      </p>
      <p className="mt-2 text-sm text-zinc-200">{value}</p>
    </div>
  );
}

export default function CvPage() {
  return (
    <section aria-labelledby="cv-heading">
      <Container className="document-page py-16">
        <section className="space-y-6">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
              Curriculum Vitae
            </p>
            <div className="space-y-2">
              <h1 id="cv-heading" className="page-heading">
                {cvData.header.name}
              </h1>
              <p className="text-lg text-zinc-100">{cvData.header.tagline}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href={cvData.header.pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
              aria-label="Download CV PDF (opens in a new tab)"
            >
              Download CV PDF
            </a>
            <Link
              href={cvData.header.resumeHref}
              className="button button-secondary"
            >
              View resume
            </Link>
            <a
              href={cvData.header.githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-secondary"
              aria-label="GitHub profile (opens in a new tab)"
            >
              GitHub
            </a>
            <a
              href={cvData.header.linkedInHref}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-secondary"
              aria-label="LinkedIn profile (opens in a new tab)"
            >
              LinkedIn
            </a>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <KeyValue label="Document type" value="Academic CV (full)" />
            <KeyValue
              label="Core lens"
              value="Finance, trading systems, and applied software problem-solving"
            />
            <KeyValue
              label="Current focus"
              value="Graduate programs, intellectually serious product work, and research-minded builders"
            />
          </div>

          <div className="surface p-6 text-sm text-[var(--color-muted)]">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Building now
            </p>
            <p className="mt-1 font-medium">{nowActivity.building}</p>
            {nowActivity.detail && (
              <p className="mt-0.5 text-[var(--color-accent)]">
                {nowActivity.detail}
              </p>
            )}
            <p className="mt-2 text-[10px] text-[var(--color-accent)]">
              Updated {nowActivity.updatedAt}
            </p>
          </div>
        </section>

        <SectionCard title={cvData.summary.title}>
          <div className="space-y-4">
            {cvData.summary.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-relaxed text-zinc-300"
              >
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
                <span className="text-zinc-100">GPA:</span>{" "}
                {cvData.education.gpa}
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
                <span className="text-zinc-100">Honors:</span>{" "}
                {cvData.education.honors.join(" · ")}
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
                  <p
                    key={paragraph}
                    className="text-sm leading-relaxed text-zinc-300"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </SectionCard>
          ))}
        </div>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-100">
            Projects & problem-solving
          </h2>
          <div className="space-y-5">
            {cvData.projects.map((project) => (
              <article key={project.title} className="space-y-4 document-row">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-zinc-100">
                        {project.title}
                      </h3>
                      <p className="text-sm text-zinc-300">
                        {project.subtitle}
                      </p>
                    </div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                      {project.context}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-white/10 px-2 py-1 text-xs text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {project.problem ? (
                    <KeyValue
                      label="Problem / research question"
                      value={project.problem}
                    />
                  ) : null}
                  {project.audienceAndStakes ? (
                    <KeyValue
                      label="Why this problem matters"
                      value={project.audienceAndStakes}
                    />
                  ) : null}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {project.approach ? (
                    <KeyValue
                      label="Approach / decision process"
                      value={project.approach}
                    />
                  ) : null}
                  {project.tradeoffs ? (
                    <KeyValue
                      label="Tradeoffs / alternatives"
                      value={project.tradeoffs}
                    />
                  ) : null}
                </div>

                {project.learnings && project.learnings.length > 0 ? (
                  <div>
                    <h4 className="text-sm font-medium text-zinc-100">
                      What changed my thinking
                    </h4>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-zinc-300">
                      {project.learnings.map((learning) => (
                        <li key={learning}>{learning}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {project.impact ? (
                  <p className="text-sm leading-relaxed text-zinc-300">
                    <span className="text-zinc-100">Outcome:</span>{" "}
                    {project.impact}
                  </p>
                ) : null}

                <div className="flex flex-wrap gap-3 text-xs">
                  {project.links?.live ? (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-accent)] hover:underline"
                      aria-label={`${project.title} live site (opens in a new tab)`}
                    >
                      Live
                    </a>
                  ) : null}
                  {project.links?.source ? (
                    <a
                      href={project.links.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-accent)] hover:underline"
                      aria-label={`${project.title} source code (opens in a new tab)`}
                    >
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
