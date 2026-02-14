import ProjectCard from "@/components/ProjectCard";
import projects from "@/data/projects";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Portfolio — Fuaad Abdullah",
  description: "A few things I've shipped: RIZZK Calculator for day traders, GoblinOS Assistant (multi-provider AI routing), and web apps focused on clean UX and real-world utility.",
  openGraph: {
    title: "Portfolio — Fuaad Abdullah",
    description: "Selected projects including RIZZK Calculator, GoblinOS Assistant, and other web applications.",
    images: ["/og-default.png"]
  }
};

export default function PortfolioPage() {
  return (
    <Container className="py-16">
      <PageHeader title="Portfolio" description="A few things I’ve shipped." />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map(p => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </Container>
  );
}
