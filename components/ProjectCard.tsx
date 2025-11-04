import Link from "next/link";
type Project = {
  slug: string;
  title: string;
  tagline: string;
  tech: string[];
  links?: { live?: string; source?: string };
};
export default function ProjectCard({ project }: { project: Project }){
  return (
    <article className="rounded-2xl border border-white/10 p-6">
      <h3 className="text-xl font-semibold">{project.title}</h3>
      <p className="text-white/80 mt-2">{project.tagline}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {project.tech.map(t => <span key={t} className="rounded-full bg-white/10 px-2 py-1">{t}</span>)}
      </div>
      <div className="mt-4 flex gap-3">
        {project.links?.live && <a className="rounded-lg bg-white/10 px-3 py-1.5" href={project.links.live} target="_blank" rel="noreferrer">Live</a>}
        {project.links?.source && <a className="rounded-lg bg-white/10 px-3 py-1.5" href={project.links.source} target="_blank" rel="noreferrer">Source</a>}
        <Link className="rounded-lg bg-white/10 px-3 py-1.5" href={`/portfolio/${project.slug}`}>Details</Link>
      </div>
    </article>
  );
}
