
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

export default function ProjectCard({ project, variant = "default" }: ProjectCardProps) {
  const isCompact = variant === "compact";
  return (
    <Card variant={variant}>
      {project.image && !isCompact && (
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
      )}
      <h2 className={clsx("font-semibold", isCompact ? "text-base" : "text-xl")}>{project.title}</h2>
      {!isCompact && <p className="text-white/80 mt-2">{project.tagline}</p>}
      <div className={clsx("mt-3 flex flex-wrap gap-2 text-xs", isCompact && "mt-2")}
        aria-label="Technologies used">
        {project.tech.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
      {!isCompact && (
        <div className="mt-4 flex gap-3">
          {project.links?.live && (
            <a className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/15 transition-colors" href={project.links.live} target="_blank" rel="noopener noreferrer">
              Live demo
            </a>
          )}
          {project.links?.source && (
            <a className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/15 transition-colors" href={project.links.source} target="_blank" rel="noopener noreferrer">
              Source code
            </a>
          )}
          <Link className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/15 transition-colors" href={`/portfolio/${project.slug}`}>
            View details
          </Link>
        </div>
      )}
    </Card>
  );
}
