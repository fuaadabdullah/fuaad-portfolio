export default function GoblinArchitectureDiagram() {
  const boxFill = "rgba(255,255,255,0.04)";
  const boxStroke = "rgba(255,255,255,0.16)";
  const chipFill = "rgba(52,211,153,0.08)";
  const chipStroke = "#34d399";
  const titleFill = "#e5e7eb";
  const subFill = "rgba(255,255,255,0.55)";
  const arrowStroke = "rgba(255,255,255,0.45)";

  return (
    <figure
      data-testid="goblin-architecture-diagram"
      className="overflow-hidden rounded-xl border border-white/10 bg-black/20 p-2 md:p-4"
    >
      <svg
        viewBox="0 0 960 720"
        role="img"
        aria-labelledby="goblin-arch-title goblin-arch-desc"
        className="h-auto w-full"
      >
        <title id="goblin-arch-title">GoblinOS Assistant deployment topology</title>
        <desc id="goblin-arch-desc">
          Browser traffic enters the Next.js app on Vercel whose route-handler proxy forwards
          requests to the FastAPI gateway running as a container on Fly.io. The
          gateway reads routing strategy and provider health from Redis, persists durable records to
          PostgreSQL, and calls the LLM provider pool. Telemetry flows back to the UI status panels.
        </desc>
        <defs>
          <marker
            id="goblin-arch-arrow"
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
            id="goblin-arch-arrow-teal"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
          </marker>
        </defs>

        {/* Browser */}
        <rect x="390" y="24" width="180" height="54" rx="10" fill={boxFill} stroke={boxStroke} />
        <text x="480" y="48" textAnchor="middle" fontSize="14" fontWeight="600" fill={titleFill}>
          Browser
        </text>
        <text x="480" y="66" textAnchor="middle" fontSize="11" fill={subFill}>
          chat session
        </text>

        <line x1="480" y1="78" x2="480" y2="210" stroke={arrowStroke} strokeWidth="1.5" markerEnd="url(#goblin-arch-arrow)" />

        {/* Vercel / Next.js */}
        <rect x="250" y="212" width="460" height="104" rx="12" fill={boxFill} stroke={boxStroke} />
        <text x="480" y="238" textAnchor="middle" fontSize="14" fontWeight="600" fill={titleFill}>
          Vercel — Next.js · TypeScript
        </text>
        <rect x="270" y="252" width="200" height="48" rx="8" fill={chipFill} stroke={chipStroke} strokeOpacity="0.5" />
        <text x="370" y="272" textAnchor="middle" fontSize="12" fontWeight="600" fill={titleFill}>
          Chat UI
        </text>
        <text x="370" y="288" textAnchor="middle" fontSize="10" fill={subFill}>
          status panels
        </text>
        <rect x="490" y="252" width="200" height="48" rx="8" fill={chipFill} stroke={chipStroke} strokeOpacity="0.5" />
        <text x="590" y="272" textAnchor="middle" fontSize="12" fontWeight="600" fill={titleFill}>
          Route-handler proxy
        </text>
        <text x="590" y="288" textAnchor="middle" fontSize="10" fill={subFill}>
          typed contract
        </text>

        <line x1="480" y1="316" x2="480" y2="370" stroke={arrowStroke} strokeWidth="1.5" markerEnd="url(#goblin-arch-arrow)" />

        {/* FastAPI gateway */}
        <rect x="250" y="372" width="460" height="116" rx="12" fill={boxFill} stroke={boxStroke} />
        <text x="480" y="398" textAnchor="middle" fontSize="14" fontWeight="600" fill={titleFill}>
          Fly.io — FastAPI gateway
        </text>
        <rect x="270" y="412" width="200" height="56" rx="8" fill={chipFill} stroke={chipStroke} strokeOpacity="0.5" />
        <text x="370" y="434" textAnchor="middle" fontSize="12" fontWeight="600" fill={titleFill}>
          Routing engine
        </text>
        <text x="370" y="450" textAnchor="middle" fontSize="10" fill={subFill}>
          strategy + health scoring
        </text>
        <rect x="490" y="412" width="200" height="56" rx="8" fill={chipFill} stroke={chipStroke} strokeOpacity="0.5" />
        <text x="590" y="434" textAnchor="middle" fontSize="12" fontWeight="600" fill={titleFill}>
          Provider adapters
        </text>
        <text x="590" y="450" textAnchor="middle" fontSize="10" fill={subFill}>
          normalized contracts
        </text>

        {/* Postgres + Redis */}
        <rect x="36" y="386" width="170" height="52" rx="10" fill={boxFill} stroke={boxStroke} />
        <text x="121" y="408" textAnchor="middle" fontSize="13" fontWeight="600" fill={titleFill}>
          PostgreSQL
        </text>
        <text x="121" y="424" textAnchor="middle" fontSize="10" fill={subFill}>
          durable records
        </text>
        <rect x="36" y="452" width="170" height="52" rx="10" fill={boxFill} stroke={boxStroke} />
        <text x="121" y="474" textAnchor="middle" fontSize="13" fontWeight="600" fill={titleFill}>
          Redis
        </text>
        <text x="121" y="490" textAnchor="middle" fontSize="10" fill={subFill}>
          cache · health state
        </text>
        <line x1="250" y1="412" x2="210" y2="412" stroke={arrowStroke} strokeWidth="1.5" markerEnd="url(#goblin-arch-arrow)" />
        <line x1="250" y1="478" x2="210" y2="478" stroke={arrowStroke} strokeWidth="1.5" markerEnd="url(#goblin-arch-arrow)" />

        {/* Provider pool */}
        <text x="480" y="548" textAnchor="middle" fontSize="11" fill={subFill} letterSpacing="1.5">
          LLM PROVIDER POOL
        </text>
        <line x1="380" y1="488" x2="182" y2="566" stroke={arrowStroke} strokeWidth="1.5" markerEnd="url(#goblin-arch-arrow)" />
        <line x1="480" y1="488" x2="480" y2="566" stroke={arrowStroke} strokeWidth="1.5" markerEnd="url(#goblin-arch-arrow)" />
        <line x1="580" y1="488" x2="778" y2="566" stroke={arrowStroke} strokeWidth="1.5" markerEnd="url(#goblin-arch-arrow)" />

        <rect x="70" y="568" width="220" height="64" rx="10" fill={boxFill} stroke={boxStroke} />
        <text x="180" y="594" textAnchor="middle" fontSize="13" fontWeight="600" fill={titleFill}>
          OpenAI
        </text>
        <text x="180" y="612" textAnchor="middle" fontSize="10" fill={subFill}>
          primary inference
        </text>
        <rect x="370" y="568" width="220" height="64" rx="10" fill={boxFill} stroke={boxStroke} />
        <text x="480" y="594" textAnchor="middle" fontSize="13" fontWeight="600" fill={titleFill}>
          Anthropic
        </text>
        <text x="480" y="612" textAnchor="middle" fontSize="10" fill={subFill}>
          standby + specialized tasks
        </text>
        <rect x="670" y="568" width="220" height="64" rx="10" fill={boxFill} stroke={boxStroke} />
        <text x="780" y="594" textAnchor="middle" fontSize="13" fontWeight="600" fill={titleFill}>
          Local · Ollama
        </text>
        <text x="780" y="612" textAnchor="middle" fontSize="10" fill={subFill}>
          privacy-sensitive prompts
        </text>

        {/* Telemetry loop */}
        <path
          d="M 710 430 L 906 430 L 906 264 L 714 264"
          fill="none"
          stroke="#34d399"
          strokeWidth="1.5"
          strokeDasharray="6 5"
          markerEnd="url(#goblin-arch-arrow-teal)"
        />
        <text
          x="924"
          y="347"
          textAnchor="middle"
          fontSize="11"
          fill="#34d399"
          transform="rotate(-90 924 347)"
        >
          telemetry · health signals → status panels
        </text>

        {/* Footnote */}
        <text x="480" y="692" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.45)">
          Docker keeps every layer reproducible across environments.
        </text>
      </svg>
    </figure>
  );
}
