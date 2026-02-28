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
      "B.B.A. Finance graduate with hands-on experience in account management, marketing, and client-facing operations, plus current work as an independent day trader and full-stack developer.",
    pdfHref: "/Fuaad_Abdullah_Resume.pdf",
    linkedInHref: "https://www.linkedin.com/in/fuaadabdullah",
    emailHref: "mailto:fuaadabdullah@gmail.com",
  },
  summary: {
    eyebrow: "Professional Summary",
    title: "Summary",
    paragraphs: [
      "I build practical software for trading and business workflows using Python, Streamlit, TypeScript, and automation-first tooling.",
      "I am strongest at turning unclear requirements into production-ready deliverables, with clear stakeholder communication and disciplined execution.",
    ],
    sideCards: [
      {
        eyebrow: "Contact",
        body:
          "• Email: fuaadabdullah@gmail.com\n• Phone: (404) 494-6262\n• Location: Atlanta, GA\n• Portfolio: heyimfuaad.me",
      },
      {
        eyebrow: "Currently open to",
        body:
          "• Software engineering roles (fintech-focused preferred)\n• Internships and early-career product/engineering opportunities\n• Freelance or contract development projects",
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
          "2020 – 2025. Completed an Associate of Science prior to continuing toward the B.B.A. Relevant coursework: Financial Accounting, Business Technology, Intro to Business, Marketing Principles.",
      },
      {
        eyebrow: "High School",
        title: "North Springs Charter School · High School Diploma",
        body: "2017 – 2019 · GPA: 3.7",
      },
      {
        eyebrow: "Academic Focus",
        body:
          "Finance + software execution: risk management, reporting, automation, and practical tooling for real operating workflows.",
      },
    ] as ResumeCard[],
  },
  experience: {
    title: "Experience",
    entries: [
      {
        title: "Independent Day Trader & Full Stack Developer",
        subtitle: "Self-Employed · Atlanta, GA · Feb 2023 – Present",
        description:
          "Trade equities with a disciplined risk-to-reward framework while building practical software for live trading operations and freelance client reporting.",
        bullets: [
          "Maintain structured trade logs and weekly performance reviews to improve edge quality and risk control",
          "Built Python utilities and Streamlit web apps (position-sizing calculators, trade-log exporters, lightweight dashboards) used in live trading and by freelance clients",
          "Delivered spreadsheet cleanups, automation scripts, and ad-hoc reporting for peers and small businesses to reduce manual work and improve reporting accuracy",
        ],
      },
      {
        title: "Jr. Account Manager",
        subtitle: "ABC Consultants Group · Atlanta, GA · May 2022 – Feb 2023",
        description:
          "Managed client-facing account execution and internal tracking to keep deliverables and billing timelines on schedule.",
        bullets: [
          "Managed client communication, project documentation, and status reporting to support timely invoicing and delivery",
          "Maintained Salesforce and internal trackers for clear account health visibility and next actions",
          "Coordinated with cross-functional teams to keep priorities aligned and work unblocked",
        ],
      },
      {
        title: "Marketing Intern",
        subtitle: "Mixdiety · Atlanta, GA · Jun 2021 – Feb 2022",
        description:
          "Supported campaign planning and reporting through customer research and execution support across digital channels.",
        bullets: [
          "Researched market trends and customer behavior to inform campaign direction",
          "Supported outreach across social and email channels",
          "Prepared performance summaries for leadership to support campaign decisions",
        ],
      },
      {
        title: "Server",
        subtitle: "Benihana · Atlanta, GA · Jun 2020 – Jun 2021",
        description:
          "Delivered high-volume customer service while coordinating with kitchen staff in a fast-paced environment.",
        bullets: [
          "Maintained hospitality standards during peak service periods",
          "Coordinated service timing across front-of-house and kitchen teams",
          "Balanced customer experience with operational efficiency under volume",
        ],
      },
      {
        title: "Server",
        subtitle: "Intermezzo Cafe · Atlanta, GA · Jan 2019 – Jun 2020",
        description:
          "Provided professional front-of-house service and supported day-to-day revenue initiatives.",
        bullets: [
          "Supported upselling and daily-specials initiatives",
          "Delivered consistent service quality and customer communication",
          "Handled customer interactions with professionalism and speed in a busy setting",
        ],
      },
    ] as ResumeExperience[],
  },
  projects: {
    title: "Featured Projects",
    items: [
      {
        title: "(⌐■_■) RIZZK Calculator 🚀",
        tagline: "Production-grade position sizing and risk calculator for day traders",
        tech: ["Python", "Streamlit", "Plotly", "Docker", "Azure"],
        links: {
          live: "https://rizzk-calculator-demo-eus2-f1.azurewebsites.net",
          source: "https://github.com/fuaadabdullah/rr-calculator",
        },
      },
      {
        title: "GoblinOS Assistant",
        tagline: "Multi-provider AI assistant with observable routing, privacy controls, and full-stack architecture",
        tech: ["FastAPI", "Next.js", "TypeScript", "PostgreSQL", "Redis", "Vercel", "Fly.io"],
        links: {
          live: "https://goblin-assistant.vercel.app",
          source: "https://github.com/fuaadabdullah/goblinos-assistant",
        },
      },
      {
        title: "Portfolio Site · heyimfuaad.me",
        tagline: "Production portfolio with blog, case studies, and SEO optimization",
        tech: ["Next.js", "React", "TypeScript", "Tailwind", "MDX", "Vercel"],
        links: {
          live: "https://heyimfuaad.me",
          source: "https://github.com/fuaadabdullah/fuaad-portfolio",
        },
      },
      {
        title: "Elbey Projects Website",
        tagline: "Customer marketing site for mobile mechanic business with conversion focus",
        tech: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
        links: {
          live: "https://marcus-website-iof60vvkq-fuaadabdullahs-projects.vercel.app",
          source: "https://github.com/fuaadabdullah/marcus-website",
        },
      },
      {
        title: "Gradem8 — HF Space 2",
        tagline: "Hugging Face Space integration demo for model hosting and inference workflows",
        tech: ["Next.js", "TypeScript", "Hugging Face Spaces", "Vercel"],
        links: {
          live: "https://gradem8-hf-space-2.vercel.app",
          source: "https://github.com/fuaadabdullah/gradem8-hf-space-2",
        },
      },
    ] as ResumeProject[],
  },
  skills: {
    title: "Core Skills",
    cards: [
      {
        eyebrow: "Languages & technical",
        body:
          "Python, TypeScript/JavaScript, Rust, SQL, Streamlit, Next.js, React, FastAPI, REST APIs, WebSocket workflows, Docker, Linux, Git/GitHub.",
      },
      {
        eyebrow: "Data, automation & analysis",
        body:
          "pandas, numpy, ETL/data cleaning, spreadsheet automation, reporting pipelines, dashboard delivery, and ad-hoc analytics.",
      },
      {
        eyebrow: "Finance & execution",
        body:
          "Risk management, position sizing, trade journaling, weekly review discipline, stakeholder communication, project scoping, and client delivery.",
      },
    ] as ResumeCard[],
  },
  contact: {
    title: "Contact & Certifications",
    paragraphs: [
      "Open to software engineering and fintech roles where disciplined execution, product thinking, and communication are required.",
      "Certifications: Excel Quick Tips (LinkedIn Learning, Sep 2025) · Creating Your Personal Brand (LinkedIn Learning, Oct 2025).",
    ],
    emailLabel: "fuaadabdullah@gmail.com",
    emailHref: "mailto:fuaadabdullah@gmail.com",
  },
};
