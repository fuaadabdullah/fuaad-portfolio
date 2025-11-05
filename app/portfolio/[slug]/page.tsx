import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import projects, { Project } from "@/data/projects";
import Badge from "@/components/Badge";

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
        <svg 
          className="w-4 h-4 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
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
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 px-4 py-2 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
          {project.links?.source && (
            <a
              href={project.links.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/15 px-4 py-2 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
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
                <svg 
                  className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
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
                <svg 
                  className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                  />
                </svg>
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
                <svg 
                  className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                  />
                </svg>
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
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          Back to Portfolio
        </Link>
      </footer>
    </article>
  );
}
