import type { Project } from "@/data/projects";

type Section = { title: string; text: string };

function makeSections(project: Project): Section[] {
  const sections: Array<Section | null> = [
    project.problem ? { title: "The Problem", text: project.problem } : null,
    project.audienceAndStakes
      ? { title: "Audience & Stakes", text: project.audienceAndStakes }
      : null,
    project.approach ? { title: "My Approach", text: project.approach } : null,
    project.tradeoffs ? { title: "Tradeoffs", text: project.tradeoffs } : null,
    project.impact ? { title: "Impact", text: project.impact } : null,
  ];

  return sections.filter((s): s is Section => Boolean(s));
}

export function ProjectCaseStudy({ project }: { project: Project }) {
  const sections = makeSections(project);
  if (sections.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-green-500">Case Study</h2>
      <div className="space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h3 className="text-lg font-medium mb-2 text-white">{s.title}</h3>
            <p className="text-white/80 leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

