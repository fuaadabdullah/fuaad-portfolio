import type { Project } from "@/data/projects";

function splitParagraphs(text: string): string[] {
  return text
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
}

export function ProjectOverview({ project }: { project: Project }) {
  const paragraphs = splitParagraphs(project.description);
  if (paragraphs.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-green-500">Overview</h2>
      <div className="prose prose-invert max-w-none">
        {paragraphs.map((paragraph, idx) => (
          <p key={idx} className="text-white/80 leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

