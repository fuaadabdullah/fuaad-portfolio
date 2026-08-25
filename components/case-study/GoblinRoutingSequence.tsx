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
    { cx: 765, label: "Provider A", sub: "primary" },
    { cx: 905, label: "Provider B", sub: "standby", boxW: 110 },
  ];

  return (
    <figure
      data-testid="goblin-routing-sequence"
      className="overflow-hidden rounded-xl border border-white/10 bg-black/20 p-2 md:p-4"
    >
      <svg
        viewBox="0 0 960 800"
        role="img"
        aria-labelledby="goblin-seq-title goblin-seq-desc"
        className="h-auto w-full"
      >
        <title id="goblin-seq-title">GoblinOS Assistant provider-routing sequence with failover</title>
        <desc id="goblin-seq-desc">
          A chat turn flows from the user through the Chat UI and Vercel proxy to the FastAPI router.
          The router reads strategy and health snapshots from Redis, calls the primary provider,
          receives a 429 rate limit, opens the circuit, retries on the standby provider, persists
          usage and telemetry to Redis, and returns a normalized response with telemetry that
          updates the status panels.
        </desc>
        <defs>
          <marker
            id="goblin-seq-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.5)" />
          </marker>
          <marker
            id="goblin-seq-arrow-teal"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
          </marker>
          <marker
            id="goblin-seq-arrow-red"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f87171" />
          </marker>
        </defs>

        {/* Lifeline headers */}
        {lifelines.map(({ cx, label, sub, boxW = 120 }) => (
          <g key={label}>
            <rect
              x={cx - (boxW ?? 120) / 2}
              y={20}
              width={boxW ?? 120}
              height={46}
              rx={8}
              fill={headerFill}
              stroke={headerStroke}
            />
            <text x={cx} y={39} textAnchor="middle" fontSize="12" fontWeight="600" fill={titleFill}>
              {label}
            </text>
            {sub && (
              <text x={cx} y={55} textAnchor="middle" fontSize="10" fill={subFill}>
                {sub}
              </text>
            )}
            <line x1={cx} y1={66} x2={cx} y2={730} stroke={lifelineStroke} strokeWidth="1" />
          </g>
        ))}

        {/* 1 · user sends message */}
        <text x={120} y={102} textAnchor="middle" fontSize="11" fill={requestText}>1 · send message</text>
        <line x1={55} y1={110} x2={181} y2={110} stroke={requestStroke} strokeWidth="1.5" markerEnd="url(#goblin-seq-arrow)" />

        {/* 2 · POST to proxy */}
        <text x={257} y={147} textAnchor="middle" fontSize="11" fill={requestText}>2 · POST /api/chat</text>
        <line x1={185} y1={155} x2={326} y2={155} stroke={requestStroke} strokeWidth="1.5" markerEnd="url(#goblin-seq-arrow)" />

        {/* 3 · forward with internal key */}
        <text x={405} y={192} textAnchor="middle" fontSize="11" fill={requestText}>3 · forward + internal key</text>
        <line x1={330} y1={200} x2={476} y2={200} stroke={requestStroke} strokeWidth="1.5" markerEnd="url(#goblin-seq-arrow)" />

        {/* 4 · read strategy + health */}
        <text x={552} y={237} textAnchor="middle" fontSize="11" fill={requestText}>4 · read strategy + health</text>
        <line x1={480} y1={245} x2={621} y2={245} stroke={requestStroke} strokeWidth="1.5" markerEnd="url(#goblin-seq-arrow)" />

        {/* 5 · snapshots return */}
        <text x={552} y={277} textAnchor="middle" fontSize="11" fill="#34d399">snapshots + scores</text>
        <line x1={625} y1={285} x2={484} y2={285} stroke="#34d399" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#goblin-seq-arrow-teal)" />

        {/* 6 · inference to Provider A */}
        <text x={622} y={322} textAnchor="middle" fontSize="11" fill={requestText}>5 · inference request</text>
        <line x1={480} y1={330} x2={761} y2={330} stroke={requestStroke} strokeWidth="1.5" markerEnd="url(#goblin-seq-arrow)" />

        {/* 7 · 429 from Provider A */}
        <text x={622} y={367} textAnchor="middle" fontSize="11" fill="#f87171">6 · 429 rate limit</text>
        <line x1={765} y1={375} x2={484} y2={375} stroke="#f87171" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#goblin-seq-arrow-red)" />

        {/* 8 · circuit note */}
        <rect x={492} y={398} width={216} height={40} rx={8} fill="rgba(251,191,36,0.08)" stroke="#fbbf24" strokeOpacity="0.6" />
        <text x={600} y={415} textAnchor="middle" fontSize="11" fill="#fbbf24">7 · circuit opens on A,</text>
        <text x={600} y={430} textAnchor="middle" fontSize="11" fill="#fbbf24">health score shifts to B</text>

        {/* 9 · retry on Provider B */}
        <text x={692} y={462} textAnchor="middle" fontSize="11" fill={requestText}>8 · retry on standby</text>
        <line x1={480} y1={470} x2={901} y2={470} stroke={requestStroke} strokeWidth="1.5" markerEnd="url(#goblin-seq-arrow)" />

        {/* 10 · response from B */}
        <text x={692} y={507} textAnchor="middle" fontSize="11" fill="#34d399">9 · 200 · response + usage</text>
        <line x1={905} y1={515} x2={484} y2={515} stroke="#34d399" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#goblin-seq-arrow-teal)" />

        {/* 11 · persist telemetry */}
        <text x={552} y={552} textAnchor="middle" fontSize="11" fill={requestText}>10 · persist usage + telemetry</text>
        <line x1={480} y1={560} x2={621} y2={560} stroke={requestStroke} strokeWidth="1.5" markerEnd="url(#goblin-seq-arrow)" />

        {/* 12 · normalized response */}
        <text x={405} y={597} textAnchor="middle" fontSize="11" fill="#34d399">11 · normalized response + telemetry</text>
        <line x1={480} y1={605} x2={334} y2={605} stroke="#34d399" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#goblin-seq-arrow-teal)" />

        {/* 13 · render reply */}
        <text x={257} y={642} textAnchor="middle" fontSize="11" fill="#34d399">12 · render reply</text>
        <line x1={330} y1={650} x2={189} y2={650} stroke="#34d399" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#goblin-seq-arrow-teal)" />

        {/* status panel note */}
        <rect x={96} y={672} width={214} height={40} rx={8} fill="rgba(52,211,153,0.08)" stroke="#34d399" strokeOpacity="0.5" />
        <text x={203} y={689} textAnchor="middle" fontSize="11" fill="#34d399">status panel: A amber,</text>
        <text x={203} y={704} textAnchor="middle" fontSize="11" fill="#34d399">B serving — visible in-product</text>

        {/* Legend */}
        <line x1={60} y1={765} x2={100} y2={765} stroke={requestStroke} strokeWidth="1.5" markerEnd="url(#goblin-seq-arrow)" />
        <text x={108} y={769} fontSize="11" fill={subFill}>request</text>
        <line x1={190} y1={765} x2={230} y2={765} stroke="#34d399" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#goblin-seq-arrow-teal)" />
        <text x={238} y={769} fontSize="11" fill={subFill}>response / signal</text>
        <line x1={370} y1={765} x2={410} y2={765} stroke="#f87171" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#goblin-seq-arrow-red)" />
        <text x={418} y={769} fontSize="11" fill={subFill}>failure</text>
        <rect x={530} y={753} width={10} height={10} rx={2} fill="rgba(251,191,36,0.08)" stroke="#fbbf24" strokeOpacity="0.6" />
        <text x={548} y={769} fontSize="11" fill={subFill}>router decision</text>
      </svg>
    </figure>
  );
}
