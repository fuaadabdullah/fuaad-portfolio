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

export type ResumeProject = {
  title: string;
  tagline: string;
  tech: string[];
  links?: { live?: string; source?: string };
};

export const resumeData = {
  header: {
    name: "Fuaad Abdullah",
    tagline:
      "B.B.A., Finance — Full-Stack Developer · Day Trader · AI & Automation Engineer",
    pdfHref: "/Fuaad_Abdullah_Resume.pdf",
    linkedInHref: "https://www.linkedin.com/in/fuaadabdullah",
    emailHref: "mailto:fuaadabdullah@gmail.com",
  },
  summary: {
    eyebrow: "Summary",
    title: "Summary",
    paragraphs: [
      "Product-minded software engineer and disciplined active trader who ships production tooling for trading operations, reporting, and AI orchestration.",
      "Bridges finance domain expertise with full-stack execution to deliver reliable, observable systems that cut manual work and sharpen decision quality. Strengths: turning ambiguous requirements into shipped deliverables, clear stakeholder communication, and disciplined operational execution.",
    ],
    sideCards: [
      {
        eyebrow: "Contact",
        body:
          "• fuaadabdullah@gmail.com\n• (404) 494-6262\n• heyimfuaad.me\n• Atlanta, GA",
      },
      {
        eyebrow: "Open to",
        body:
          "• Software engineering (fintech preferred)\n• Internships & contract development\n• Product-driven teams valuing end-to-end delivery",
      },
    ] as ResumeCard[],
  },
  academic: {
    title: "Education",
    cards: [
      {
        eyebrow: "University",
        title: "Georgia State University · B.B.A., Finance",
        body:
          "2020 – 2025 · Financial Accounting, Business Technology, Marketing Principles",
      },
      {
        eyebrow: "High School",
        title: "North Springs Charter School · Diploma",
        body: "2017 – 2019 · GPA 3.7",
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
          "Trade equities under strict risk controls with documented trade logs; build production tooling for live trading workflows and client reporting.",
        bullets: [
          "Shipped Streamlit apps — position-sizing calculators, trade-log exporters, performance dashboards — used daily in live trading and by freelance clients",
          "Delivered automation scripts and spreadsheet overhauls that cut manual reporting effort and improved data accuracy for small-business clients",
          "Run weekly performance reviews to refine edge and execution quality",
        ],
      },
      {
        title: "Jr. Account Manager",
        subtitle: "ABC Consultants Group · May 2022 – Feb 2023",
        description:
          "Owned client communications, project documentation, and status reporting to drive timely invoicing and delivery.",
        bullets: [
          "Maintained Salesforce and internal trackers to surface account health and eliminate missed deliverables",
          "Coordinated cross-functional teams to align priorities and clear delivery blockers",
        ],
      },
      {
        title: "Marketing Intern",
        subtitle: "Mixdiety · Jun 2021 – Feb 2022",
        description:
          "Conducted market and customer research that directly informed campaign strategy and targeting.",
        bullets: [
          "Ran multi-channel outreach (email, social) and built performance summaries that guided leadership decisions",
          "Streamlined campaign reporting to clarify ROI and prioritize follow-up actions",
        ],
      },
      {
        title: "Server — Benihana",
        subtitle: "Jun 2020 – Jun 2021",
        description:
          "Delivered high-volume customer service; coordinated front-of-house and kitchen timing during peak service.",
        bullets: [],
      },
      {
        title: "Server — Intermezzo Cafe",
        subtitle: "Jan 2019 – Jun 2020",
        description:
          "Drove upselling initiatives and sustained fast-paced, professional customer interactions.",
        bullets: [],
      },
    ] as ResumeExperience[],
  },
  projects: {
    title: "Projects",
    items: [
      {
        title: "Goblin Assistant — Featured",
        tagline: "Production multi-provider AI assistant with routing, observability, and privacy controls",
        tech: ["FastAPI", "Next.js", "TypeScript", "PostgreSQL", "Redis", "Docker", "Fly.io", "Vercel"],
        links: {
          live: "https://goblin-assistant.vercel.app",
          source: "https://github.com/fuaadabdullah/forgemono",
        },
      },
      {
        title: "RIZZK Calculator",
        tagline: "Production position-sizing and risk management tool for active day traders",
        tech: ["Python", "Streamlit", "Plotly", "Docker", "Azure"],
        links: {
          live: "https://rizzk-calculator-demo-eus2-f1.azurewebsites.net",
          source: "https://github.com/fuaadabdullah/rr-calculator",
        },
      },
      {
        title: "GradeM8",
        tagline: "Model hosting and inference workflow demo integrating Hugging Face Spaces",
        tech: ["Next.js", "TypeScript", "Hugging Face Spaces", "Vercel"],
        links: {
          live: "https://huggingface.co/spaces/fuaadabdullah/gradem8",
        },
      },
      {
        title: "ShopMindAI",
        tagline: "Automotive diagnostic assistant with ranked causes and confirmatory test suggestions",
        tech: ["FastAPI", "Python", "SQLAlchemy", "FAISS", "Azure"],
        links: {},
      },
      {
        title: "Elbey Projects",
        tagline: "Conversion-focused marketing site for a mobile mechanic business",
        tech: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
        links: {
          live: "https://marcus-website-iof60vvkq-fuaadabdullahs-projects.vercel.app",
        },
      },
      {
        title: "Portfolio — heyimfuaad.me",
        tagline: "Personal site featuring blog, case studies, and SEO optimizations",
        tech: ["Next.js", "React", "TypeScript", "Tailwind", "MDX", "Vercel"],
        links: {
          live: "https://heyimfuaad.me",
          source: "https://github.com/fuaadabdullah/fuaad-portfolio",
        },
      },
    ] as ResumeProject[],
  },
  skills: {
    title: "Skills",
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
          "Docker · Linux · Git/GitHub · WebSockets · REST APIs · PostgreSQL · Redis · Vercel · Fly.io · Azure",
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
    title: "Accomplishments & Certifications",
    paragraphs: [
      "Launched a production AI orchestration platform with multi-provider routing, observability, and privacy controls. Built trader-facing tooling that eliminated manual sizing and logging friction. Delivered client automation that improved invoice accuracy and cut reconciliation overhead. Shipped end-to-end features across the full stack repeatedly.",
      "Certifications: Excel Quick Tips (LinkedIn Learning, Sep 2025) · Creating Your Personal Brand (LinkedIn Learning, Oct 2025)",
    ],
    emailLabel: "fuaadabdullah@gmail.com",
    emailHref: "mailto:fuaadabdullah@gmail.com",
  },
};
