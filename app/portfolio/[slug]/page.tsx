import { type Metadata } from "next";
import { notFound } from "next/navigation";
import projects from "@/data/projects";
import { ProjectBackLink } from "@/components/portfolio/ProjectBackLink";
import { ProjectHeader } from "@/components/portfolio/ProjectHeader";
import { ProjectHeroImage } from "@/components/portfolio/ProjectHeroImage";
import { ProjectOverview } from "@/components/portfolio/ProjectOverview";
import { ProjectCaseStudy } from "@/components/portfolio/ProjectCaseStudy";
import { ProjectBulletSection } from "@/components/portfolio/ProjectBulletSection";
import { ProjectRizzkMobile } from "@/components/portfolio/ProjectRizzkMobile";
import { ProjectFooterNav } from "@/components/portfolio/ProjectFooterNav";
import Container from "@/components/layout/Container";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found — Fuaad Abdullah" };
  }

  const images = project.image ? [project.image.src] : ["/og-default.png"];
  const title = `${project.title} — Fuaad Abdullah`;

  return {
    title,
    description: project.tagline,
    openGraph: { title, description: project.tagline, images },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.tagline,
      images,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <Container className="py-16">
      <article className="mx-auto max-w-4xl">
        <ProjectBackLink />
        <ProjectHeader project={project} />
        <ProjectHeroImage project={project} />
        <ProjectOverview project={project} />
        <ProjectCaseStudy project={project} />

        <ProjectBulletSection
          title="Key Features"
          items={project.features}
          icon={{ colorClass: "text-green-500", pathD: "M5 13l4 4L19 7" }}
        />

        <ProjectRizzkMobile project={project} />

        <ProjectBulletSection
          title="Technical Challenges"
          items={project.challenges}
          icon={{
            colorClass: "text-amber-500",
            pathD: "M13 10V3L4 14h7v7l9-11h-7z",
          }}
        />

        <ProjectBulletSection
          title="Key Learnings"
          items={project.learnings}
          icon={{
            colorClass: "text-blue-500",
            pathD:
              "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
          }}
        />

        <ProjectFooterNav />
      </article>
    </Container>
  );
}
