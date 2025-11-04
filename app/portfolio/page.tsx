import ProjectCard from "@/components/ProjectCard";
import projects from "@/data/projects";

export const metadata = {
  title: "Portfolio — Fuaad Abdullah",
  description: "Selected projects and demos."
};

export default function PortfolioPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Portfolio</h1>
      <p className="text-white/80 mt-3">A few things I’ve shipped.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {projects.map(p => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
