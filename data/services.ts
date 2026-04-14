export interface ServiceOffering {
  slug: string;
  title: string;
  price: string;
  summary: string;
  turnaround?: string;
  whatYouGet: string[];
  whyItMatters: string;
  howItWorks: string[];
  caseStudy?: {
    title: string;
    summary: string;
    href: string;
    liveHref?: string;
    images: {
      src: string;
      alt: string;
      width: number;
      height: number;
    }[];
  };
}

export const services = [
  {
    slug: "ux-polish",
    title: "UX/UI Polish Sprint",
    price: "$450",
    turnaround: "1 week delivery",
    summary:
      "One-week polish pass for an existing app to tighten spacing, typography, accessibility, and overall trust.",
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
    turnaround: "1 week recent client delivery",
    summary:
      "Launch-ready marketing site with custom design, responsive layouts, SEO basics, and a proper Vercel handoff.",
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
    caseStudy: {
      title: "Elbey Projects",
      summary:
        "Recent shipped example: a conversion-focused multi-page site for a mobile mechanic business with booking paths, service pages, and SEO-friendly structure.",
      href: "/portfolio/elbey-projects",
      liveHref: "https://marcus-website-iof60vvkq-fuaadabdullahs-projects.vercel.app",
      images: [
        {
          src: "/projects/elbey-projects-home.png",
          alt: "Elbey Projects homepage with primary booking CTA",
          width: 1440,
          height: 1080,
        },
        {
          src: "/projects/elbey-projects-contact.png",
          alt: "Elbey Projects booking form and lead capture page",
          width: 1440,
          height: 1080,
        },
      ],
    },
  },
  {
    slug: "trading-tools",
    title: "Mini Tools",
    price: "$199+",
    turnaround: "Fast scoped delivery",
    summary:
      "Numbers-first calculators, dashboards, and trade utilities built for focused workflows instead of feature bloat.",
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
    turnaround: "4 weeks to production",
    summary:
      "Full-stack MVP foundation with auth, CRUD, charts, production deployment, and a clean handoff.",
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
] satisfies ServiceOffering[];

export const servicesSummaryCard = {
  title: "Consulting",
  description: "Frontend polish, Streamlit/Next.js builds, and deployment-ready MVPs.",
  href: "/services",
  ctaLabel: "View services",
};
