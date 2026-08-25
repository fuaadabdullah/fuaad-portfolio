import { IncidentPostmortem } from "@/data/projects";

export default function IncidentPostmortemCard({
  postmortem,
}: {
  postmortem: IncidentPostmortem;
}) {
  return (
    <article
      data-testid="incident-postmortem"
      className="rounded-2xl border border-amber-400/25 bg-amber-500/[0.04] p-6"
    >
      <h3 className="text-xl font-semibold text-white">{postmortem.title}</h3>
      <p className="mt-4 leading-relaxed text-white/80">{postmortem.summary}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-amber-300">Symptom</p>
          <p className="mt-2 text-sm leading-relaxed text-white/80">{postmortem.symptom}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-amber-300">Detection</p>
          <p className="mt-2 text-sm leading-relaxed text-white/80">{postmortem.detection}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-red-400/20 bg-red-500/[0.04] p-4">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-red-300">Root cause</p>
          <ul className="mt-2 space-y-2">
            {postmortem.rootCause.map((cause, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed text-white/80">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                {cause}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/[0.04] p-4">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-300">Fix</p>
          <ul className="mt-2 space-y-2">
            {postmortem.fix.map((fix, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed text-white/80">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                {fix}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs font-medium uppercase tracking-[0.08em] text-white/50">Aftermath</p>
        <p className="mt-2 text-sm leading-relaxed text-white/80">{postmortem.aftermath}</p>
      </div>
    </article>
  );
}
