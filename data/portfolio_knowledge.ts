import type { FaqEntry } from "@/types/assistant";

export const siteFacts = `
This is the portfolio of Fuaad Abdullah — a B.B.A. finance graduate, full-stack developer, and builder focused on practical tools, automations, and MVPs.
Built with Next.js 16, App Router, TypeScript, Tailwind CSS, and MDX blogs.
Projects include RIZZK Calculator, GoblinOS Assistant, personal portfolio site, Elbey Projects customer website, GradeM8 Hugging Face Space demo, and ShopMindAI.

He offers services:
– Web app builds
– MVP tooling
– Custom dashboards

Background and contact:
– Based in Atlanta, Georgia
– Georgia State University finance graduate
– Open to software engineering roles, internships, contract work, and client projects
– Contact via the site contact form or fuaadabdullah@gmail.com

Blog topics cover:
– Next.js performance
– Portfolio development
– Trade tools and coding insights.
`;

export const faq: FaqEntry[] = [
  {
    trigger: ["shopmind tech stack", "shopmindai tech stack", "tech stack for shopmind", "what's your tech stack for shopmindai"],
    answer: "ShopMindAI uses FastAPI with typed schemas and a modular backend service layer. The project handles VIN, OBD code, and symptom intake, returns ranked causes plus confirmatory tests, and includes health and metrics endpoints for production monitoring."
  },
  {
    trigger: ["goblin tech stack", "goblinos tech stack", "goblin assistant tech stack", "what's your tech stack for goblinos"],
    answer: "GoblinOS Assistant uses a FastAPI backend, Next.js frontend, TypeScript, Tailwind CSS, PostgreSQL, Redis, Docker, Fly.io, and Vercel. The focus is multi-provider routing, privacy-first behavior, and clear observability across the stack."
  },
  {
    trigger: ["rizzk", "rizzk calculator", "position sizing", "risk calculator"],
    answer: "RIZZK Calculator is a production risk-management tool for day traders. It focuses on position sizing and risk/reward math, is built with Python, Streamlit, Plotly, Docker, and Azure, and was designed to reduce manual calculation mistakes under trading pressure."
  },
  {
    trigger: ["goblin", "goblinos", "goblin assistant"],
    answer: "GoblinOS Assistant is a multi-provider, privacy-first AI assistant with observable routing. It combines a FastAPI backend with a Next.js and TypeScript frontend, adds PostgreSQL and Redis for state and caching, and and uses Docker, Fly.io, and Vercel for deployment and infrastructure."
  },
  {
    trigger: ["portfolio tech stack", "portfolio site tech stack", "tech stack for the portfolio", "what powers this site"],
    answer: "This portfolio site runs on Next.js 16 with the App Router, TypeScript, Tailwind CSS, MDX content, and custom AI tooling. It is structured for fast page loads, SEO, and reusable project and service data."
  },
  {
    trigger: ["shopmind", "shopmindai", "automotive ai", "diagnostic assistant"],
    answer: "ShopMindAI is an automotive diagnostic assistant that turns VIN, OBD code, and symptom input into ranked likely causes and confirmatory tests. It is built with FastAPI, exposes health and metrics endpoints for observability, and is deployed on Azure."
  },
  {
    trigger: ["portfolio site", "personal portfolio", "this site", "your portfolio"],
    answer: "The personal portfolio site showcases projects, services, blog content, and professional background in one place. It is a Next.js App Router site with MDX blogging, strong SEO foundations, and reusable data-backed project pages."
  },
  {
    trigger: ["elbey", "elbey projects", "mobile mechanic website"],
    answer: "Elbey Projects is a customer-facing marketing site for a mobile mechanic business. It ships a multi-page Next.js site with services, gallery, FAQ, blog, and booking-oriented conversion paths, and the currently listed live URL is the current public Vercel preview deployment."
  },
  {
    trigger: ["gradem8", "grade m8", "hugging face", "hf space"],
    answer: "GradeM8 is a grading workflow demo tied to Hugging Face Spaces. It explores a Next.js and TypeScript frontend connected to model-hosting and inference workflows for document assessment use cases."
  },
  {
    trigger: ["services", "offer", "what do you do", "hire", "work with"],
    answer: "Fuaad offers web app builds, MVP tooling, custom dashboards, and focused productized services like UX polish, launch-ready websites, mini tools, and MVP bootstrap engagements."
  },
  {
    trigger: ["background", "resume", "experience", "education"],
    answer: "Fuaad is a Georgia State University finance graduate who builds full-stack web apps, automation tooling, and AI-backed products. His background combines finance, independent product development, and client delivery."
  },
  {
    trigger: ["location", "where are you based", "atlanta"],
    answer: "Fuaad is based in Atlanta, Georgia."
  },
  {
    trigger: ["availability", "open to work", "open to", "looking for roles"],
    answer: "He is open to software engineering roles, internships, contract work, and client projects."
  },
  {
    trigger: ["tech stack", "built with", "tech"],
    answer: "The stack depends on the project. Recent work across the portfolio uses Next.js, TypeScript, Tailwind CSS, FastAPI, Python, PostgreSQL, Redis, Docker, Azure, Fly.io, Vercel, and Hugging Face Spaces."
  },
  {
    trigger: ["contact", "reach you", "email"],
    answer: "You can contact Fuaad through the site contact form or directly via email at fuaadabdullah@gmail.com."
  }
];
