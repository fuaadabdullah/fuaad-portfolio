import Link from "next/link";
import LinkedInBadge from "@/components/LinkedInBadge";
import { resumeData, type ResumeCard, type ResumeExperience, type ResumeProject } from "@/data/resume";
import Container from "@/components/layout/Container";

export const metadata = {
  title: "Resume – Fuaad Abdullah",
  description:
    "Resume and profile for Fuaad Abdullah – finance major, freelance developer, and day trader building fintech tools, trading dashboards, and portfolio sites.",
  openGraph: {
    title: "Resume – Fuaad Abdullah",
    description:
      "Profile for recruiters, clients, and schools: finance major at GSU with hands-on experience building risk tools, dashboards, and web apps.",
    images: ["/og-default.png"],
  },
};

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-[color:var(--color-coal)] border border-white/5 p-4 space-y-1">
      {children}
    </div>
  );
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
    <CardShell>
      <p className="text-xs font-medium text-zinc-200 uppercase tracking-[0.16em]">
        {card.eyebrow}
      </p>
      {card.title ? <p className="text-zinc-100">{card.title}</p> : null}
      <p className="text-zinc-300">
        <MultilineText text={card.body} />
      </p>
    </CardShell>
  );
}

function ExperienceCard({ exp }: { exp: ResumeExperience }) {
  return (
    <div className="rounded-3xl bg-[color:var(--color-coal)] border border-white/5 p-6 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-zinc-100">{exp.title}</h3>
          <p className="text-sm text-zinc-300">{exp.subtitle}</p>
        </div>
      </div>

      <p className="text-sm text-zinc-300">{exp.description}</p>

      <ul className="text-sm text-zinc-300 list-disc list-inside space-y-1">
        {exp.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ project }: { project: ResumeProject }) {
  return (
    <div className="rounded-2xl bg-[color:var(--color-coal)] border border-white/5 p-4 space-y-2">
      <div>
        <h3 className="text-base font-semibold text-zinc-100">{project.title}</h3>
        <p className="text-sm text-zinc-300">{project.tagline}</p>
      </div>
      
      <div className="flex flex-wrap gap-1">
        {project.tech.map((t) => (
          <span key={t} className="text-xs bg-white/10 text-zinc-300 px-2 py-1 rounded">
            {t}
          </span>
        ))}
      </div>
      
      {project.links && (
        <div className="flex gap-2 text-xs pt-2">
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Live
            </a>
          )}
          {project.links.source && (
            <a href={project.links.source} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Source
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function ResumeHero({
  header,
}: {
  header: (typeof resumeData)["header"];
}) {
  return (
    <section className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Resume & Profile
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold">{header.name}</h1>
        <p className="text-sm text-zinc-300">
          {header.tagline.split("fintech tools,").map((part, idx) =>
            idx === 0 ? (
              part
            ) : (
              <span key={idx}>
                fintech tools,
                <span className="text-zinc-100">
                  {" "}
                  trading dashboards, and portfolio sites
                </span>
                {part.split("trading dashboards, and portfolio sites")[1] ?? ""}
              </span>
            )
          )}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <a
          href={header.pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-accent)] px-5 py-2 font-medium text-black hover:bg-[color:var(--color-accent)]/90"
        >
          Download PDF
        </a>
        <Link
          href={header.linkedInHref}
          target="_blank"
          className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-2 font-medium text-sm text-zinc-100 hover:bg-white/5"
        >
          View LinkedIn
        </Link>
        <a
          href={header.emailHref}
          className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-2 font-medium text-sm text-zinc-100 hover:bg-white/5"
        >
          Email
        </a>
      </div>
    </section>
  );
}

function ResumeSummary({
  summary,
}: {
  summary: (typeof resumeData)["summary"];
}) {
  return (
    <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
      <div className="rounded-3xl bg-[color:var(--color-coal)] border border-white/5 p-5 space-y-3">
        <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          {summary.eyebrow}
        </p>
        <p className="text-sm font-medium text-zinc-100">{summary.title}</p>
        {summary.paragraphs.map((p) => (
          <p key={p} className="text-sm text-zinc-300 leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <div className="grid gap-3 text-xs md:text-sm">
        {summary.sideCards.map((c) => (
          <CardShell key={c.eyebrow}>
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              {c.eyebrow}
            </p>
            <p className="text-zinc-300">
              <MultilineText text={c.body} />
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
      <div className="grid gap-4 md:grid-cols-3 text-sm">
        {cards.map((c) => (
          <MiniCard key={c.eyebrow} card={c} />
        ))}
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
        {entries.map((e) => (
          <ExperienceCard key={e.title} exp={e} />
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
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((p) => (
          <ProjectCard key={p.title} project={p} />
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
    <section className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-zinc-100">{contact.title}</h2>
        {contact.paragraphs.map((p) => (
          <p key={p} className="text-sm text-zinc-300">
            {p}
          </p>
        ))}
        <p className="text-sm text-zinc-300">
          <span className="text-zinc-100">Email:</span>{" "}
          <a href={contact.emailHref} className="underline underline-offset-2">
            {contact.emailLabel}
          </a>
        </p>
      </div>

      <div className="rounded-2xl bg-[color:var(--color-coal)] border border-white/5 p-4">
        <LinkedInBadge />
      </div>
    </section>
  );
}

export default function ResumePage() {
  const { header, summary, academic, experience, projects, skills, contact } = resumeData;

  return (
    <section aria-labelledby="resume-heading">
      <h1 id="resume-heading" className="sr-only">
        Resume
      </h1>
      <Container className="py-12 space-y-10">
        <ResumeHero header={header} />
        <ResumeSummary summary={summary} />
        <ResumeCardGrid title={academic.title} cards={academic.cards} />
        <ResumeExperienceSection title={experience.title} entries={experience.entries} />
        <ProjectsSection title={projects.title} items={projects.items} />
        <ResumeCardGrid title={skills.title} cards={skills.cards} />
        <ResumeContact contact={contact} />
      </Container>
    </section>
  );
}
