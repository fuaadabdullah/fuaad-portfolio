import type { ContentEntry } from "@/types/assistant";

export const blogContent: ContentEntry[] = [
  {
    slug: "performance-tips",
    title: "Next.js Performance Tips",
    summary: "Tips for optimizing Next.js applications including caching strategies, image optimization, and bundle analysis.",
    keyPoints: [
      "Use Next.js Image component for automatic optimization",
      "Implement proper caching headers",
      "Use dynamic imports for code splitting",
      "Monitor bundle size with webpack bundle analyzer"
    ]
  },
  {
    slug: "portfolio-v1-release",
    title: "Portfolio v1.0 Release",
    summary: "Launch of production-ready portfolio with Next.js 16, WCAG 2.2 AA accessibility, and Lighthouse 98/100 performance.",
    keyPoints: [
      "Lighthouse 98/100 performance score",
      "WCAG 2.2 AA accessibility compliant",
      "Next.js 16 with App Router",
      "Tailwind CSS styling",
      "MDX blog support",
      "Vercel hosting and analytics"
    ]
  },
  {
    slug: "building-rizzk",
    title: "Building RIZZK: A Disciplined Approach to Risk Management",
    summary: "How I built a risk calculator for day traders, lessons learned from 500+ users, and the importance of solving real problems.",
    keyPoints: [
      "Focused on one core problem: position sizing",
      "Free tool reached 500+ users",
      "Distribution beats features",
      "Side projects teach full-stack skills",
      "Built with Python, Streamlit, and Azure"
    ]
  },
  {
    slug: "80-20-rule-student-projects",
    title: "The 80/20 Rule for Student Side Projects",
    summary: "Focus on the 20% of features that deliver 80% of value to ship production-ready projects in 2 weeks.",
    keyPoints: [
      "20% of features deliver 80% of value",
      "Ship smallest viable version first",
      "2-week sprints force focus",
      "Iterate based on user feedback",
      "Done beats perfect"
    ]
  },
  {
    slug: "goblinos-assistant-release",
    title: "GoblinOS Assistant: Multi-Provider AI Assistant",
    summary: "Release note for GoblinOS Assistant and its chat + system status UI.",
    keyPoints: [
      "Chat interface with system status panels",
      "Multi-provider routing with intelligent selection",
      "FastAPI backend (Python)",
      "Next.js frontend (React/TypeScript)",
      "Cloudflare edge + Vercel frontend",
      "Docker + Terraform infrastructure"
    ]
  }
];

export const projectContent: ContentEntry[] = [
  {
    slug: "rizzk-calculator",
    title: "(⌐■_■) RIZZK Calculator 🚀",
    summary: "Risk management tool for day traders providing position sizing and risk/reward calculations.",
    keyPoints: [
      "Real-time position sizing calculations",
      "Risk/reward ratio analysis",
      "Mobile-first responsive design",
      "Built with Python and Streamlit",
      "500+ active users",
      "Hosted on Azure"
    ]
  },
  {
    slug: "goblin-assistant",
    title: "GoblinOS Assistant",
    summary: "Multi-provider, privacy-first AI assistant with intelligent model routing and a chat + system status UI.",
    keyPoints: [
      "Chat interface with system status panels",
      "Multi-provider routing with intelligent selection",
      "FastAPI backend (Python)",
      "Next.js frontend (React/TypeScript)",
      "Cloudflare edge + Vercel frontend",
      "Docker + Terraform infrastructure",
      "Canonical repository: github.com/fuaadabdullah/goblinos-assistant"
    ]
  },
  {
    slug: "personal-portfolio-site",
    title: "Personal Portfolio & Services Site",
    summary: "Modern portfolio website showcasing projects with excellent performance and accessibility scores.",
    keyPoints: [
      "Next.js 16 with App Router",
      "Lighthouse 100/100 accessibility",
      "MDX-powered blog system",
      "Tailwind CSS styling",
      "Vercel deployment",
      "SEO optimized"
    ]
  },
  {
    slug: "elbey-projects",
    title: "Elbey Projects Website",
    summary:
      "Customer website for a mobile mechanic business, built as a fast, multi-page marketing site with clean UX and SEO-ready structure.",
    keyPoints: [
      "Next.js App Router + TypeScript",
      "Tailwind CSS theme and responsive layout",
      "Multi-page site: services, gallery, FAQ, blog, legal pages",
      "Mobile-first navigation and clear CTAs",
      "Deployed on Vercel",
      "Performance + SEO focused",
      "Canonical repository: github.com/fuaadabdullah/marcus-website"
    ]
  },
  {
    slug: "gradem8-hf-space-2",
    title: "Gradem8 — HF Space 2",
    summary: "Integration demo connecting a Next.js UI to a Hugging Face Space for model-hosting workflows.",
    keyPoints: [
      "Hugging Face Spaces integration demo",
      "Next.js + TypeScript frontend",
      "Model-hosting and inference workflow exploration",
      "Deployed on Vercel",
      "Canonical repository: github.com/fuaadabdullah/gradem8-hf-space-2"
    ]
  },
  {
    slug: "shopmind-ai",
    title: "ShopMindAI",
    summary:
      "Automotive diagnostic assistant that turns VIN/OBD/symptom intake into ranked, testable repair guidance with production monitoring endpoints.",
    keyPoints: [
      "FastAPI backend with typed schemas and modular service layer",
      "Structured intake for VIN, OBD codes, and free-text symptoms",
      "Ranked likely causes plus confirmatory tests",
      "Operational health and metrics endpoints (`/health`, `/metrics`)",
      "Azure App Service deployment",
      "Canonical repository: github.com/fuaadabdullah/shopmind-ai"
    ]
  }
];
