import Image from "next/image";
import type { Project } from "@/data/projects";

export default function ProjectPreview({
  project,
  priority = false,
  sizes = "(min-width: 1152px) 540px, (min-width: 768px) 50vw, calc(100vw - 48px)",
  decorative = false,
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
  /**
   * When true the rendered image is treated as decorative (alt="") — use this
   * when the preview is wrapped by a link that already provides an accessible
   * name, so screen readers don't announce the image alt and the link label
   * twice.
   */
  decorative?: boolean;
}) {
  const screenshot =
    project.image ??
    project.proofMedia?.find(
      (media) => media.type === "image" && media.status === "ready",
    ) ??
    project.gallery?.[0];
  if (!screenshot) {
    return (
      <div
        className="flex aspect-[16/10] items-center justify-center p-8 text-sm text-[var(--color-muted)]"
        role="img"
        aria-label="Project preview coming soon"
      >
        Preview coming soon
      </div>
    );
  }
  return (
    <Image
      src={screenshot.src}
      alt={decorative ? "" : screenshot.alt}
      width={screenshot.width}
      height={screenshot.height}
      sizes={sizes}
      priority={priority}
    />
  );
}
