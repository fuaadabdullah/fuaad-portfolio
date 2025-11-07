import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ExternalLink, Github, Check, Zap, Lightbulb } from "lucide-react";
import projects, { Project } from "@/data/projects";
import Badge from "@/components/Badge";
import { buttonClasses } from "@/components/Button";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found — Fuaad Abdullah",
    };
  }

  return {
    title: `${project.title} — Fuaad Abdullah`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Fuaad Abdullah`,
      description: project.tagline,
      images: project.image ? [project.image.src] : ["/og-default.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Fuaad Abdullah`,
      description: project.tagline,
      images: project.image ? [project.image.src] : ["/og-default.png"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      {/* Back navigation */}
      <Link 
        href="/portfolio" 
        className="inline-flex items-center text-sm text-white/60 hover:text-white transition-colors mb-8"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back to Portfolio
      </Link>

      {/* Project header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
          {project.title}
        </h1>
        <p className="text-xl text-white/80 mb-6">{project.tagline}</p>
        
        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6" aria-label="Technologies used">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        {/* Meta info */}
        {(project.timeline || project.role) && (
          <div className="flex flex-wrap gap-6 text-sm text-white/60 mb-6">
            {project.timeline && (
              <div>
                <span className="font-medium text-white/80">Timeline:</span> {project.timeline}
              </div>
            )}
            {project.role && (
              <div>
                <span className="font-medium text-white/80">Role:</span> {project.role}
              </div>
            )}
          </div>
        )}

        {/* Project links */}
        <div className="flex flex-wrap gap-3">
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("success", "sm")}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {project.links?.source && (
            <a
              href={project.links.source}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("secondary", "sm")}
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          )}
        </div>
      </header>

      {/* Project image */}
      {project.image && (
        <div className="mb-12 rounded-xl overflow-hidden border border-white/10">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            priority={project.image.priority}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Description */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-green-500">Overview</h2>
        <div className="prose prose-invert max-w-none">
          {project.description.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-white/80 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Features */}
      {project.features && project.features.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-green-500">Key Features</h2>
          <ul className="space-y-3">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Mobile view (RIZZK only) */}
      {project.slug === 'rizzk-calculator' && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-green-500">Mobile Responsive</h2>
          <p className="text-white/80 mb-6">
            Fully optimized for mobile trading. Make position sizing decisions on the go with the same powerful calculations.
          </p>
          <div className="flex justify-center">
            <div className="max-w-sm rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/rizzk-mobile-screenshot.png"
                alt="RIZZK Calculator mobile interface"
                width={375}
                height={812}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>
      )}

      {/* Challenges */}
      {project.challenges && project.challenges.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-green-500">Technical Challenges</h2>
          <ul className="space-y-3">
            {project.challenges.map((challenge, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">{challenge}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Learnings */}
      {project.learnings && project.learnings.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-green-500">Key Learnings</h2>
          <ul className="space-y-3">
            {project.learnings.map((learning, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">{learning}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Bottom navigation */}
      <footer className="mt-16 pt-8 border-t border-white/10">
        <Link 
          href="/portfolio" 
          className="inline-flex items-center text-sm text-white/60 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </Link>
      </footer>
    </article>
  );
}
