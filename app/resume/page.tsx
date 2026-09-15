import Link from "next/link";
import LinkedInBadge from "@/components/LinkedInBadge";
import {
  resumeData,
  type AcademicDetail,
  type ResumeCard,
  type ResumeExperience,
  type ResumeProject,
} from "@/data/resume";
import { cvData } from "@/data/cv";
import Container from "@/components/layout/Container";
import { nowActivity, type NowActivity } from "@/data/now";

export const metadata = {
  title: "Resume – Fuaad Abdullah",
  description:
    "Recruiter-ready web resume for Fuaad Abdullah, a finance student and full-stack developer building trading, automation, and AI tools.",
  openGraph: {
    title: "Resume – Fuaad Abdullah",
    description:
      "Finance x dev profile with shipped trading tools, production apps, quantified outcomes, and current availability for fintech SWE roles and internships.",
    images: ["/og-default.png"],
  },
};

function CardShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`document-row ${className}`.trim()}>{children}</div>;
}

function MultilineText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, idx) => (
        <span key={idx}>
          {line}
          {idx < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  );
}

function MiniCard({ card }: { card: ResumeCard }) {
  return (
    <CardShell className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
        {card.eyebrow}
      </p>
      {card.title ? <p className="text-zinc-100">{card.title}</p> : null}
      <p className="text-zinc-300">
        <MultilineText text={card.body} />
      </p>
    </CardShell>
  );
}

function AcademicDetails({ details }: { details?: AcademicDetail }) {
  if (!details) {
    return null;
  }

  return (
    <div className="space-y-3 document-row">
      <div>
        <h3 className="text-base font-semibold text-zinc-100">
          {details.institution} · {details.degree}
        </h3>
        <p className="text-sm text-zinc-300">{details.years}</p>
      </div>
      {details.gpa ? (
        <p className="text-sm text-zinc-300">
          <span className="text-zinc-100">GPA:</span> {details.gpa}
        </p>
      ) : null}
      {details.coursework?.length ? (
        <p className="text-sm text-zinc-300">
          <span className="text-zinc-100">Coursework:</span>{" "}
          {details.coursework.join(" · ")}
        </p>
      ) : null}
      {details.honors?.length ? (
        <p className="text-sm text-zinc-300">
          <span className="text-zinc-100">Honors:</span>{" "}
          {details.honors.join(" · ")}
        </p>
      ) : null}
      {details.notes ? (
        <p className="text-sm text-zinc-400">{details.notes}</p>
      ) : null}
    </div>
  );
}

function RecruiterSignal({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-[var(--color-border)] py-2 pl-4">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
        {label}
      </p>
      <p className="mt-2 text-sm text-zinc-200">{value}</p>
    </div>
  );
}

function ExperienceCard({ exp }: { exp: ResumeExperience }) {
  return (
    <div className="space-y-3 document-row">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-zinc-100">{exp.title}</h3>
          <p className="text-sm text-zinc-300">{exp.subtitle}</p>
        </div>
      </div>

      <p className="text-sm text-zinc-300">{exp.description}</p>

      <ul className="list-disc space-y-1.5 pl-5 text-sm text-zinc-300">
        {exp.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ project }: { project: ResumeProject }) {
  return (
    <div className="space-y-4 document-row">
      <div className="space-y-2">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-zinc-100">
              {project.title}
            </h3>
            <p className="text-sm text-zinc-300">{project.tagline}</p>
          </div>
          {project.links?.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-secondary"
            >
              Live
            </a>
          ) : null}
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

      {project.metrics?.length ? (
        <div className="grid gap-2 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div
              key={`${project.title}-${metric.label}`}
              className="border-l border-[var(--color-border)] py-2 pl-3"
            >
              <p className="text-base font-semibold text-zinc-100">
                {metric.value}
              </p>
              <p className="text-xs text-zinc-400">{metric.label}</p>
            </div>
          ))}
        </div>
      ) : null}

      {project.bullets?.length ? (
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-zinc-300">
          {project.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}

      {project.links?.source ? (
        <div className="flex gap-2 pt-1 text-xs">
          <a
            href={project.links.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] hover:underline"
          >
            Source
          </a>
        </div>
      ) : null}
    </div>
  );
}

function ResumeHero({
  header,
  activity,
}: {
  header: (typeof resumeData)["header"];
  activity: NowActivity;
}) {
  return (
    <section className="space-y-6">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
          Resume & Profile
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)] px-3 py-1.5 text-zinc-100">
            {header.availability}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-zinc-100">
            Finance x software
          </span>
        </div>
        <div className="space-y-2">
          <h1 id="resume-heading" className="page-heading">
            {header.name}
          </h1>
          <p className="text-lg text-zinc-100">{header.tagline}</p>
          <p className="max-w-3xl text-sm leading-relaxed text-zinc-300">
            {header.subline}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <a
          href={header.pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-primary"
        >
          Resume (1 page)
        </a>
        <a
          href={cvData.header.pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-secondary"
        >
          CV (full)
        </a>
        <a
          href={header.linkedInHref}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-secondary"
        >
          View LinkedIn
        </a>
        <a href={header.emailHref} className="button button-secondary">
          Email
        </a>
        <Link href="/portfolio" className="button button-secondary">
          View portfolio
        </Link>
        <Link href="/cv" className="button button-secondary">
          View CV
        </Link>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {header.signals.map((signal) => (
          <RecruiterSignal
            key={signal.label}
            label={signal.label}
            value={signal.value}
          />
        ))}
      </div>

      <CardShell className="surface space-y-2 p-6">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
          Building now
        </p>
        <p className="text-base font-medium">{activity.building}</p>
        {activity.detail && (
          <p className="text-sm text-[var(--color-muted)]">{activity.detail}</p>
        )}
        <p className="text-xs text-[var(--color-muted)]">
          Updated {activity.updatedAt}
        </p>
      </CardShell>
    </section>
  );
}

function ResumeSummary({
  summary,
}: {
  summary: (typeof resumeData)["summary"];
}) {
  return (
    <section className="grid items-start gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div className="space-y-4 document-row">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
            {summary.eyebrow}
          </p>
          <p className="mt-2 text-lg font-medium text-zinc-100">
            {summary.title}
          </p>
        </div>
        {summary.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-relaxed text-zinc-300">
            {paragraph}
          </p>
        ))}
        <div className="grid gap-3 pt-1">
          {summary.highlights.map((highlight) => (
            <RecruiterSignal
              key={highlight.label}
              label={highlight.label}
              value={highlight.value}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-3 text-xs md:text-sm">
        {summary.sideCards.map((card) => (
          <CardShell key={card.eyebrow}>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
              {card.eyebrow}
            </p>
            <p className="mt-2 text-zinc-300">
              <MultilineText text={card.body} />
            </p>
          </CardShell>
        ))}
      </div>
    </section>
  );
}

function ResumeCardGrid({
  title,
  cards,
}: {
  title: string;
  cards: ResumeCard[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
      <div className="grid gap-4 text-sm md:grid-cols-2">
        {cards.map((card) => (
          <MiniCard key={card.eyebrow} card={card} />
        ))}
      </div>
    </section>
  );
}

function EducationSection({
  title,
  details,
  cards,
}: {
  title: string;
  details?: AcademicDetail;
  cards: ResumeCard[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
      <div className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <AcademicDetails details={details} />
        <div className="grid gap-4 text-sm">
          {cards.map((card) => (
            <MiniCard key={card.eyebrow} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ResumeExperienceSection({
  title,
  entries,
}: {
  title: string;
  entries: ResumeExperience[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
      <div className="space-y-4">
        {entries.map((entry) => (
          <ExperienceCard key={entry.title} exp={entry} />
        ))}
      </div>
    </section>
  );
}

function ProjectsSection({
  title,
  items,
}: {
  title: string;
  items: ResumeProject[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
      <div className="grid gap-4">
        {items.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

function ResumeContact({
  contact,
}: {
  contact: (typeof resumeData)["contact"];
}) {
  return (
    <section className="grid items-start gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-zinc-100">{contact.title}</h2>
        {contact.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-sm text-zinc-300">
            {paragraph}
          </p>
        ))}
        <p className="text-sm text-zinc-300">
          <span className="text-zinc-100">Email:</span>{" "}
          <a href={contact.emailHref} className="underline underline-offset-2">
            {contact.emailLabel}
          </a>
        </p>
      </div>

      <div className="document-row">
        <LinkedInBadge />
      </div>
    </section>
  );
}

export default async function ResumePage() {
  const { header, summary, academic, experience, projects, skills, contact } =
    resumeData;
  return (
    <section aria-labelledby="resume-heading">
      <Container className="document-page py-16">
        <ResumeHero header={header} activity={nowActivity} />
        <ResumeSummary summary={summary} />
        <ResumeExperienceSection
          title={experience.title}
          entries={experience.entries}
        />
        <ProjectsSection title={projects.title} items={projects.items} />
        <ResumeCardGrid title={skills.title} cards={skills.cards} />
        <EducationSection
          title={academic.title}
          details={academic.details}
          cards={academic.cards}
        />
        <ResumeContact contact={contact} />
      </Container>
    </section>
  );
}
