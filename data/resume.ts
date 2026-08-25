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

export type AcademicDetail = {
  institution: string;
  degree: string;
  years: string;
  coursework?: string[];
  gpa?: string;
  honors?: string[];
  notes?: string;
};

export type ResumeSignal = {
  label: string;
  value: string;
};

export type ResumeProjectMetric = {
  value: string;
  label: string;
};

export type ResumeProject = {
  title: string;
  tagline: string;
  tech: string[];
  metrics?: ResumeProjectMetric[];
  bullets?: string[];
  links?: { live?: string; source?: string };
};

export const resumeData = {
  header: {
    name: "Fuaad Abdullah",
    tagline:
      "Software engineer building trading tools, automation, and AI products I actually use.",
    subline:
      "B.B.A., Finance at Georgia State University · Full-stack engineer shipping fintech, automation, and AI products end to end.",
    availability: "Open to fintech engineering roles · select contract work",
    signals: [
      { label: "Primary stack", value: "Python · TypeScript · Next.js · FastAPI · PostgreSQL" },
      { label: "Flagship proof", value: "Trading tools, AI workflows, and client sites shipped to production" },
    ] as ResumeSignal[],
    pdfHref: "/Fuaad_Abdullah_Resume.pdf",
    linkedInHref: "https://www.linkedin.com/in/fuaadabdullah",
    emailHref: "mailto:fuaadabdullah@gmail.com",
  },
  summary: {
    eyebrow: "Summary",
    title: "Finance x software delivery",
    paragraphs: [
      "Full-stack engineer building trading, automation, and AI tools from lived workflow experience — not theoretical projects.",
      "I ship products across the stack, from trader-facing calculators and reporting workflows to production AI backends and client sites, with an emphasis on speed, reliability, and measurable outcomes.",
    ],
    highlights: [
      { label: "Finance edge", value: "Active trader building tools for real trading decisions" },
      { label: "Can ship", value: "Production apps delivered across Next.js, FastAPI, Python, Azure, and Vercel" },
      { label: "What I want", value: "Fintech engineering roles, product-minded teams, and select contract work" },
    ] as ResumeSignal[],
    sideCards: [
      {
        eyebrow: "Contact",
        body:
          "• fuaadabdullah@gmail.com\n• (404) 494-6262\n• heyimfuaad.me\n• Atlanta, GA",
      },
      {
        eyebrow: "Recruiter scan",
        body:
          "• Finance background with real trading domain context\n• Full-stack engineer shipping production tools\n• Strong fit for fintech, product, and automation teams",
      },
    ] as ResumeCard[],
  },
  academic: {
    title: "Education",
    details: {
      institution: "Georgia State University",
      degree: "B.B.A., Finance",
      years: "2020 – 2025",
      coursework: ["Financial Accounting", "Business Technology", "Marketing Principles"],
      notes:
        "Academic detail is intentionally concise here; the full CV expands the coursework and project framing for graduate-school applications.",
    } as AcademicDetail,
    cards: [
      {
        eyebrow: "University",
        title: "Georgia State University · B.B.A., Finance",
        body:
          "2020 – 2025 · Financial Accounting, Business Technology, Marketing Principles",
      },
      {
        eyebrow: "Relevant focus",
        title: "Markets, reporting, and systems thinking",
        body:
          "Applied finance training to trading workflows, risk management, and numbers-first product decisions.",
      },
    ] as ResumeCard[],
  },
  experience: {
    title: "Experience",
    entries: [
      {
        title: "Independent Day Trader & Full-Stack Developer",
        subtitle: "Self-employed · Feb 2023 – Present",
        description:
          "Trade equities under strict risk controls while shipping tooling for live trading workflows, reporting, and client delivery.",
        bullets: [
          "Shipped RIZZK, a production risk calculator that cut position-size mistakes by ~90% and made sizing decisions ~50% faster in live trading sessions — self-reported estimates from my own sessions, not a controlled measurement.",
          "Built Streamlit trading dashboards, export tools, and spreadsheet automations used in daily workflows and freelance client reporting.",
          "Operate with weekly review loops, documented trade logs, and measurable execution discipline that carry directly into product work.",
        ],
      },
      {
        title: "Jr. Account Manager",
        subtitle: "ABC Consultants Group · May 2022 – Feb 2023",
        description:
          "Owned client communications, documentation, and status tracking to keep delivery and invoicing on schedule.",
        bullets: [
          "Maintained Salesforce and internal trackers to surface account health and reduce the risk of missed deliverables.",
          "Coordinated cross-functional teams, clarified blockers early, and kept project updates actionable for stakeholders.",
        ],
      },
      {
        title: "Marketing Intern",
        subtitle: "Mixdiety · Jun 2021 – Feb 2022",
        description:
          "Conducted market research and campaign reporting that informed targeting and follow-up priorities.",
        bullets: [
          "Ran multi-channel outreach across email and social, then packaged performance insights for leadership review.",
          "Improved reporting clarity so campaign ROI and next actions were easier to evaluate quickly.",
        ],
      },
    ] as ResumeExperience[],
  },
  projects: {
    title: "Selected projects",
    items: [
      {
        title: "Goblin Assistant",
        tagline: "Multi-provider AI assistant with routing, observability, and privacy controls.",
        tech: ["FastAPI", "Next.js", "TypeScript", "PostgreSQL", "Redis", "Docker", "Vercel"],
        metrics: [
          { value: "2", label: "app layers integrated" },
          { value: "4", label: "visible workflow surfaces" },
          { value: "12", label: "core technologies shipped" },
        ],
        bullets: [
          "Built an AI system spanning frontend, backend, infra, and provider routing instead of a single demo surface.",
          "Added live status, latency, and routing visibility so model behavior is explainable and operationally credible.",
        ],
        links: {
          live: "https://goblin-assistant.vercel.app",
          source: "https://github.com/fuaadabdullah/goblin-assistant",
        },
      },
      {
        title: "RIZZK Calculator",
        tagline: "Production position-sizing and risk management tool for active day traders.",
        tech: ["Python", "Streamlit", "Plotly", "Docker", "Azure"],
        metrics: [
          { value: "~90%", label: "fewer position-size mistakes · self-reported" },
          { value: "~50%", label: "faster sizing decisions · self-reported" },
          { value: "4 weeks", label: "build to production" },
        ],
        bullets: [
          "Built for real-money trading workflows I use myself, which made the UX and risk model grounded in actual trading pressure.",
        ],
        links: {
          live: "https://rizzk-calculator-demo-eus2-f1.azurewebsites.net",
          source: "https://github.com/fuaadabdullah/rr-calculator",
        },
      },
      {
        title: "GradeM8",
        tagline: "AI grading assistant with rubric-based feedback and production-minded test coverage.",
        tech: ["Python", "Gradio", "Hugging Face", "pytest"],
        metrics: [
          { value: "60-70%", label: "routine grading time reduced · teacher feedback, informal" },
          { value: "285+", label: "tests in suite" },
          { value: "4", label: "document formats supported" },
        ],
        bullets: [
          "Combined document parsing, inference workflows, and test discipline into a tool teachers can actually evaluate for repeated use.",
        ],
        links: {
          live: "https://huggingface.co/spaces/fuaadabdullah1/gradem8",
          source: "https://github.com/fuaadabdullah/gradem8-hf-space-2",
        },
      },
      {
        title: "Portfolio",
        tagline: "Recruiter-ready portfolio and case-study site built for performance, accessibility, and SEO.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind", "MDX", "Vercel"],
        metrics: [
          { value: "89/100", label: "Lighthouse perf · mobile audit Aug 2026" },
          { value: "2.0s", label: "LCP homepage mobile · same audit" },
          { value: "2 weeks", label: "build + launch timeline" },
        ],
        bullets: [
          "Built a portfolio that performs like a product, not a static brochure, with strong search and resume delivery baked in.",
        ],
        links: {
          live: "https://heyimfuaad.me",
          source: "https://github.com/fuaadabdullah/fuaad-portfolio",
        },
      },
      {
        title: "Elbey Projects",
        tagline: "Conversion-focused website for a mobile mechanic business.",
        tech: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
        metrics: [
          { value: "7", label: "customer-facing pages shipped" },
          { value: "1 week", label: "delivery timeline" },
          { value: "3", label: "core booking paths" },
        ],
        bullets: [
          "Delivered a complete, SEO-ready client site in one week with mobile booking flows and clear service navigation.",
        ],
        links: {
          live: "https://marcus-website-iof60vvkq-fuaadabdullahs-projects.vercel.app",
          source: "https://github.com/fuaadabdullah/marcus-website",
        },
      },
    ] as ResumeProject[],
  },
  skills: {
    title: "Stack",
    cards: [
      {
        eyebrow: "Languages & Frameworks",
        body:
          "Python · TypeScript · JavaScript · Rust · SQL · React · Next.js · Streamlit · FastAPI",
      },
      {
        eyebrow: "Data & Automation",
        body:
          "pandas · numpy · ETL pipelines · spreadsheet automation · reporting workflows · dashboard delivery",
      },
      {
        eyebrow: "Infrastructure",
        body:
          "Docker · Linux · Git/GitHub · WebSockets · REST APIs · PostgreSQL · Redis · Vercel · Azure",
      },
      {
        eyebrow: "AI & ML Ops",
        body:
          "Model hosting · Hugging Face Spaces · inference pipelines · LLM provider routing · observability",
      },
      {
        eyebrow: "Trading & Ops",
        body:
          "Risk management · position sizing · trade journaling · weekly performance reviews · execution discipline",
      },
    ] as ResumeCard[],
  },
  contact: {
    title: "Why recruiters reach out",
    paragraphs: [
      "Rare finance-plus-engineering profile: I understand markets and trading workflows, then build the software around them myself.",
      "Strong fit for teams that want an intern or early-career engineer who can ship user-facing product work, APIs, automation, and operational tooling without needing every task over-scoped first.",
    ],
    emailLabel: "fuaadabdullah@gmail.com",
    emailHref: "mailto:fuaadabdullah@gmail.com",
  },
};
