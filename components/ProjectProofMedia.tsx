import clsx from "clsx";
import Image from "next/image";
import type { ProofMediaItem } from "@/data/projects";

interface ProjectProofMediaProps {
  media?: ProofMediaItem[];
  mode?: "card" | "detail";
  className?: string;
}

function selectHeroMedia(ready: ProofMediaItem[]): ProofMediaItem | undefined {
  return (
    ready.find((item) => item.type === "gif") ??
    ready[0]
  );
}

function renderTile(
  item: ProofMediaItem,
  index: number,
  className?: string,
  showCaption?: boolean,
  sizes?: string,
  priority?: boolean
) {
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
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : undefined}
        unoptimized={item.type === "gif" ? true : undefined}
        className="h-full w-full object-cover"
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
  const readyItems = (media ?? []).filter((item) => item.status === "ready");
  const hasPending = (media ?? []).some((item) => item.status === "pending");

  const hero = selectHeroMedia(readyItems);
  const readyRemaining = readyItems.filter((item) => item !== hero);

  if (mode === "detail") {
    if (readyItems.length === 0) {
      return (
        <div
          data-testid="project-proof-detail"
          className={clsx(
            "flex min-h-[160px] flex-col justify-center rounded-xl border border-dashed border-white/20 bg-white/[0.02] p-6 text-center",
            className
          )}
        >
          <p
            data-testid="project-proof-pending"
            className="text-xs font-medium uppercase tracking-[0.08em] text-amber-300"
          >
            Demo capture pending
          </p>
          <p className="mt-2 text-sm text-white/50">
            Screenshots and walkthrough recordings will be added here soon.
          </p>
        </div>
      );
    }

    const ordered = hero ? [hero, ...readyRemaining] : readyItems;

    return (
      <div className={className} data-testid="project-proof-detail">
        <div className={clsx("grid gap-4", ordered.length > 1 ? "md:grid-cols-2" : "")}>
          {ordered.map((item, index) =>
            renderTile(
              item,
              index,
              clsx(index === 0 && ordered.length > 1 && "md:col-span-2", "aspect-video"),
              true,
              index === 0
                ? "(min-width: 768px) 56rem, calc(100vw - 3rem)"
                : "(min-width: 768px) 27rem, calc(100vw - 3rem)",
              index === 0
            )
          )}
        </div>
        {hasPending && (
          <p className="mt-3 text-xs text-amber-300/70">
            Demo recording in progress — full walkthrough coming soon.
          </p>
        )}
      </div>
    );
  }

  // Card mode
  if (!hero) {
    return (
      <section className={clsx("space-y-3", className)} data-testid="project-proof-card">
        <article
          data-testid="project-proof-pending"
          className="flex aspect-video flex-col justify-center rounded-xl border border-dashed border-white/20 bg-white/[0.02] p-4"
        >
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-amber-300">
            Demo capture pending
          </p>
          <p className="mt-2 text-sm text-white/70">
            Screenshots and walkthrough recordings will be added here soon.
          </p>
        </article>
      </section>
    );
  }

  const thumbs = readyRemaining.slice(0, 2);

  return (
    <section className={clsx("space-y-3", className)} data-testid="project-proof-card">
      {renderTile(
        hero,
        0,
        "aspect-video",
        false,
        "(min-width: 768px) 28rem, calc(100vw - 3rem)",
        true
      )}
      {thumbs.length > 0 && (
        <div className={clsx("grid gap-3", thumbs.length === 2 ? "grid-cols-2" : "grid-cols-1")}>
          {thumbs.map((item, index) =>
            renderTile(
              item,
              index + 1,
              "aspect-video",
              false,
              "(min-width: 768px) 13rem, calc((100vw - 4rem) / 2)"
            )
          )}
        </div>
      )}
    </section>
  );
}
