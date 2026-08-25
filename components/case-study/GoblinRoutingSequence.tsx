export default function GoblinRoutingSequence() {
  const lifelineStroke = "rgba(255,255,255,0.14)";
  const headerFill = "rgba(255,255,255,0.04)";
  const headerStroke = "rgba(255,255,255,0.16)";
  const titleFill = "#e5e7eb";
  const subFill = "rgba(255,255,255,0.55)";
  const requestStroke = "rgba(255,255,255,0.45)";
  const requestText = "rgba(255,255,255,0.75)";

  const lifelines: { cx: number; label: string; sub?: string; boxW?: number }[] = [
    { cx: 55, label: "User" },
    { cx: 185, label: "Chat UI", sub: "Next.js" },
    { cx: 330, label: "Proxy", sub: "Vercel handler" },
    { cx: 480, label: "Router", sub: "FastAPI" },
    { cx: 625, label: "Redis", sub: "health + usage" },
    { cx: 785, label: "Provider pool", sub: "LLM backend", boxW: 130 },
  ];

  return (
    <figure
      data-testid="goblin-routing-sequence"
      className="rounded-xl border border-white/10 bg-black/20 p-2 md:p-4"
    >
      <div className="overflow-x-auto">
      <svg
        viewBox="0 0 960 820"
        role="img"
        aria-labelledby="goblin-seq-title goblin-seq-desc"
        className="h-auto min-w-[720px] w-full"
      >
        <title id="goblin-seq-title">GoblinOS Assistant provider-selection sequence</title>
        <desc id="goblin-seq-desc">
          A chat turn flows from the user through the Chat UI and Vercel proxy to the FastAPI router.
          The router reads routing strategy and provider-health snapshots from Redis, runs the
          provider-scoring pipeline, calls the selected provider, persists usage/telemetry to Redis,
          and returns a normalized response that updates the status panels. The retry-on-429 branch
          is labeled design behavior: it is not asserted from committed code.
        </desc>
        <defs>
          <marker id="goblin-seq-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.5)" />
          </marker>
          <marker id="goblin-seq-arrow-teal" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
          </marker>
          <marker id="goblin-seq-arrow-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f87171" />
          </marker>
        </defs>

        {/* Lifeline headers */}
        {lifelines.map(({ cx, label, sub, boxW = 120 }) => (
          <g key={label}>
            <rect x={cx - (boxW ?? 120) / 2} y={20} width={boxW ?? 120} height={46} rx={8} fill={headerFill} stroke={headerStroke} />
            <text x={cx} y={39} textAnchor="middle" fontSize="12" fontWeight="600" fill={titleFill}>{label}</text>
            {sub && <text x={cx} y={55} textAnchor="middle" fontSize="10" fill={subFill}>{sub}</text>}
            <line x1={cx} y1={66} x2={cx} y2={742} stroke={lifelineStroke} strokeWidth="1" />
          </g>
        ))}

        {/* 1 · user sends message */}
        <text x={120} y={102} textAnchor="middle" fontSize="11" fill={requestText}>1 · send message</text>
        <line x1={55} y1={110} x2={181} y2={110} stroke={requestStroke} strokeWidth="1.5" markerEnd="url(#goblin-seq-arrow)" />

        {/* 2 · POST to proxy */}
        <text x={257} y={147} textAnchor="middle" fontSize="11" fill={requestText}>2 · POST /api/chat</text>
        <line x1={185} y1={155} x2={326} y2={155} stroke={requestStroke} strokeWidth="1.5" markerEnd="url(#goblin-seq-arrow)" />

        {/* 3 · proxy forwards to router */}
        <text x={405} y={192} textAnchor="middle" fontSize="11" fill={requestText}>3 · forward typed contract</text>
        <line x1={330} y1={200} x2={476} y2={200} stroke={requestStroke} strokeWidth="1.5" markerEnd="url(#goblin-seq-arrow)" />

        {/* 4 · router reads strategy from Redis */}
        <text x={552} y={237} textAnchor="middle" fontSize="11" fill={requestText}>4 · read strategy + health</text>
        <line x1={480} y1={245} x2={621} y2={245} stroke={requestStroke} strokeWidth="1.5" markerEnd="url(#goblin-seq-arrow)" />

        {/* snapshots + scores return */}
        <text x={552} y={282} textAnchor="middle" fontSize="11" fill="#34d399">snapshots + scores</text>
        <line x1={625} y1={290} x2={484} y2={290} stroke="#34d399" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#goblin-seq-arrow-teal)" />

        {/* 5 · scoring pipeline */}
        <rect x={652} y={316} width={264} height={44} rx={8} fill="rgba(251,191,36,0.08)" stroke="#fbbf24" strokeOpacity="0.6" />
        <text x={784} y={335} textAnchor="middle" fontSize="11" fill="#fbbf24">5 · score providers</text>
        <text x={784} y={351} textAnchor="middle" fontSize="10" fill={subFill}>Latency · Cost · Hybrid · tier</text>

        {/* 6 · inference request to selected provider */}
        <text x={630} y={402} textAnchor="middle" fontSize="11" fill={requestText}>6 · inference request</text>
        <line x1={480} y1={410} x2={781} y2={410} stroke={requestStroke} strokeWidth="1.5" markerEnd="url(#goblin-seq-arrow)" />

        {/* 7 · provider response */}
        <text x={630} y={457} textAnchor="middle" fontSize="11" fill="#34d399">7 · response + usage</text>
        <line x1={785} y1={465} x2={484} y2={465} stroke="#34d399" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#goblin-seq-arrow-teal)" />

        {/* 8 · persist telemetry */}
        <text x={552} y={510} textAnchor="middle" fontSize="11" fill={requestText}>8 · persist usage + telemetry</text>
        <line x1={480} y1={518} x2={621} y2={518} stroke={requestStroke} strokeWidth="1.5" markerEnd="url(#goblin-seq-arrow)" />

        {/* 9 · normalized response */}
        <text x={405} y={563} textAnchor="middle" fontSize="11" fill="#34d399">9 · normalized response + telemetry</text>
        <line x1={480} y1={571} x2={334} y2={571} stroke="#34d399" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#goblin-seq-arrow-teal)" />

        {/* 10 · render reply */}
        <text x={257} y={616} textAnchor="middle" fontSize="11" fill="#34d399">10 · render reply</text>
        <line x1={330} y1={624} x2={189} y2={624} stroke="#34d399" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#goblin-seq-arrow-teal)" />

        {/* Design-behavior annotation */}
        <rect x={200} y={662} width={612} height={62} rx={10} fill="rgba(248,113,113,0.08)" stroke="#f87171" strokeOpacity="0.6" strokeDasharray="5 4" />
        <text x={506} y={682} textAnchor="middle" fontSize="11" fontWeight="600" fill="#f87171">Design behavior (not asserted from committed code)</text>
        <text x={506} y={699} textAnchor="middle" fontSize="10" fill={subFill}>On a provider 429, a retry-and-fallback branch could shift score to another provider.</text>
        <text x={506} y={714} textAnchor="middle" fontSize="10" fill={subFill}>This is intended routing policy, not a demonstrated production incident.</text>

        {/* status panel note */}
        <rect x={96} y={742} width={220} height={38} rx={8} fill="rgba(52,211,153,0.08)" stroke="#34d399" strokeOpacity="0.5" />
        <text x={206} y={758} textAnchor="middle" fontSize="11" fill="#34d399">status panels reflect</text>
        <text x={206} y={773} textAnchor="middle" fontSize="11" fill="#34d399">health · latency · usage</text>

        {/* Legend */}
        <line x1={40} y1={806} x2={80} y2={806} stroke={requestStroke} strokeWidth="1.5" markerEnd="url(#goblin-seq-arrow)" />
        <text x={88} y={810} fontSize="11" fill={subFill}>request</text>
        <line x1={170} y1={806} x2={210} y2={806} stroke="#34d399" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#goblin-seq-arrow-teal)" />
        <text x={218} y={810} fontSize="11" fill={subFill}>response / signal</text>
        <rect x={330} y={794} width={10} height={10} rx={2} fill="rgba(251,191,36,0.08)" stroke="#fbbf24" strokeOpacity="0.6" />
        <text x={348} y={810} fontSize="11" fill={subFill}>router decision</text>
        <rect x={470} y={794} width={10} height={10} rx={2} fill="rgba(248,113,113,0.08)" stroke="#f87171" strokeOpacity="0.6" strokeDasharray="3 2" />
        <text x={488} y={810} fontSize="11" fill={subFill}>design annotation</text>
      </svg>
      </div>

      <p className="mb-2 mt-2 pl-2 text-[11px] text-white/50 md:hidden">← Swipe to explore the sequence →</p>

      <figcaption className="mt-3 border-t border-white/10 pt-3 text-sm text-white/70">
        <p className="font-medium text-white/85">How a chat turn is routed</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm leading-relaxed">
          <li>The chat UI sends a typed contract that the proxy forwards to the FastAPI router.</li>
          <li>The router applies the committed scoring pipeline (latency, cost, hybrid, and tier policies) to select a provider.</li>
          <li>Provider health and usage state come from Redis; durable records live in PostgreSQL.</li>
          <li>The normalized response returns to the UI, where the status panels surface health, latency, and usage.</li>
          <li>The retry-on-429 branch is labeled design behavior above; only the steps above it are asserted from committed code.</li>
        </ul>
      </figcaption>
    </figure>
  );
}
