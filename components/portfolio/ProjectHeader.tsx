import Badge from "@/components/Badge";
import { ProjectLinks } from "@/components/portfolio/ProjectLinks";
import type { Project } from "@/data/projects";

export function ProjectHeader({ project }: { project: Project }) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
        {project.title}
      </h1>
      <p className="text-xl text-white/80 mb-6">{project.tagline}</p>

      <div className="flex flex-wrap gap-2 mb-6" aria-label="Technologies used">
        {project.tech.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>

      {(project.timeline || project.role) && (
        <div className="flex flex-wrap gap-6 text-sm text-white/60 mb-6">
          {project.timeline && (
            <div>
              <span className="font-medium text-white/80">Timeline:</span>{" "}
              {project.timeline}
            </div>
          )}
          {project.role && (
            <div>
              <span className="font-medium text-white/80">Role:</span>{" "}
              {project.role}
            </div>
          )}
        </div>
      )}

      <ProjectLinks project={project} />
    </header>
  );
}

