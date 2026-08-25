import Image from "next/image";
import { ObservabilitySection } from "@/data/projects";

export default function ProductionObservability({
  observability,
}: {
  observability: ObservabilitySection;
}) {
  return (
    <div>
      <p className="mb-6 leading-relaxed text-white/80">{observability.intro}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {observability.shots.map((shot) => (
          <figure
            key={shot.src}
            data-testid="observability-shot"
            className="overflow-hidden rounded-xl border border-white/10 bg-black/20"
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes="(min-width: 768px) 27rem, calc(100vw - 3rem)"
              className="h-auto w-full"
            />
            <figcaption className="p-3 text-xs leading-relaxed text-white/70">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
