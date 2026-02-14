
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import Card, { CardVariant } from "./Card";
import Badge from "./Badge";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  variant?: CardVariant;
}

function ProjectCardImage({ project }: { project: Project }) {
  if (!project.image) return null;
  return (
    <div className="mb-4 -mt-2">
      <Image
        src={project.image.src}
        alt={project.image.alt}
        width={project.image.width}
        height={project.image.height}
        priority={project.image.priority}
        className="w-full h-auto rounded-xl"
      />
    </div>
  );
}

type Action = { kind: "link" | "anchor"; href: string; label: string };

function getActions(project: Project): Action[] {
  const actions: Action[] = [];
  if (project.links?.live) {
    actions.push({ kind: "anchor", href: project.links.live, label: "Live demo" });
  }
  if (project.links?.source) {
    actions.push({ kind: "anchor", href: project.links.source, label: "Source code" });
  }
  actions.push({ kind: "link", href: `/portfolio/${project.slug}`, label: "View details" });
  return actions;
}

function ProjectCardActions({ project }: { project: Project }) {
  const actions = getActions(project);
  return (
    <div className="mt-4 flex gap-3">
      {actions.map((a) =>
        a.kind === "link" ? (
          <Link
            key={a.href}
            className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/15 transition-colors"
            href={a.href}
          >
            {a.label}
          </Link>
        ) : (
          <a
            key={a.href}
            className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/15 transition-colors"
            href={a.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {a.label}
          </a>
        )
      )}
    </div>
  );
}

export default function ProjectCard({
  project,
  variant = "default",
}: ProjectCardProps) {
  const isCompact = variant === "compact";

  return (
    <Card variant={variant}>
      {!isCompact && <ProjectCardImage project={project} />}
      <h2
        className={clsx("font-semibold", isCompact ? "text-base" : "text-xl")}
      >
        {project.title}
      </h2>
      {!isCompact && <p className="text-white/80 mt-2">{project.tagline}</p>}
      <div
        className={clsx(
          "mt-3 flex flex-wrap gap-2 text-xs",
          isCompact ? "mt-2" : undefined
        )}
        aria-label="Technologies used"
      >
        {project.tech.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
      {!isCompact && <ProjectCardActions project={project} />}
    </Card>
  );
}
