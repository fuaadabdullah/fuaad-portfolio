import Link from "next/link";
import Button from "./Button";

interface BlogCTAProps {
  variant?: "services" | "portfolio" | "contact";
}

export function BlogCTA({ variant = "services" }: BlogCTAProps) {
  const configs = {
    services: {
      title: "Want help building tools like this?",
      description: "I help founders and teams ship focused MVPs in 2 weeks. From idea to production.",
      primaryText: "View Services",
      primaryHref: "/services",
      secondaryText: "See Portfolio",
      secondaryHref: "/portfolio",
    },
    portfolio: {
      title: "See what I've built",
      description: "Check out my portfolio for more production-ready projects and case studies.",
      primaryText: "View Portfolio",
      primaryHref: "/portfolio",
      secondaryText: "Get in Touch",
      secondaryHref: "/services#contact",
    },
    contact: {
      title: "Let's work together",
      description: "Building something ambitious? I'd love to help you ship it.",
      primaryText: "Contact Me",
      primaryHref: "/services#contact",
      secondaryText: "View Services",
      secondaryHref: "/services",
    },
  };

  const config = configs[variant];

  return (
    <div className="my-12 p-8 bg-gradient-to-br from-[#16a34a]/10 to-transparent border border-[#16a34a]/20 rounded-lg">
      <h3 className="text-2xl font-bold mb-2">{config.title}</h3>
      <p className="text-white/70 mb-6">{config.description}</p>
      <div className="flex flex-wrap gap-4">
        <Link href={config.primaryHref}>
          <Button variant="primary">{config.primaryText}</Button>
        </Link>
        <Link href={config.secondaryHref}>
          <Button variant="secondary">{config.secondaryText}</Button>
        </Link>
      </div>
    </div>
  );
}
