import Image from "next/image";
import type { Project } from "@/data/projects";

export function ProjectHeroImage({ project }: { project: Project }) {
  if (!project.image) return null;

  return (
    <div className="mb-12 rounded-xl overflow-hidden border border-white/10">
      <Image
        src={project.image.src}
        alt={project.image.alt}
        width={project.image.width}
        height={project.image.height}
        priority={project.image.priority}
        className="w-full h-auto"
      />
    </div>
  );
}

