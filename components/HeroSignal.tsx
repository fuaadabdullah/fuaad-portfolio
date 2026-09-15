/** A decorative market trace connects the portfolio's finance and software themes. */
export default function HeroSignal() {
  return (
    <svg
      className="hero-signal"
      viewBox="0 0 560 460"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id="signal-grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path d="M 40 0 H 0 V 40" stroke="currentColor" strokeOpacity=".12" />
        </pattern>
        <linearGradient
          id="signal-fade"
          x1="0"
          y1="0"
          x2="560"
          y2="460"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-accent)" stopOpacity=".7" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity=".05" />
        </linearGradient>
      </defs>
      <rect width="560" height="460" fill="url(#signal-grid)" />
      <circle
        cx="280"
        cy="230"
        r="185"
        stroke="currentColor"
        strokeOpacity=".12"
      />
      <circle
        cx="280"
        cy="230"
        r="140"
        stroke="currentColor"
        strokeOpacity=".08"
        strokeDasharray="3 9"
      />
      <path
        className="signal-trace"
        d="M0 355 L65 355 L110 300 L155 320 L235 195 L285 225 L365 100 L410 140 L470 60 L560 60"
        pathLength="1"
        stroke="url(#signal-fade)"
        strokeWidth="2"
      />
      <circle
        className="signal-node"
        cx="470"
        cy="60"
        r="5"
        fill="currentColor"
      />
      <circle
        className="signal-ring"
        cx="470"
        cy="60"
        r="13"
        stroke="currentColor"
      />
    </svg>
  );
}
