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
      "Finance student at Georgia State University with experience in account management, marketing, and customer-facing roles, plus hands-on work as an independent day trader and freelance developer.",
    pdfHref: "/Fuaad_Abdullah_Resume.pdf",
    linkedInHref: "https://www.linkedin.com/in/fuaadabdullah",
    emailHref: "mailto:fuaadabdullah@gmail.com",
  },
  summary: {
    eyebrow: "Professional Summary",
    title: "Summary",
    paragraphs: [
      "I build practical tools in Python, Streamlit, and spreadsheets, along with higher-performance prototypes in Rust, to turn data into decisions, automate workflows, and support trading operations.",
      "I am comfortable taking projects from scope to delivery and communicating technical tradeoffs to non-technical clients.",
    ],
    sideCards: [
      {
        eyebrow: "Contact",
        body:
          "• Email: fuaadabdullah@gmail.com\n• Phone: (404) 494-6262\n• Portfolio: heyimfuaad.me",
      },
      {
        eyebrow: "Currently open to",
        body:
          "• Internships in fintech, software engineering, and analytics\n• Freelance/contract development work\n• Roles combining finance, data, and product execution",
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
          "2020 – Present. Completed an Associate of Science prior to continuing toward the B.B.A. Relevant coursework: Financial Accounting, Business Technology, Intro to Business, Marketing Principles.",
      },
      {
        eyebrow: "High School",
        title: "North Springs Charter School · Diploma",
        body: "2017 – 2019 · GPA: 3.7",
      },
      {
        eyebrow: "Focus",
        body:
          "Finance + software execution: risk management, reporting, automation, and practical tool-building for real workflows.",
      },
    ] as ResumeCard[],
  },
  experience: {
    title: "Experience",
    entries: [
      {
        title: "Independent Day Trader & Freelance Developer",
        subtitle: "Self-Employed · Atlanta, GA · Feb 2023 – Present",
        description:
          "Trade equities with a disciplined risk-to-reward framework while building practical tooling for live trading workflows and client reporting needs.",
        bullets: [
          "Maintain structured trade logs and weekly performance reviews to improve edge and risk control",
          "Built Python utilities and Streamlit apps including position-sizing calculators, trade-log exporters, and lightweight dashboards",
          "Delivered spreadsheet cleanups, automation scripts, and ad-hoc reporting for peers and small businesses",
        ],
      },
      {
        title: "Jr. Account Manager",
        subtitle: "ABC Consultants Group · Atlanta, GA · May 2022 – Feb 2023",
        description:
          "Supported account operations, communication, and reporting to keep client work moving on schedule.",
        bullets: [
          "Managed client communication, project documentation, and status reporting",
          "Supported timely invoicing and on-schedule deliverables",
          "Maintained Salesforce and internal trackers for account health visibility and next actions",
        ],
      },
      {
        title: "Marketing Intern",
        subtitle: "Mixdiety · Atlanta, GA · Jun 2021 – Feb 2022",
        description:
          "Researched trends and customer behavior to support campaign planning and reporting.",
        bullets: [
          "Supported outreach across social and email channels",
          "Prepared performance summaries for leadership",
          "Contributed to campaign decisions using customer and trend analysis",
        ],
      },
      {
        title: "Server",
        subtitle: "Benihana · Atlanta, GA · Jun 2020 – Jun 2021",
        description:
          "Delivered high-volume customer service and coordinated with kitchen staff in a fast-paced environment.",
        bullets: [
          "Maintained hospitality standards during peak service periods",
          "Improved communication speed across front-of-house and kitchen teams",
          "Balanced customer experience with operational efficiency",
        ],
      },
      {
        title: "Server",
        subtitle: "Intermezzo Cafe · Atlanta, GA · Jan 2019 – Jun 2020",
        description:
          "Provided professional front-of-house service and contributed to sales-support initiatives.",
        bullets: [
          "Supported upselling and daily-specials initiatives",
          "Built consistency in customer experience and service quality",
          "Handled customer interactions with professionalism and speed",
        ],
      },
      {
        title: "Featured Project: (⌐■_■) RIZZK Calculator 🚀",
        subtitle: "Python, Streamlit, Docker, Azure",
        description:
          "Production-grade web app for day traders that calculates position size, risk dollars, risk percentage, and R-multiples from account size, entry, and stop-loss levels.",
        bullets: [
          "Supports both percent-of-account and fixed-dollar risk modes",
          "Includes live risk preview, responsive Plotly charts, permalink URLs, and a unit-tested calculation engine",
          "Deployed on Azure Web App for Containers with Docker and CI/CD",
        ],
      },
    ] as ResumeExperience[],
  },
  skills: {
    title: "Core Skills",
    cards: [
      {
        eyebrow: "Languages & technical",
        body:
          "Python, Rust, JavaScript/TypeScript, SQL, pandas, numpy, Streamlit, REST/WebSocket APIs, webhook handling, ETL/data cleaning, Plotly/matplotlib, Docker, Linux, basic CI, Git/GitHub.",
      },
      {
        eyebrow: "Finance & trading",
        body:
          "Risk management, position sizing, trade journaling, basic backtesting, and performance analytics.",
      },
      {
        eyebrow: "Market data, tools & client work",
        body:
          "Benzinga API, Polygon.io (REST/WebSocket), TradingView webhooks, CME Group market data, Sterling Trader sandbox experiments, Jupyter, VS Code, Google Sheets, Excel (advanced formulas/pivots), project scoping, and dashboard/report delivery.",
      },
    ] as ResumeCard[],
  },
  contact: {
    title: "Contact & Certifications",
    paragraphs: [
      "Open to internships, analyst-track opportunities, and practical software/fintech roles where disciplined execution and clear communication matter.",
      "Certifications: Excel Quick Tips (LinkedIn Learning, Sep 2025) · Creating Your Personal Brand (LinkedIn Learning, Oct 2025).",
    ],
    emailLabel: "fuaadabdullah@gmail.com",
    emailHref: "mailto:fuaadabdullah@gmail.com",
  },
};

