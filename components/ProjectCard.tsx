import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CardVariant } from "./Card";
import Badge from "./Badge";
import type { Project } from "@/data/projects";
import ProjectPreview from "./ProjectPreview";
import ProjectResultChips from "./ProjectResultChips";

interface ProjectCardProps {
  project: Project;
  variant?: CardVariant;
}

export default function ProjectCard({
  project,
  variant = "default",
}: ProjectCardProps) {
  const compact = variant === "compact";
  return (
    <article className="project-entry">
      {!compact && (
        <Link
          href={`/portfolio/${project.slug}`}
          className="project-preview mb-6"
          aria-label={`Explore ${project.title}`}
        >
          <ProjectPreview project={project} />
        </Link>
      )}
      <h2>
        <Link
          href={`/portfolio/${project.slug}`}
          className="flex items-center justify-between gap-4 hover:text-[var(--color-accent)]"
        >
          {project.title}
          <ArrowUpRight size={22} aria-hidden="true" />
        </Link>
      </h2>
      {!compact && (
        <>
          <p className="mt-3 text-[var(--color-muted)]">{project.tagline}</p>
          <ProjectResultChips
            className="project-results mt-5"
            results={project.results}
          />
          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm">
            <Link className="text-link" href={`/portfolio/${project.slug}`}>
              View details <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            {project.links?.live && (
              <a
                className="text-link"
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live demo
              </a>
            )}
            {project.links?.source && (
              <a
                className="text-link"
                href={project.links.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source code
              </a>
            )}
          </div>
        </>
      )}
      <div
        className="mt-5 flex flex-wrap gap-2 text-xs"
        aria-label="Technologies used"
        data-testid="project-tech-row"
      >
        {project.tech.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
    </article>
  );
}
