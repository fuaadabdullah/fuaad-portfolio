import Link from "next/link";
import clsx from "clsx";
import Card, { CardVariant } from "./Card";
import Badge from "./Badge";
import { Project } from "@/data/projects";
import ProjectProofMedia from "./ProjectProofMedia";
import ProjectResultChips from "./ProjectResultChips";

interface ProjectCardProps {
  project: Project;
  variant?: CardVariant;
}

export default function ProjectCard({ project, variant = "default" }: ProjectCardProps) {
  const isCompact = variant === "compact";
  const outcomeSummary = (project.impact?.split(".")[0]?.trim() || project.tagline).replace(/[.!?]+$/, "");

  return (
    <Card variant={variant}>
      <h2 className={clsx("font-semibold", isCompact ? "text-base" : "text-xl")}>{project.title}</h2>
      {!isCompact && (
        <>
          <p className="mt-2 text-white/80">{project.tagline}</p>
          <ProjectResultChips className="mt-4" results={project.results} />
          <ProjectProofMedia className="mt-4" media={project.proofMedia} mode="card" />
          <p className="mt-4 text-sm text-white/80">{outcomeSummary}.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {project.links?.live && (
              <a
                className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/15 transition-colors"
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live demo
              </a>
            )}
            {project.links?.source && (
              <a
                className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/15 transition-colors"
                href={project.links.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source code
              </a>
            )}
            <Link
              className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/15 transition-colors"
              href={`/portfolio/${project.slug}`}
            >
              View details
            </Link>
          </div>
          <div
            className="mt-4 flex flex-wrap gap-2 text-[11px] opacity-75"
            aria-label="Technologies used"
            data-testid="project-tech-row"
          >
            {project.tech.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </>
      )}
      {isCompact && (
        <div
          className={clsx("mt-3 flex flex-wrap gap-2 text-xs", isCompact && "mt-2")}
          aria-label="Technologies used"
        >
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      )}
    </Card>
  );
}
