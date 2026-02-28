import type { FaqEntry } from "@/types/assistant";

export const siteFacts = `
This is the portfolio of Fuaad — B.B.A. finance graduate and full-stack developer.
Built with Next.js 16, App Router, TypeScript, Tailwind CSS, and MDX blogs.
Projects include RIZZK Calculator, GoblinOS Assistant, personal portfolio site, Elbey Projects customer website, and Gradem8 HF Space 2.

He offers services:
– Web app builds
– MVP tooling
– Custom dashboards

Blog topics cover:
– Next.js performance
– Portfolio development
– Trade tools and coding insights.
`;

export const faq: FaqEntry[] = [
  {
    trigger: ["services", "offer", "what do you do"],
    answer: "Fuaad offers web app builds, MVP tooling, custom dashboards, and developer utilities."
  },
  {
    trigger: ["goblin", "goblinos", "goblin assistant"],
    answer: "GoblinOS Assistant is a multi-provider, privacy-first AI assistant platform with intelligent model routing. It’s built with a FastAPI backend and a Next.js (React/TypeScript) frontend, plus Cloudflare edge, Vercel deployment, and infrastructure automation. Canonical repo: github.com/fuaadabdullah/goblinos-assistant."
  },
  {
    trigger: ["tech stack", "built with", "tech"],
    answer: "This portfolio site is built using Next.js App Router, TypeScript, MDX for blogs, Tailwind CSS, Framer Motion, and custom tooling."
  },
  {
    trigger: ["contact", "reach you", "email"],
    answer: "You can contact Fuaad through the contact form or via email at fuaadabdullah@gmail.com."
  }
];
