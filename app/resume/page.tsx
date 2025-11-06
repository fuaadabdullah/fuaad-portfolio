import Script from "next/script";
import Link from "next/link";
import LinkedInBadge from "@/components/LinkedInBadge";

export const metadata = {
  title: "Resume – Fuaad Abdullah",
  description:
    "Resume and profile for Fuaad Abdullah – finance major, freelance developer, and day trader building fintech tools, trading dashboards, and portfolio sites.",
  openGraph: {
    title: "Resume – Fuaad Abdullah",
    description:
      "Profile for recruiters, clients, and schools: finance major at GSU with hands-on experience building risk tools, dashboards, and web apps.",
    images: ["/og-default.png"],
  },
};

export default function ResumePage() {
  return (
    <>
      {/* LinkedIn badge script – only loaded on this page */}
      <Script
        src="https://platform.linkedin.com/badges/js/profile.js"
        strategy="lazyOnload"
        async
        defer
      />

      <main className="mx-auto max-w-5xl px-4 py-12 space-y-10">
        {/* Header + CTAs */}
        <section className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Resume & Profile
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold">
              Fuaad Abdullah
            </h1>
            <p className="text-sm text-zinc-300">
              Finance major at Georgia State University · freelance developer ·
              day trader. I build practical{" "}
              <span className="text-zinc-100">
                fintech tools, trading dashboards, and portfolio sites
              </span>{" "}
              with a focus on discipline, data, and clean execution.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href="/Fuaad_Abdullah_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-accent)] px-5 py-2 font-medium text-black hover:bg-[color:var(--color-accent)]/90"
            >
              Download PDF
            </a>
            <Link
              href="https://www.linkedin.com/in/fuaadabdullah"
              target="_blank"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-2 font-medium text-sm text-zinc-100 hover:bg-white/5"
            >
              View LinkedIn
            </Link>
            <a
              href="mailto:fuaadabdullah@gmail.com"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-2 font-medium text-sm text-zinc-100 hover:bg-white/5"
            >
              Email
            </a>
          </div>
        </section>

        {/* Top-line summary + stats */}
        <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
          <div className="rounded-3xl bg-[color:var(--color-coal)] border border-white/5 p-5 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              For recruiters · clients · schools
            </p>
            <p className="text-sm font-medium text-zinc-100">Summary</p>
            <p className="text-sm text-zinc-300 leading-relaxed">
              I operate at the intersection of{" "}
              <span className="text-zinc-100">finance, trading, and software</span>.
              I use code to turn messy ideas into systems: risk tools that keep
              traders honest, dashboards that surface real metrics, and
              portfolio sites that look professional instead of improvised.
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed">
              This page is for{" "}
              <span className="text-zinc-100">
                recruiters, clients, and schools
              </span>
              : a clear view of what I&apos;ve built so far, what I&apos;m
              studying, and where I&apos;m trying to go next.
            </p>
          </div>

          <div className="grid gap-3 text-xs md:text-sm">
            <div className="rounded-2xl bg-[color:var(--color-coal)] border border-white/5 p-4 space-y-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Currently open to
              </p>
              <p className="text-zinc-300">
                • Internships in finance, fintech, or software engineering
                <br />
                • Freelance / contract projects (web, dashboards, tools)
                <br />
                • Transfer / advanced study opportunities in finance,
                data, or technology
              </p>
            </div>

            <div className="rounded-2xl bg-[color:var(--color-coal)] border border-white/5 p-4 space-y-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Where I add value
              </p>
              <p className="text-zinc-300">
                • Turning fuzzy requirements into concrete, scoped builds
                <br />
                • Bridging trading / finance concepts with real software
                <br />
                • Shipping small, reliable releases instead of half-finished ideas
              </p>
            </div>
          </div>
        </section>

        {/* Academic profile */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-100">
            Academic Profile
          </h2>

          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="rounded-2xl bg-[color:var(--color-coal)] border border-white/5 p-4 space-y-1">
              <p className="text-xs font-medium text-zinc-200 uppercase tracking-[0.16em]">
                Degree
              </p>
              <p className="text-zinc-100">
                B.B.A. Finance (in progress) · Georgia State University
              </p>
              <p className="text-zinc-300">
                Building a foundation in markets, risk, and financial
                decision-making, with a growing focus on fintech and
                quantitative tools applied through personal trading and software
                projects.
              </p>
            </div>

            <div className="rounded-2xl bg-[color:var(--color-coal)] border border-white/5 p-4 space-y-1">
              <p className="text-xs font-medium text-zinc-200 uppercase tracking-[0.16em]">
                Academic interests
              </p>
              <p className="text-zinc-300">
                Risk management, market microstructure, behavioral finance,
                trading systems, and how software can enforce discipline instead
                of emotion in financial decisions.
              </p>
            </div>

            <div className="rounded-2xl bg-[color:var(--color-coal)] border border-white/5 p-4 space-y-1">
              <p className="text-xs font-medium text-zinc-200 uppercase tracking-[0.16em]">
                Next steps
              </p>
              <p className="text-zinc-300">
                Exploring transfer and advanced programs that take finance,
                data, and technology seriously and value hands-on, project-based
                work alongside traditional coursework.
              </p>
            </div>
          </div>
        </section>

        {/* Experience / projects */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-100">
            Experience & Projects
          </h2>

          <div className="space-y-4">
            {/* Freelance */}
            <div className="rounded-3xl bg-[color:var(--color-coal)] border border-white/5 p-6 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-zinc-100">
                    Freelance Development
                  </h3>
                  <p className="text-sm text-zinc-300">Ongoing</p>
                </div>
              </div>

              <p className="text-sm text-zinc-300">
                Building small, production-ready web apps for clients and
                students using Next.js, TypeScript, and modern UI patterns.
                Work includes portfolio sites optimized for recruiters, trading
                dashboards, and fintech tools.
              </p>

              <ul className="text-sm text-zinc-300 list-disc list-inside space-y-1">
                <li>
                  End-to-end delivery: scope → build → deploy → documentation
                </li>
                <li>
                  Designed recruiter-friendly portfolio sites with strong SEO,
                  clean layout, and fast performance scores
                </li>
                <li>
                  Translated vague client goals into concrete scopes, timelines,
                  and deliverables
                </li>
              </ul>
            </div>

            {/* RIZZK */}
            <div className="rounded-3xl bg-[color:var(--color-coal)] border border-white/5 p-6 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-zinc-100">
                    Position Sizing & Risk Calculator (codename "RIZZK")
                  </h3>
                  <p className="text-sm text-zinc-300">
                    Personal project / Side work
                  </p>
                </div>
              </div>

              <p className="text-sm text-zinc-300">
                Web-based position sizing and risk-reward calculator for day
                traders. Calculates risk per trade, position size, and R:R
                ratios in real time. Built as a{" "}
                <span className="text-zinc-100">Python + Streamlit</span> app
                with a tested calculation core and deployed using Docker and
                Azure Web Apps.
              </p>

              <ul className="text-sm text-zinc-300 list-disc list-inside space-y-1">
                <li>
                  Applied trading and finance knowledge to build a tool traders
                  can use during live sessions
                </li>
                <li>
                  Implemented unit-tested calculation logic to keep outputs
                  reliable under different market scenarios
                </li>
                <li>
                  Designed end-to-end: from concept and UX to deployment and
                  ongoing iteration based on real usage
                </li>
              </ul>
            </div>

            {/* Portfolio */}
            <div className="rounded-3xl bg-[color:var(--color-coal)] border border-white/5 p-6 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-zinc-100">
                    Portfolio Site · heyimfuaad.me
                  </h3>
                  <p className="text-sm text-zinc-300">Personal branding project</p>
                </div>
              </div>

              <p className="text-sm text-zinc-300">
                Designed and built this site to present services, showcase
                projects, and provide a professional resume hub for recruiters,
                clients, and schools. Focus on SEO, accessibility, and mobile
                performance.
              </p>

              <ul className="text-sm text-zinc-300 list-disc list-inside space-y-1">
                <li>
                  Implemented structured metadata (JSON-LD), OG images, and
                  sitemaps to support search engine visibility
                </li>
                <li>
                  Tuned layout, typography, and color system for a calm,
                  earth-toned, dark-mode experience that still meets
                  accessibility standards
                </li>
                <li>
                  Deployed on Vercel with automated CI/CD and integrated
                  analytics to measure traffic and engagement over time
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-100">Skills</h2>
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="rounded-2xl bg-[color:var(--color-coal)] border border-white/5 p-4 space-y-1">
              <p className="text-xs font-medium text-zinc-200 uppercase tracking-[0.16em]">
                Technical
              </p>
              <p className="text-zinc-300">
                Next.js, React, TypeScript, Tailwind, Python, Streamlit,
                FastAPI, REST APIs, Vercel, Azure, Git, basic CI/CD.
              </p>
            </div>
            <div className="rounded-2xl bg-[color:var(--color-coal)] border border-white/5 p-4 space-y-1">
              <p className="text-xs font-medium text-zinc-200 uppercase tracking-[0.16em]">
                Finance & trading
              </p>
              <p className="text-zinc-300">
                Day trading basics, risk/reward, position sizing, journaling,
                performance tracking, and building tools that support discipline
                instead of impulse.
              </p>
            </div>
            <div className="rounded-2xl bg-[color:var(--color-coal)] border border-white/5 p-4 space-y-1">
              <p className="text-xs font-medium text-zinc-200 uppercase tracking-[0.16em]">
                How I work
              </p>
              <p className="text-zinc-300">
                Calm, low-ego collaborator. Prefers clear scopes, written plans,
                and small, testable launches over big promises and chaos.
              </p>
            </div>
          </div>
        </section>

        {/* LinkedIn badge / contact */}
        <section className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-100">
              Contact & Next Steps
            </h2>
            <p className="text-sm text-zinc-300">
              Open to internships, part-time roles, project work, and transfer
              or advanced study opportunities that sit at the intersection of
              finance, data, and software.
            </p>
            <p className="text-sm text-zinc-300">
              <span className="text-zinc-100">Email:</span>{" "}
              <a
                href="mailto:fuaadabdullah@gmail.com"
                className="underline underline-offset-2"
              >
                fuaadabdullah@gmail.com
              </a>
            </p>
            <p className="text-sm text-zinc-300">
              Response time: Usually within 24 hours. Prefer email for initial
              contact, then we can hop on a call or schedule something in-person.
            </p>
          </div>

          <div className="rounded-2xl bg-[color:var(--color-coal)] border border-white/5 p-4">
            <LinkedInBadge />
          </div>
        </section>
      </main>
    </>
  );
}
