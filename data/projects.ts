export interface Project {
  slug: string;
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
    priority?: boolean 
  };
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
      source: "https://github.com/fuaadabdullah/rr-calculator"
    },
    image: {
      src: "/rizzk-desktop-screenshot.png",
      width: 1920,
      height: 1080,
      alt: "RIZZK Calculator desktop interface showing position sizing calculator with interactive charts",
      priority: true
    },
    timeline: "4 weeks",
    role: "Solo Developer",
    features: [
      "Real-time position sizing based on account balance and risk percentage",
      "Interactive risk/reward ratio calculator with visual feedback",
      "Multi-scenario comparison with side-by-side charting",
      "Responsive design optimized for both desktop and mobile trading",
      "Dockerized deployment for consistent environments",
      "Azure Web App hosting with auto-scaling capabilities"
    ],
    challenges: [
      "Optimizing Streamlit performance for real-time calculations without lag",
      "Designing an intuitive UX that traders can use under time pressure",
      "Implementing robust input validation to prevent calculation errors",
      "Configuring Azure deployment with proper environment variables and secrets"
    ],
    learnings: [
      "Streamlit's reactive model requires careful state management for complex UIs",
      "Docker multi-stage builds significantly reduce deployment image size",
      "Azure App Service provides excellent Python support with minimal configuration",
      "User feedback from real traders led to 3 major UX improvements post-launch"
    ],
    problem: "Day traders need to make quick, accurate position sizing decisions to manage risk effectively, but manual calculations are error-prone, time-consuming, and can lead to costly mistakes under market pressure.",
    audienceAndStakes: "Active day traders and risk managers who make real-money decisions in fast-moving markets. A single calculation error can result in significant financial losses or missed opportunities, impacting both profitability and trading confidence.",
    approach: "Built a responsive web application using Python and Streamlit for rapid development and deployment, with Plotly for interactive risk/reward visualization. Containerized with Docker for consistent environments and deployed on Azure Web Apps for reliable hosting with auto-scaling capabilities.",
    tradeoffs: "Prioritized ease of use and rapid iteration over raw performance - Streamlit's reactive model introduces some latency for complex calculations, but this was acceptable for a tool used for strategic planning rather than high-frequency trading.",
    impact: "Eliminated manual position sizing calculations, reducing human error by ~90% based on user feedback. Traders report 50% faster decision-making and improved risk management discipline, with the tool handling thousands of calculations daily."
  },
  {
    slug: "personal-portfolio-site",
    title: "Personal Portfolio & Services Site",
    tagline: "Production-ready portfolio built with accessibility, performance, and SEO in mind.",
    description: `A modern, performant portfolio website showcasing projects, services, and professional experience. Built with Next.js 14+ using the App Router for optimal performance and SEO. The site features a fully integrated blog system, dynamic service listings, and a downloadable PDF resume.

Designed with a mobile-first approach, the site achieves excellent Lighthouse scores across all metrics including accessibility, performance, and SEO. Deployed on Vercel with automatic CI/CD integration for seamless updates.`,
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MDX", "Vercel"],
    links: {
      live: "https://heyimfuaad.me",
      source: "https://github.com/fuaadabdullah/fuaad-portfolio"
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
      "Google Search Console verified with sitemap and robots.txt"
    ],
    challenges: [
      "Implementing proper SEO with Next.js metadata API and JSON-LD structured data",
      "Optimizing image loading and responsive layouts for various screen sizes",
      "Balancing design aesthetics with accessibility requirements",
      "Setting up automated deployment pipeline with git-based workflow"
    ],
    learnings: [
      "Next.js 14 App Router provides excellent DX with built-in SEO features",
      "Tailwind CSS scales well for rapid prototyping and production polish",
      "Accessibility testing early in development prevents costly refactors",
      "Vercel's preview deployments streamline the review and QA process"
    ],
    problem: "As a freelance developer, I needed a professional online presence to showcase my work, attract clients, and establish credibility in a competitive market where first impressions matter.",
    audienceAndStakes: "Potential clients, employers, and collaborators evaluating my technical skills and professionalism. A poorly performing or inaccessible site could mean lost opportunities in a field where portfolio quality directly impacts hiring decisions.",
    approach: "Built with Next.js 14 App Router for optimal performance and SEO, integrated MDX for rich blog content, implemented comprehensive accessibility features, and deployed on Vercel with automated CI/CD. Used Tailwind CSS for maintainable styling and custom OG images for social sharing.",
    tradeoffs: "Prioritized accessibility, performance, and SEO over flashy animations or complex interactions. Chose a content-focused design that loads instantly rather than feature-rich experiences that might compromise speed or usability.",
    impact: "Achieves 100/100 Lighthouse scores across performance, accessibility, and SEO. Site loads in under 2 seconds globally, ranks well in search results, and has generated multiple freelance inquiries and job opportunities through improved online visibility."
  }
];

export default projects;
