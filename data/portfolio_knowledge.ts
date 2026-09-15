import type { FaqEntry } from "@/types/assistant";
import { blogContent } from "@/data/site_content";

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
    answer: "GoblinOS Assistant uses a Dockerized FastAPI backend, Next.js frontend, TypeScript, Tailwind CSS, PostgreSQL, Redis, Docker, and a Vercel-hosted UI. The focus is multi-provider routing, privacy-first behavior, and clear observability across the stack."
  },
  {
    trigger: ["rizzk", "rizzk calculator", "position sizing", "risk calculator", "trading", "streamlit"],
    answer: "RIZZK Calculator is a production risk-management tool for day traders. It focuses on position sizing and risk/reward math, is built with Python, Streamlit, Plotly, Docker, and Azure, and was designed to reduce manual calculation mistakes under trading pressure."
  },
  {
    trigger: ["goblin", "goblinos", "goblin assistant"],
    answer: "GoblinOS Assistant is a multi-provider, privacy-first AI assistant with observable routing. It combines a Dockerized FastAPI backend with a Next.js and TypeScript frontend, adds PostgreSQL and Redis for state and caching, and hosts the UI on Vercel for deployment and infrastructure."
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
    // Listed before "this site" so recruiter questions that mention the site land here on a tie
    trigger: ["recruiter", "look at first", "start with", "strongest project", "best project", "flagship"],
    answer: "Start with the [GoblinOS Assistant case study](/portfolio/goblin-assistant), the flagship build featured on the home page, then the [résumé](/resume). Every project is on the [projects page](/portfolio)."
  },
  {
    trigger: ["view projects", "projects", "what has fuaad built", "what have you built", "case study", "case studies"],
    answer: "Fuaad's projects include RIZZK Calculator (risk management for day traders), GoblinOS Assistant (a multi-provider, privacy-first AI assistant), ShopMindAI (automotive diagnostics), Elbey Projects (a marketing site for a mobile mechanic business), GradeM8 (a grading workflow demo on Hugging Face Spaces), and this portfolio site. Browse them on the [projects page](/portfolio)."
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
    trigger: ["services", "offer", "what do you do", "hire", "work with", "build me", "can you build", "ecommerce", "e-commerce"],
    answer: "Fuaad offers web app builds, MVP tooling, custom dashboards, and focused productized services like UX polish, launch-ready websites, mini tools, and MVP bootstrap engagements."
  },
  // TinyLlama invented answers for everything below when it wasn't curated (a made-up college,
  // "no blog posts", generic prices, "search for fuaa dabullah"), so these facts stay reviewed.
  {
    trigger: ["pricing", "price", "cost", "rates", "how much", "budget", "quote", "turnaround", "how long does"],
    answer: "Published starting prices: UX/UI Polish Sprint $450 (1 week), Website Launch Package $950, Mini Tools from $199, and MVP Bootstrap from $2,400 (about 4 weeks to production). Scope and final price are confirmed before work starts; details are on the [services page](/services)."
  },
  {
    trigger: ["clients", "client work", "client project", "worked with clients", "testimonial", "freelance"],
    answer: "Yes. Fuaad takes on client projects: he built the Elbey Projects website for a mobile mechanic business, and the client said, \"Fuaad built our site in a week, clean and fast.\" See the [services page](/services) to start one."
  },
  {
    trigger: ["background", "resume", "résumé", "experience", "who is fuaad", "who is he", "about fuaad", "about him", "his story", "fuaad's story", "your story"],
    answer: "Fuaad is a Georgia State University finance graduate who builds full-stack web apps, automation tooling, and AI-backed products. His background combines finance, independent product development, and client delivery."
  },
  {
    trigger: ["trader", "day trad", "trade stocks", "does he trade", "stocks"],
    answer: "Yes. Fuaad is an independent day trader who trades equities under strict risk controls, and he built RIZZK Calculator for his own live trading workflow. More on the [résumé](/resume)."
  },
  {
    trigger: ["education", "school", "university", "college", "degree", "graduate", "studied", "did he study", "georgia state"],
    answer: "Fuaad is a B.B.A. finance graduate of Georgia State University in Atlanta. His [résumé](/resume) has the details."
  },
  {
    trigger: ["location", "where are you based", "atlanta", "he based", "fuaad based", "you based", "based in", "where is he from", "where are you from", "grew up", "raised", "saudi"],
    answer: "Fuaad was raised in Saudi Arabia and is based in Atlanta, Georgia."
  },
  {
    trigger: ["availability", "open to work", "open to", "looking for roles", "internship", "full-time", "full time", "job", "hiring", "available for"],
    answer: "He is open to software engineering roles, internships, contract work, and client projects."
  },
  {
    // TinyLlama invented "the site is not yet deployed" for these, so they get reviewed facts
    trigger: ["deploy", "hosted", "hosting", "where is it live", "cloud"],
    answer: "This portfolio is live at heyimfuaad.me on Vercel. GoblinOS Assistant pairs a Vercel-hosted Next.js UI with a Dockerized FastAPI backend, RIZZK Calculator and ShopMindAI run on Azure App Service, GradeM8 runs on Hugging Face Spaces, and Elbey Projects is deployed on Vercel. Live links for each are on the [projects page](/portfolio)."
  },
  {
    trigger: ["tech stack", "built with", "tech", "programming language", "code in"],
    answer: "The stack depends on the project. Recent work across the portfolio uses Next.js, TypeScript, Tailwind CSS, FastAPI, Python, PostgreSQL, Redis, Docker, Azure, Vercel, and Hugging Face Spaces."
  },
  {
    trigger: ["github", "linkedin", "source code", "open source", "repo", "demo", "socials"],
    answer: "Fuaad's code is on GitHub at github.com/fuaadabdullah, and he's on LinkedIn at linkedin.com/in/fuaadabdullah. Project pages link live demos and source code where available; start from the [projects page](/portfolio)."
  },
  {
    trigger: ["blog", "posts", "articles", "80/20"],
    answer: `Fuaad has written ${blogContent.length} posts: ${blogContent.map((post) => post.title).join("; ")}. Read them on the [blog](/blog).`
  },
  {
    trigger: ["for fun", "hobbies", "hobby", "outside of work", "free time", "sports"],
    answer: "Outside of work, Fuaad grew up playing soccer, recently got into tennis, and will happily watch basketball for hours. He also games and builds little ecosystems in tanks. More on the [about page](/about)."
  },
  {
    trigger: ["contact", "reach you", "reach him", "email", "book", "schedule", "interview", "meeting", "calendly"],
    answer: "You can contact Fuaad through the site contact form, email him at fuaadabdullah@gmail.com, or book a 30-minute call from the [contact page](/contact)."
  },
  {
    trigger: ["chatgpt", "what model", "who are you", "are you a bot", "are you ai", "are you human", "system prompt", "ignore previous", "ignore all", "your instructions"],
    answer: "I'm the assistant for Fuaad's portfolio site. I can answer questions about his projects, background, services, and how to reach him."
  },
  {
    trigger: ["thank"],
    answer: "You're welcome. The [projects page](/portfolio) and [contact page](/contact) are good next steps."
  }
];
