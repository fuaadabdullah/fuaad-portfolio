import { AtScaleSection } from "@/data/projects";

export default function AtScalePlan({ atScale }: { atScale: AtScaleSection }) {
  return (
    <div data-testid="at-scale-plan">
      <p className="mb-6 leading-relaxed text-white/80">{atScale.intro}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {atScale.items.map((item, idx) => (
          <article
            key={idx}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            data-testid="at-scale-item"
          >
            <p className="flex items-start gap-3 text-sm font-medium text-white">
              <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-xs font-semibold text-emerald-300">
                {idx + 1}
              </span>
              {item.change}
            </p>
            <p className="mt-2 pl-9 text-sm leading-relaxed text-white/70">{item.why}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
