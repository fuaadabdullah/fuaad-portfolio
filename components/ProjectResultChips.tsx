import clsx from "clsx";
import { ResultMetric } from "@/data/projects";

interface ProjectResultChipsProps {
  results: ResultMetric[];
  className?: string;
}

export default function ProjectResultChips({
  results,
  className,
}: ProjectResultChipsProps) {
  return (
    <div
      className={clsx("grid gap-2 sm:grid-cols-3", className)}
      aria-label="Project outcomes"
    >
      {results.map((result, index) => (
        <article
          key={`${result.label}-${index}`}
          data-testid="project-result-chip"
          className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
        >
          <p className="text-base font-semibold text-green-400">{result.value}</p>
          <p className="mt-1 text-xs text-white/80">{result.label}</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.08em] text-white/50">
            {result.sourceLabel}
            {result.timeframe ? ` · ${result.timeframe}` : ""}
            {result.proof ? (
              <>
                {" · "}
                <a
                  href={result.proof.href}
                  target={result.proof.href.startsWith("/") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="underline decoration-white/30 underline-offset-2 hover:text-white"
                >
                  {result.proof.label}
                </a>
              </>
            ) : null}
          </p>
        </article>
      ))}
    </div>
  );
}
