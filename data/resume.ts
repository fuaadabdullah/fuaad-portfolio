export type ResumeExperience = {
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
};

export type ResumeCard = {
  eyebrow: string;
  title?: string;
  body: string;
};

export const resumeData = {
  header: {
    name: "Fuaad Abdullah",
    tagline:
      "Finance major at Georgia State University · freelance developer · day trader. I build practical fintech tools, trading dashboards, and portfolio sites with a focus on discipline, data, and clean execution.",
    pdfHref: "/Fuaad_Abdullah_Resume.pdf",
    linkedInHref: "https://www.linkedin.com/in/fuaadabdullah",
    emailHref: "mailto:fuaadabdullah@gmail.com",
  },
  summary: {
    eyebrow: "For recruiters · clients · schools",
    title: "Summary",
    paragraphs: [
      "I operate at the intersection of finance, trading, and software. I use code to turn messy ideas into systems: risk tools that keep traders honest, dashboards that surface real metrics, and portfolio sites that look professional instead of improvised.",
      "This page is for recruiters, clients, and schools: a clear view of what I've built so far, what I'm studying, and where I'm trying to go next.",
    ],
    sideCards: [
      {
        eyebrow: "Currently open to",
        body:
          "• Internships in finance, fintech, or software engineering\n• Freelance / contract projects (web, dashboards, tools)\n• Transfer / advanced study opportunities in finance, data, or technology",
      },
      {
        eyebrow: "Where I add value",
        body:
          "• Turning fuzzy requirements into concrete, scoped builds\n• Bridging trading / finance concepts with real software\n• Shipping small, reliable releases instead of half-finished ideas",
      },
    ] as ResumeCard[],
  },
  academic: {
    title: "Academic Profile",
    cards: [
      {
        eyebrow: "Degree",
        title: "B.B.A. Finance (in progress) · Georgia State University",
        body:
          "Building a foundation in markets, risk, and financial decision-making, with a growing focus on fintech and quantitative tools applied through personal trading and software projects.",
      },
      {
        eyebrow: "Academic interests",
        body:
          "Risk management, market microstructure, behavioral finance, trading systems, and how software can enforce discipline instead of emotion in financial decisions.",
      },
      {
        eyebrow: "Next steps",
        body:
          "Exploring transfer and advanced programs that take finance, data, and technology seriously and value hands-on, project-based work alongside traditional coursework.",
      },
    ] as ResumeCard[],
  },
  experience: {
    title: "Experience & Projects",
    entries: [
      {
        title: "Freelance Development",
        subtitle: "Ongoing",
        description:
          "Building small, production-ready web apps for clients and students using Next.js, TypeScript, and modern UI patterns. Work includes portfolio sites optimized for recruiters, trading dashboards, and fintech tools.",
        bullets: [
          "End-to-end delivery: scope → build → deploy → documentation",
          "Designed recruiter-friendly portfolio sites with strong SEO, clean layout, and fast performance scores",
          "Translated vague client goals into concrete scopes, timelines, and deliverables",
        ],
      },
      {
        title: 'Position Sizing & Risk Calculator (codename "RIZZK")',
        subtitle: "Personal project / Side work",
        description:
          "Web-based position sizing and risk-reward calculator for day traders. Calculates risk per trade, position size, and R:R ratios in real time. Built as a Python + Streamlit app with a tested calculation core and deployed using Docker and Azure Web Apps.",
        bullets: [
          "Applied trading and finance knowledge to build a tool traders can use during live sessions",
          "Implemented unit-tested calculation logic to keep outputs reliable under different market scenarios",
          "Designed end-to-end: from concept and UX to deployment and ongoing iteration based on real usage",
        ],
      },
      {
        title: "Portfolio Site · heyimfuaad.me",
        subtitle: "Personal branding project",
        description:
          "Designed and built this site to present services, showcase projects, and provide a professional resume hub for recruiters, clients, and schools. Focus on SEO, accessibility, and mobile performance.",
        bullets: [
          "Implemented structured metadata (JSON-LD), OG images, and sitemaps to support search engine visibility",
          "Tuned layout, typography, and color system for a calm, earth-toned, dark-mode experience that still meets accessibility standards",
          "Deployed on Vercel with automated CI/CD and integrated analytics to measure traffic and engagement over time",
        ],
      },
    ] as ResumeExperience[],
  },
  skills: {
    title: "Skills",
    cards: [
      {
        eyebrow: "Technical",
        body:
          "Next.js, React, TypeScript, Tailwind, Python, Streamlit, FastAPI, REST APIs, Vercel, Azure, Git, basic CI/CD.",
      },
      {
        eyebrow: "Finance & trading",
        body:
          "Day trading basics, risk/reward, position sizing, journaling, performance tracking, and building tools that support discipline instead of impulse.",
      },
      {
        eyebrow: "How I work",
        body:
          "Calm, low-ego collaborator. Prefers clear scopes, written plans, and small, testable launches over big promises and chaos.",
      },
    ] as ResumeCard[],
  },
  contact: {
    title: "Contact & Next Steps",
    paragraphs: [
      "Open to internships, part-time roles, project work, and transfer or advanced study opportunities that sit at the intersection of finance, data, and software.",
      "Response time: Usually within 24 hours. Prefer email for initial contact, then we can hop on a call or schedule something in-person.",
    ],
    emailLabel: "fuaadabdullah@gmail.com",
    emailHref: "mailto:fuaadabdullah@gmail.com",
  },
};

