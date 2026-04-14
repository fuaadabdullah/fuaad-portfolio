export interface Project {
  slug: string;
  category?: "personal" | "customer";
  title: string;
  tagline: string;
  description: string;
  results: ResultMetric[];
  tech: string[];
  links?: { live?: string; source?: string };
  proofMedia?: ProofMediaItem[];
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
  architectureHighlights?: string[];
  // Case study fields
  problem?: string;
  audienceAndStakes?: string;
  approach?: string;
  tradeoffs?: string;
  impact?: string;
}

export interface ResultMetric {
  label: string;
  value: string;
  sourceLabel: string;
  timeframe?: string;
}

export interface ProofMediaItem {
  type: "gif" | "image";
  src: string;
  width: number;
  height: number;
  alt: string;
  status: "ready" | "pending";
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
    results: [
      {
        label: "fewer position-size mistakes",
        value: "~90%",
        sourceLabel: "user-reported",
        timeframe: "post-launch",
      },
      {
        label: "faster sizing decisions",
        value: "~50%",
        sourceLabel: "user-reported",
        timeframe: "live sessions",
      },
      {
        label: "build to production",
        value: "4 weeks",
        sourceLabel: "delivery scope",
      },
    ],
    proofMedia: [
      {
        type: "gif",
        src: "pending:rizzk-calculator-demo",
        width: 1280,
        height: 720,
        alt: "RIZZK calculator interaction demo",
        status: "pending",
      },
      {
        type: "image",
        src: "/rizzk-desktop-screenshot.png",
        width: 1920,
        height: 1080,
        alt: "RIZZK desktop risk calculator view",
        status: "ready",
      },
      {
        type: "image",
        src: "/rizzk-mobile-screenshot.png",
        width: 375,
        height: 812,
        alt: "RIZZK mobile position-sizing view",
        status: "ready",
      },
    ],
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
    results: [
      {
        label: "deployment layers integrated",
        value: "3",
        sourceLabel: "deployment architecture",
      },
      {
        label: "observable workflow views",
        value: "4",
        sourceLabel: "product walkthrough",
      },
      {
        label: "core technologies shipped",
        value: "12",
        sourceLabel: "stack inventory",
      },
    ],
    proofMedia: [
      {
        type: "gif",
        src: "pending:goblin-assistant-demo",
        width: 1280,
        height: 720,
        alt: "GoblinOS Assistant demo walkthrough",
        status: "pending",
      },
      {
        type: "image",
        src: "/projects/goblin-assistant-main-interface.png",
        width: 1280,
        height: 850,
        alt: "Goblin Assistant main interface",
        status: "ready",
      },
      {
        type: "image",
        src: "pending:goblin-assistant-provider-status",
        width: 1280,
        height: 850,
        alt: "Provider status panel view",
        status: "pending",
      },
      {
        type: "image",
        src: "pending:goblin-assistant-workflow-execution",
        width: 1280,
        height: 850,
        alt: "Workflow execution screen",
        status: "pending",
      },
      {
        type: "image",
        src: "pending:goblin-assistant-cost-tracking",
        width: 1280,
        height: 850,
        alt: "Cost tracking dashboard",
        status: "pending",
      },
    ],
    image: {
      src: "/projects/goblin-assistant-main-interface.png",
      width: 1280,
      height: 850,
      alt: "Goblin Assistant home screen with navigation and quick actions",
    },
    gallery: [
      {
        src: "/projects/goblin-assistant-main-interface.png",
        width: 1280,
        height: 850,
        alt: "Goblin Assistant chat and status panels in the main product view",
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
    architectureHighlights: [
      "FastAPI backend with typed request/response contracts and modular provider routing.",
      "PostgreSQL for durable records plus Redis for fast cache and transient state.",
      "Observable status panels surface routing decisions, provider health, and latency.",
      "Cloudflare edge in front of UI/API paths to improve resilience and traffic control.",
      "Docker + Terraform keep runtime and infra changes reproducible across environments.",
      "Fly.io + Vercel split workload concerns between backend runtime and frontend delivery.",
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
    results: [
      {
        label: "Lighthouse score (perf, a11y, SEO)",
        value: "100/100",
        sourceLabel: "performance audit",
      },
      {
        label: "global load time",
        value: "<2s",
        sourceLabel: "performance audit",
      },
      {
        label: "build + launch timeline",
        value: "2 weeks",
        sourceLabel: "delivery scope",
      },
    ],
    proofMedia: [
      {
        type: "gif",
        src: "pending:personal-portfolio-site-demo",
        width: 1280,
        height: 720,
        alt: "Portfolio navigation and project browsing demo",
        status: "pending",
      },
      {
        type: "image",
        src: "/projects/personal-portfolio-hero.webp",
        width: 1600,
        height: 900,
        alt: "Personal portfolio homepage hero",
        status: "ready",
      },
      {
        type: "image",
        src: "/projects/personal-portfolio-feature-01.webp",
        width: 1600,
        height: 900,
        alt: "Portfolio project index and case study cards",
        status: "ready",
      },
      {
        type: "image",
        src: "/projects/personal-portfolio-feature-02.webp",
        width: 1600,
        height: 900,
        alt: "Portfolio resume and downloadable PDF route",
        status: "ready",
      },
    ],
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
    results: [
      {
        label: "customer-facing pages shipped",
        value: "7",
        sourceLabel: "delivery scope",
      },
      {
        label: "delivery timeline",
        value: "1 week",
        sourceLabel: "delivery scope",
      },
      {
        label: "core booking conversion paths",
        value: "3",
        sourceLabel: "ux scope",
      },
    ],
    proofMedia: [
      {
        type: "image",
        src: "/projects/elbey-projects-home.png",
        width: 1440,
        height: 1080,
        alt: "Elbey Projects homepage and primary CTA",
        status: "ready",
      },
      {
        type: "image",
        src: "/projects/elbey-projects-gallery.png",
        width: 1440,
        height: 1080,
        alt: "Elbey Projects gallery view with recent repair work",
        status: "ready",
      },
      {
        type: "image",
        src: "/projects/elbey-projects-contact.png",
        width: 1440,
        height: 1080,
        alt: "Elbey Projects contact and booking form",
        status: "ready",
      },
    ],
    image: {
      src: "/projects/elbey-projects-home.png",
      width: 1440,
      height: 1080,
      alt: "Elbey Projects homepage with booking CTA and service navigation",
    },
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
    slug: "gradem8",
    title: "GradeM8 — AI Grading Assistant",
    tagline: "AI-powered document grading with rubric-based feedback using Llama 2.",
    description: `GradeM8 is an AI-powered grading assistant that automates document assessment using HuggingFace's Llama 2 70B model. Teachers and graders can upload student submissions (PDF, DOCX, images) along with a rubric, and receive detailed feedback with scores, strengths, areas for improvement, and rubric breakdowns.

Built with Gradio for an intuitive web interface and deployed on HuggingFace Spaces, the app features OCR support for scanned documents, batch processing for multiple submissions, and comprehensive error handling. The modular architecture separates AI routing, document extraction, and UI concerns for maintainability.`,
    tech: [
      "Python",
      "Gradio",
      "HuggingFace Inference API",
      "Llama 2 70B",
      "PyMuPDF",
      "python-docx",
      "httpx",
      "pytest",
      "HuggingFace Spaces",
    ],
    links: {
      live: "https://huggingface.co/spaces/fuaadabdullah1/gradem8",
      source: "https://github.com/fuaadabdullah/gradem8-hf-space-2",
    },
    results: [
      {
        label: "routine grading time reduced",
        value: "60-70%",
        sourceLabel: "user-reported",
      },
      {
        label: "unit tests in suite",
        value: "285+",
        sourceLabel: "test suite",
      },
      {
        label: "document formats supported",
        value: "4",
        sourceLabel: "product scope",
      },
    ],
    proofMedia: [
      {
        type: "gif",
        src: "pending:gradem8-demo",
        width: 1280,
        height: 720,
        alt: "GradeM8 grading workflow demo",
        status: "pending",
      },
      {
        type: "image",
        src: "/projects/gradem8-hf-space-2-screenshot.png",
        width: 1280,
        height: 720,
        alt: "GradeM8 grading interface",
        status: "ready",
      },
      {
        type: "image",
        src: "pending:gradem8-batch-workflow",
        width: 1280,
        height: 720,
        alt: "GradeM8 batch grading queue view",
        status: "pending",
      },
    ],
    image: {
      src: "/projects/gradem8-hf-space-2-screenshot.png",
      width: 1280,
      height: 720,
      alt: "GradeM8 AI grading interface showing document upload and rubric input",
      priority: false,
    },
    features: [
      "AI grading powered by Llama 2 70B via HuggingFace Inference API",
      "Multi-format document support: PDF, DOCX, DOC, and image files",
      "OCR fallback for scanned documents using DeepSeek-OCR",
      "Batch processing with concurrent grading and progress tracking",
      "Detailed rubric-based feedback with score breakdowns",
      "Responsive Gradio UI with accessibility features",
      "Comprehensive test suite with 285+ unit tests",
    ],
    challenges: [
      "Parsing diverse document formats reliably (scanned PDFs, legacy .doc files)",
      "Handling HuggingFace API rate limits and model loading delays gracefully",
      "Extracting structured JSON from LLM responses with robust fallback parsing",
      "Designing a UI that accommodates both single and batch grading workflows",
    ],
    learnings: [
      "HuggingFace Inference API provides good Llama 2 access without GPU infrastructure",
      "Gradio's component model works well for rapid AI app prototyping",
      "Async patterns in Python significantly improve batch processing throughput",
      "Comprehensive test coverage catches edge cases in document parsing early",
    ],
    timeline: "3 weeks",
    role: "Solo Developer",
    problem:
      "Manual grading is time-consuming and inconsistent. Teachers need a tool that can provide detailed, rubric-based feedback quickly while maintaining quality.",
    audienceAndStakes:
      "Teachers, teaching assistants, and graders who evaluate written submissions. Inconsistent or delayed feedback affects student learning outcomes and instructor workload.",
    approach:
      "Built a Python application using Gradio for the UI and HuggingFace Inference API for Llama 2 access. Implemented modular document extraction (PDF, DOCX, images), async batch processing, and structured JSON parsing for reliable feedback generation.",
    tradeoffs:
      "Chose HuggingFace Spaces over custom deployment for zero infrastructure management. Accepted API latency trade-off for simplified hosting and automatic scaling.",
    impact:
      "Reduces grading time by 60-70% for routine assignments. Provides consistent, detailed feedback that teachers can review and customize. 285 unit tests ensure reliability across document types.",
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
    results: [
      {
        label: "production health endpoints",
        value: "2",
        sourceLabel: "operational scope",
      },
      {
        label: "structured intake inputs",
        value: "3",
        sourceLabel: "request schema",
      },
      {
        label: "documented workflow screens",
        value: "3",
        sourceLabel: "demo coverage",
      },
    ],
    proofMedia: [
      {
        type: "gif",
        src: "pending:shopmind-ai-demo",
        width: 1280,
        height: 720,
        alt: "ShopMindAI diagnostic walkthrough demo",
        status: "pending",
      },
      {
        type: "image",
        src: "/projects/shopmind-ai-hero.webp",
        width: 1600,
        height: 1000,
        alt: "ShopMindAI diagnostic assistant hero",
        status: "ready",
      },
      {
        type: "image",
        src: "/projects/shopmind-ai-feature-01.webp",
        width: 1600,
        height: 1000,
        alt: "ShopMindAI intake flow for VIN and OBD codes",
        status: "ready",
      },
      {
        type: "image",
        src: "/projects/shopmind-ai-feature-02.webp",
        width: 1600,
        height: 1000,
        alt: "ShopMindAI ranked likely causes and tests",
        status: "ready",
      },
    ],
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
