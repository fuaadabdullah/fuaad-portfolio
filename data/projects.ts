export interface Project {
  slug: string;
  category?: "personal" | "customer";
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  links?: { live?: string; source?: string };
  image?: {
    src: string;
    width: number;
    height: number;
    alt: string;
    priority?: boolean;
  };
  gallery?: {
    src: string;
    width: number;
    height: number;
    alt: string;
  }[];
  features?: string[];
  challenges?: string[];
  learnings?: string[];
  timeline?: string;
  role?: string;
  // Case study fields
  problem?: string;
  audienceAndStakes?: string;
  approach?: string;
  tradeoffs?: string;
  impact?: string;
}

const projects: Project[] = [
  {
    slug: "rizzk-calculator",
    title: "(⌐■_■) RIZZK Calculator 🚀",
    tagline: "Position sizing and risk/reward math with a responsive UI.",
    description: `(⌐■_■) RIZZK Calculator 🚀 is a production-grade risk management tool designed for day traders who need to make quick, accurate position sizing decisions. Built with Python and Streamlit, it provides real-time calculations for stop-loss, take-profit, and position size based on account risk parameters.

The tool eliminates manual calculations and reduces human error in critical trading decisions. It features an intuitive interface with interactive charts powered by Plotly, making complex risk/reward scenarios easy to visualize and understand.`,
    tech: ["Python", "Streamlit", "Plotly", "Docker", "Azure"],
    links: {
      live: "https://rizzk-calculator-demo-eus2-f1.azurewebsites.net",
      source: "https://github.com/fuaadabdullah/rr-calculator",
    },
    image: {
      src: "/rizzk-desktop-screenshot.png",
      width: 1920,
      height: 1080,
      alt: "RIZZK Calculator desktop interface showing position sizing calculator with interactive charts",
      priority: true,
    },
    timeline: "4 weeks",
    role: "Solo Developer",
    features: [
      "Real-time position sizing based on account balance and risk percentage",
      "Interactive risk/reward ratio calculator with visual feedback",
      "Multi-scenario comparison with side-by-side charting",
      "Responsive design optimized for both desktop and mobile trading",
      "Dockerized deployment for consistent environments",
      "Azure Web App hosting with auto-scaling capabilities",
    ],
    challenges: [
      "Optimizing Streamlit performance for real-time calculations without lag",
      "Designing an intuitive UX that traders can use under time pressure",
      "Implementing robust input validation to prevent calculation errors",
      "Configuring Azure deployment with proper environment variables and secrets",
    ],
    learnings: [
      "Streamlit's reactive model requires careful state management for complex UIs",
      "Docker multi-stage builds significantly reduce deployment image size",
      "Azure App Service provides excellent Python support with minimal configuration",
      "User feedback from real traders led to 3 major UX improvements post-launch",
    ],
    problem:
      "Day traders need to make quick, accurate position sizing decisions to manage risk effectively, but manual calculations are error-prone, time-consuming, and can lead to costly mistakes under market pressure.",
    audienceAndStakes:
      "Active day traders and risk managers who make real-money decisions in fast-moving markets. A single calculation error can result in significant financial losses or missed opportunities, impacting both profitability and trading confidence.",
    approach:
      "Built a responsive web application using Python and Streamlit for rapid development and deployment, with Plotly for interactive risk/reward visualization. Containerized with Docker for consistent environments and deployed on Azure Web Apps for reliable hosting with auto-scaling capabilities.",
    tradeoffs:
      "Prioritized ease of use and rapid iteration over raw performance - Streamlit's reactive model introduces some latency for complex calculations, but this was acceptable for a tool used for strategic planning rather than high-frequency trading.",
    impact:
      "Eliminated manual position sizing calculations, reducing human error by ~90% based on user feedback. Traders report 50% faster decision-making and improved risk management discipline, with the tool handling thousands of calculations daily.",
  },
  {
    slug: "goblin-assistant",
    title: "GoblinOS Assistant",
    tagline:
      "A multi-provider, privacy-first AI assistant with observable routing.",
    description: `GoblinOS Assistant is a multi-provider, privacy-first AI assistant with intelligent model routing.

The interface pairs chat with live system status panels so you can see provider health, latency, and routing behavior at a glance. The backend is FastAPI (Python) with a SQL data layer, while the frontend is built in Next.js (React/TypeScript) with Tailwind CSS. Deployment uses Vercel for the UI with Cloudflare at the edge, and Docker + Terraform keep infrastructure repeatable.`,
    tech: [
      "FastAPI",
      "Python",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Redis",
      "Cloudflare",
      "Docker",
      "Terraform",
      "Fly.io",
      "Vercel",
    ],
    links: {
      live: "https://goblin-assistant.vercel.app",
      source: "https://github.com/fuaadabdullah/goblinos-assistant",
    },
    image: {
      src: "/projects/goblin-assistant-main-interface.png",
      width: 1280,
      height: 850,
      alt: "Goblin Assistant home screen with navigation and quick actions",
    },
    gallery: [
      {
        src: "/projects/goblin-assistant-provider-status.png",
        width: 1280,
        height: 850,
        alt: "Goblin Assistant home screen in high contrast mode",
      },
      {
        src: "/projects/goblin-assistant-workflow-execution.png",
        width: 1280,
        height: 850,
        alt: "Guest sandbox view with code editor and output logs",
      },
      {
        src: "/projects/goblin-assistant-orchestration-demo.png",
        width: 1280,
        height: 850,
        alt: "Guest sandbox overview showing the editor layout",
      },
      {
        src: "/projects/goblin-assistant-cost-tracking.png",
        width: 1280,
        height: 850,
        alt: "Help center page with common topics and support chat",
      },
    ],
    timeline: "Ongoing",
    role: "Solo Developer",
    features: [
      "Chat interface paired with live system status panels",
      "Multi-provider routing with observable decision signals",
      "Workflow execution and orchestration tools",
      "Cost tracking and usage visibility by provider",
      "FastAPI backend with structured, typed API surface",
      "Next.js frontend in TypeScript with Tailwind CSS",
      "Cloudflare edge + Docker/Terraform infrastructure",
    ],
    challenges: [
      "Keeping routing behavior explainable while supporting multiple providers",
      "Surfacing system status without overwhelming the core chat UX",
      "Maintaining a clean API contract between FastAPI and the UI",
      "Balancing privacy-first defaults with practical routing flexibility",
    ],
    learnings: [
      "Routing logic needs visibility (status panels) to be trustworthy",
      "Type-safe contracts reduce frontend/backend drift",
      "Cost visibility changes how routing rules are tuned",
      "Infra-as-code keeps deployments reproducible",
    ],
    problem:
      "Single-provider assistants are brittle and hard to control; this needed to be multi-provider, privacy-first, and observable.",
    audienceAndStakes:
      "Developers and power users who want a controllable assistant with dependable routing and clear system status.",
    approach:
      "Built a FastAPI backend with a Next.js UI, surfaced status panels alongside chat, and deployed with Vercel, Fly.io, and Cloudflare. Docker + Terraform keep environments repeatable.",
    tradeoffs:
      "Added routing and observability complexity for flexibility and privacy control, in exchange for more operational setup.",
    impact:
      "A production-ready foundation for a provider-agnostic assistant with transparent routing and cost visibility.",
  },
  {
    slug: "personal-portfolio-site",
    title: "Personal Portfolio & Services Site",
    tagline:
      "Production-ready portfolio built with accessibility, performance, and SEO in mind.",
    description: `A modern, performant portfolio website showcasing projects, services, and professional experience. Built with Next.js 14+ using the App Router for optimal performance and SEO. The site features a fully integrated blog system, dynamic service listings, and a downloadable PDF resume.

Designed with a mobile-first approach, the site achieves excellent Lighthouse scores across all metrics including accessibility, performance, and SEO. Deployed on Vercel with automatic CI/CD integration for seamless updates.`,
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MDX", "Vercel"],
    links: {
      live: "https://heyimfuaad.me",
      source: "https://github.com/fuaadabdullah/fuaad-portfolio",
    },
    timeline: "2 weeks",
    role: "Solo Developer & Designer",
    features: [
      "Server-side rendering with Next.js App Router for optimal performance",
      "MDX-powered blog with syntax highlighting and rich content support",
      "Dynamic service listings with structured data for SEO",
      "Responsive design with Tailwind CSS utility-first approach",
      "Accessibility-first implementation with ARIA labels and semantic HTML",
      "Custom OG images and metadata for social sharing",
      "Contact form integration with Formspree",
      "Google Search Console verified with sitemap and robots.txt",
    ],
    challenges: [
      "Implementing proper SEO with Next.js metadata API and JSON-LD structured data",
      "Optimizing image loading and responsive layouts for various screen sizes",
      "Balancing design aesthetics with accessibility requirements",
      "Setting up automated deployment pipeline with git-based workflow",
    ],
    learnings: [
      "Next.js 14 App Router provides excellent DX with built-in SEO features",
      "Tailwind CSS scales well for rapid prototyping and production polish",
      "Accessibility testing early in development prevents costly refactors",
      "Vercel's preview deployments streamline the review and QA process",
    ],
    problem:
      "As a freelance developer, I needed a professional online presence to showcase my work, attract clients, and establish credibility in a competitive market where first impressions matter.",
    audienceAndStakes:
      "Potential clients, employers, and collaborators evaluating my technical skills and professionalism. A poorly performing or inaccessible site could mean lost opportunities in a field where portfolio quality directly impacts hiring decisions.",
    approach:
      "Built with Next.js 14 App Router for optimal performance and SEO, integrated MDX for rich blog content, implemented comprehensive accessibility features, and deployed on Vercel with automated CI/CD. Used Tailwind CSS for maintainable styling and custom OG images for social sharing.",
    tradeoffs:
      "Prioritized accessibility, performance, and SEO over flashy animations or complex interactions. Chose a content-focused design that loads instantly rather than feature-rich experiences that might compromise speed or usability.",
    impact:
      "Achieves 100/100 Lighthouse scores across performance, accessibility, and SEO. Site loads in under 2 seconds globally, ranks well in search results, and has generated multiple freelance inquiries and job opportunities through improved online visibility.",
  },
  {
    slug: "elbey-projects",
    category: "customer",
    title: "Elbey Projects Website",
    tagline:
      "Customer website for a mobile mechanic business (multi-page, SEO-ready).",
    description: `A customer-facing marketing site for Elbey Projects, a mobile mechanic business.

The goal was simple: make it easy to understand services, build trust quickly, and get people to book — especially on mobile.

Delivered a complete multi-page site (About, Services, Gallery, Contact/booking, FAQ, Blog, and legal pages), built with Next.js App Router and a custom Tailwind theme, and deployed on Vercel.`,
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Lucide",
      "Framer Motion",
      "Vercel",
    ],
    links: {
      live: "https://marcus-website-iof60vvkq-fuaadabdullahs-projects.vercel.app",
      source: "https://github.com/fuaadabdullah/marcus-website",
    },
    image: {
      src: "/projects/elbey-projects-home.png",
      width: 1280,
      height: 850,
      alt: "Elbey Projects homepage showing the hero section and primary calls to action",
    },
    gallery: [
      {
        src: "/projects/elbey-projects-services.png",
        width: 1280,
        height: 850,
        alt: "Elbey Projects services page showing the service catalog layout",
      },
      {
        src: "/projects/elbey-projects-gallery.png",
        width: 1280,
        height: 850,
        alt: "Elbey Projects gallery page showing the media grid",
      },
      {
        src: "/projects/elbey-projects-faq.png",
        width: 1280,
        height: 850,
        alt: "Elbey Projects FAQ page showing expandable questions",
      },
    ],
    timeline: "1 week",
    role: "Full-stack Developer",
    features: [
      "Multi-page marketing site with clear information architecture",
      "Mobile-first navigation and CTA-driven layout",
      "Services catalog, gallery, FAQ, blog, and legal pages",
      "Tailwind theme matching brand colors and typography",
      "Deployed on Vercel for fast global delivery",
    ],
    challenges: [
      "Keeping page content scannable on mobile without sacrificing detail",
      "Balancing animation polish with fast load and layout stability",
      "Structuring pages for SEO and clean internal linking",
    ],
    learnings: [
      "Consistency across page templates matters more than any single page design",
      "Small CTA placements can meaningfully change usability on mobile",
      "A clear IA + fast load beats over-designed interactions for service businesses",
    ],
    problem:
      "A mobile mechanic business needed a modern web presence to explain services clearly, build trust, and convert visitors into bookings.",
    audienceAndStakes:
      "Local customers on mobile searching for repairs and diagnostics. A confusing site means lost leads and missed bookings.",
    approach:
      "Built a multi-page site with Next.js App Router and TypeScript, styled with Tailwind CSS, and deployed on Vercel. Prioritized mobile-first layout, clear CTAs, and a structure that supports SEO and easy navigation.",
    tradeoffs:
      "Kept interactions lightweight to prioritize speed and clarity over heavier animations or complex client-side state.",
    impact:
      "A production-ready customer site that communicates services quickly, supports SEO-friendly navigation, and makes booking straightforward from mobile.",
  },
  {
    slug: "gradem8-hf-space-2",
    title: "Gradem8 — HF Space 2",
    tagline: "Hugging Face Space integration demo",
    description:
      "Demo integrating Gradem8 with a Hugging Face Space for model hosting and inference.",
    tech: ["Next.js", "TypeScript", "Hugging Face Spaces"],
    links: {
      live: "https://gradem8-hf-space-2.vercel.app",
      source: "https://github.com/fuaadabdullah/gradem8-hf-space-2",
    },
    image: {
      src: "/projects/gradem8-hf-space-2-screenshot.png",
      width: 1280,
      height: 720,
      alt: "Gradem8 HF Space demo UI",
      priority: false,
    },
    features: ["Hugging Face integration", "Model inference demo"],
    timeline: "2 weeks",
    role: "Owner / Developer",
  },
  {
    slug: "shopmind-ai",
    title: "ShopMindAI",
    tagline:
      "Automotive diagnostic assistant with ranked repair guidance and production observability.",
    description: `ShopMindAI is an automotive diagnostic assistant built to help technicians and small shops move from symptom notes to structured, testable repair plans.

The platform combines VIN and OBD-code intake, retrieval context, and LLM-supported reasoning to return ranked likely causes plus confirmatory tests. It includes production health and metrics endpoints and is deployed on Azure.`,
    tech: [
      "FastAPI",
      "Python",
      "SQLAlchemy",
      "FAISS",
      "Azure App Service",
      "Prometheus Metrics",
    ],
    links: {
      live: "https://shopmindai-backend.azurewebsites.net",
      source: "https://github.com/fuaadabdullah/shopmind-ai",
    },
    image: {
      src: "/projects/shopmind-ai-hero.webp",
      width: 1600,
      height: 1000,
      alt: "ShopMindAI diagnostic assistant hero view",
      priority: false,
    },
    gallery: [
      {
        src: "/projects/shopmind-ai-feature-01.webp",
        width: 1600,
        height: 1000,
        alt: "ShopMindAI technician intake workflow for VIN, OBD codes, and symptoms",
      },
      {
        src: "/projects/shopmind-ai-feature-02.webp",
        width: 1600,
        height: 1000,
        alt: "ShopMindAI ranked diagnostic response with likely causes and confirmatory tests",
      },
    ],
    features: [
      "Structured intake for VIN, OBD codes, and free-text symptoms",
      "Ranked diagnostic causes with confidence and confirmatory test recommendations",
      "FastAPI API surface with typed request/response schemas",
      "Operational endpoints for uptime (`/health`) and metrics (`/metrics`)",
      "Azure-hosted deployment for recruiter/demo access",
    ],
    challenges: [
      "Balancing strict validation with flexible real-world technician input",
      "Combining retrieval context with model reasoning into actionable outputs",
      "Keeping production observability simple enough for small-team operations",
    ],
    learnings: [
      "Structured response design makes AI outputs far easier to operationalize",
      "Health and metrics endpoints are non-negotiable for production credibility",
      "Input validation quality has a direct effect on output reliability",
    ],
    timeline: "Ongoing",
    role: "Owner / Full-stack Developer",
    problem:
      "Technicians often lose time on inconsistent first-pass troubleshooting from unstructured symptom descriptions.",
    audienceAndStakes:
      "Independent mechanics and small shops where each misdiagnosis increases labor cost, parts waste, and customer downtime.",
    approach:
      "Built a FastAPI application with structured intake, ranking logic, and deployment-safe configuration. Added health and metrics endpoints for production monitoring and deployed on Azure.",
    tradeoffs:
      "Prioritized reliability and clear response structure over a complex front-end experience to keep iteration speed high and output quality measurable.",
    impact:
      "Delivers a production-ready diagnostic workflow demo that turns free-text issues into ranked, testable repair guidance with operational monitoring built in.",
  },
];

export default projects;
