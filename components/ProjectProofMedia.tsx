"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { ProofMediaItem } from "@/data/projects";

interface ProjectProofMediaProps {
  media?: ProofMediaItem[];
  mode?: "card" | "detail";
  className?: string;
}

function selectHeroMedia(media: ProofMediaItem[]): ProofMediaItem | undefined {
  return (
    media.find((item) => item.type === "gif" && item.status === "ready") ??
    media.find((item) => item.status === "ready") ??
    media[0]
  );
}

function renderMediaTile(
  item: ProofMediaItem,
  index: number,
  className?: string,
  showCaption?: boolean,
  onLoadError?: (src: string) => void
) {
  if (item.status !== "ready") {
    return (
      <article
        key={`pending-${index}`}
        data-testid="project-proof-pending"
        className={clsx(
          "flex h-full min-h-[120px] flex-col justify-center rounded-xl border border-dashed border-white/20 bg-white/[0.02] p-4",
          className
        )}
      >
        <p className="text-xs font-medium uppercase tracking-[0.08em] text-amber-300">
          Demo capture pending
        </p>
        <p className="mt-2 text-sm text-white/70">{item.alt}</p>
      </article>
    );
  }

  return (
    <figure
      key={`${item.src}-${index}`}
      data-testid="project-proof-tile"
      className={clsx("overflow-hidden rounded-xl border border-white/10 bg-black/20", className)}
    >
      <Image
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        unoptimized={item.type === "gif"}
        className="h-full w-full object-cover"
        onError={() => onLoadError?.(item.src)}
      />
      {showCaption && <figcaption className="p-2 text-xs text-white/70">{item.alt}</figcaption>}
    </figure>
  );
}

export default function ProjectProofMedia({
  media,
  mode = "card",
  className,
}: ProjectProofMediaProps) {
  const [failedSources, setFailedSources] = useState<string[]>([]);
  const mediaItems: ProofMediaItem[] =
    media && media.length > 0
      ? media
      : [
          {
            type: "image",
            src: "pending",
            width: 1280,
            height: 720,
            alt: "Demo media for this project will be added soon.",
            status: "pending",
          },
        ];

  const resolvedMedia: ProofMediaItem[] = mediaItems.map((item): ProofMediaItem =>
    item.status === "ready" && failedSources.includes(item.src)
      ? { ...item, status: "pending" }
      : item
  );

  function handleLoadError(src: string) {
    setFailedSources((current) => (current.includes(src) ? current : [...current, src]));
  }

  const hero = selectHeroMedia(resolvedMedia);
  const remaining = resolvedMedia.filter((item) => item !== hero);

  if (mode === "detail") {
    const ordered = hero ? [hero, ...remaining] : resolvedMedia;

    return (
      <div className={clsx("grid gap-4 md:grid-cols-2", className)} data-testid="project-proof-detail">
        {ordered.map((item, index) =>
          renderMediaTile(
            item,
            index,
            clsx(index === 0 && "md:col-span-2", "aspect-video"),
            true,
            handleLoadError
          )
        )}
      </div>
    );
  }

  const thumbSeed = [
    ...remaining,
    {
      type: "image" as const,
      src: "pending-thumb-1",
      width: 640,
      height: 360,
      alt: "Additional demo media pending.",
      status: "pending" as const,
    },
    {
      type: "image" as const,
      src: "pending-thumb-2",
      width: 640,
      height: 360,
      alt: "Additional demo media pending.",
      status: "pending" as const,
    },
  ];
  const thumbs = thumbSeed.slice(0, 2);

  return (
    <section className={clsx("space-y-3", className)} data-testid="project-proof-card">
      {hero && renderMediaTile(hero, 0, "aspect-video", false, handleLoadError)}
      <div className="grid grid-cols-2 gap-3">
        {thumbs.map((item, index) =>
          renderMediaTile(item, index + 1, "aspect-video", false, handleLoadError)
        )}
      </div>
    </section>
  );
}
