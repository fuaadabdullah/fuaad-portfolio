export type Service = {
  slug: string;
  title: string;
  price: string;
  whatYouGet: string[];
  whyItMatters: string;
  howItWorks: string[];
};

export const services: Service[] = [
  {
    slug: "ux-polish",
    title: "UX/UI Polish Sprint",
    price: "$450",
    whatYouGet: [
      "One-week design pass on your existing app",
      "Spacing, colors, typography, and basic accessibility improvements",
      "Before/after screenshots",
      "Simple checklist of changes made",
    ],
    whyItMatters:
      "Your app works, but it doesn't look polished. This sprint fixes the visual rough edges so it feels professional instead of \"I built this in a weekend.\" Clean UI = more trust from users.",
    howItWorks: [
      "You send me the link + areas you want improved",
      "I audit and document the issues",
      "Polish pass: spacing, colors, typography, accessibility",
      "You get before/after screenshots + a checklist",
    ],
  },
  {
    slug: "portfolio-sites",
    title: "Website Launch Package",
    price: "$950",
    whatYouGet: [
      "Custom design (no template clone) tailored to your niche",
      "1-3 core pages (home, about, contact/services) in Next.js + Tailwind",
      "Responsive layout for mobile, tablet, desktop",
      "Basic SEO: meta tags, OG images, sitemap, clean URLs",
      "Analytics wired (so you can see who's visiting)",
      "Deployed to Vercel with your own domain + DNS set up",
      "Loom walkthrough so you know how to use/update it",
    ],
    whyItMatters:
      "Feels like a real brand, not a class project. Loads fast, doesn't look sketchy, doesn't scare off recruiters or clients. Gives you a clean link you can drop on LinkedIn, resumes, applications, or DMs. Built to be extended later if you want a blog, case studies, or dashboards.",
    howItWorks: [
      "30-45 min call: goals, examples you like, constraints",
      "Wireframe & color direction (you sign off)",
      "Build phase (you get a staging link to preview)",
      "Polish pass (accessibility, spacing, performance)",
      "Launch + Loom walkthrough + small fixes",
    ],
  },
  {
    slug: "trading-tools",
    title: "Mini Tools",
    price: "$199+",
    whatYouGet: [
      "Numbers-based tools such as calculators, trade journals, or mini dashboards",
      "Clean UI with real-time calculations or data updates",
      "Mobile-friendly and responsive",
      "Basic deployment (can be standalone or integrated into your site)",
    ],
    whyItMatters:
      "Numbers-first tools that enforce discipline instead of vibes. Perfect for traders, students, or small teams who need focused utilities without the bloat of a full app.",
    howItWorks: [
      "You describe the tool and what it needs to calculate/display",
      "I scope it out and confirm price based on complexity",
      "Build + test with sample data",
      "Deploy and hand off with basic documentation",
    ],
  },
  {
    slug: "mvp-bootstrap",
    title: "MVP Bootstrap",
    price: "$2,400+",
    whatYouGet: [
      "Full-stack: auth, real database, API, charts",
      "Deployment to production environment",
      "Documentation so it doesn't break the second you try to use it with real people",
      "Handover call to walk through the codebase and deployment",
    ],
    whyItMatters:
      "You need more than a landing page - you need auth, CRUD, a dashboard, and real data flow. This gets you a working foundation you can actually build on, not just pretty screens that don't do anything. You're not just paying for code. You're paying for less headache later.",
    howItWorks: [
      "Discovery call: what you're building, who it's for, what's the MVP scope",
      "Tech stack + architecture plan (you approve before I start)",
      "Two-week sprint: auth, CRUD, basic charts, deployment",
      "Code walkthrough + documentation",
      "Handoff call so you're not lost once I'm gone",
    ],
  },
];

export const servicesContact = {
  formAction: "https://formspree.io/f/xzzjjqoj",
  heading: "Get in Touch",
  intro:
    "Interested in working together? Drop me a message and I'll get back to you soon.",
};

