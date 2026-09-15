import Image from "next/image";
import type { Project } from "@/data/projects";

export default function ProjectPreview({
  project,
  priority = false,
  sizes = "(min-width: 1152px) 540px, (min-width: 768px) 50vw, calc(100vw - 48px)",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  const screenshot =
    project.image ??
    project.proofMedia?.find(
      (media) => media.type === "image" && media.status === "ready",
    ) ??
    project.gallery?.[0];
  if (!screenshot) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center p-8 text-sm text-[var(--color-muted)]">
        Preview coming soon
      </div>
    );
  }
  return (
    <Image
      src={screenshot.src}
      alt={screenshot.alt}
      width={screenshot.width}
      height={screenshot.height}
      sizes={sizes}
      priority={priority}
    />
  );
}
