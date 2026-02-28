import Image from "next/image";
import type { Project } from "@/data/projects";

export function ProjectGallery({ project }: { project: Project }) {
  if (!project.gallery || project.gallery.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-green-500">
        Screenshots
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {project.gallery.map((image) => (
          <div
            key={image.src}
            className="rounded-xl overflow-hidden border border-white/10"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
