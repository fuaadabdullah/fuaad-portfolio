import ProjectCard from "@/components/ProjectCard";
import projects from "@/data/projects";

export const metadata = {
  title: "Portfolio — Fuaad Abdullah",
  description: "A few things I've shipped: RIZZK Calculator for day traders, web apps with Next.js and FastAPI, and more projects focused on clean UX and real-world utility.",
  openGraph: {
    title: "Portfolio — Fuaad Abdullah",
    description: "Selected projects including RIZZK Calculator, a production-grade risk management tool for day traders, and other web applications.",
    images: ["/og-default.png"]
  }
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
