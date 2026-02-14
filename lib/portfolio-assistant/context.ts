type FaqEntry = { trigger: string[]; answer: string };
type ContentEntry = { slug: string; title: string; summary: string; keyPoints: string[] };

function findFaq(lower: string, faq: FaqEntry[]): FaqEntry | null {
  for (const f of faq) {
    for (const t of f.trigger) {
      if (lower.includes(t)) return f;
    }
  }
  return null;
}

function findContentMatch(lower: string, items: ContentEntry[]): ContentEntry | null {
  for (const item of items) {
    if (lower.includes(item.slug)) return item;
    if (lower.includes(item.title.toLowerCase())) return item;
  }
  return null;
}

function fmtKeyPoints(points: string[]): string {
  return points.join(", ");
}

export function buildAssistantContext(input: {
  prompt: string;
  siteFacts: string;
  faq: FaqEntry[];
  blogContent: ContentEntry[];
  projectContent: ContentEntry[];
}): string {
  const lower = input.prompt.toLowerCase();

  const matchedFaq = findFaq(lower, input.faq);
  const faqText = matchedFaq ? `FAQ Answer: ${matchedFaq.answer}` : "";

  const matchedBlog = findContentMatch(lower, input.blogContent);
  const blogText = matchedBlog
    ? `Blog: ${matchedBlog.title}\nSummary: ${matchedBlog.summary}\nKey points: ${fmtKeyPoints(matchedBlog.keyPoints)}\n`
    : "";

  const matchedProject = findContentMatch(lower, input.projectContent);
  const projectText = matchedProject
    ? `Project: ${matchedProject.title}\nSummary: ${matchedProject.summary}\nKey points: ${fmtKeyPoints(matchedProject.keyPoints)}\n`
    : "";

  return `
Portfolio Facts:
${input.siteFacts}

${faqText}

${blogText}

${projectText}

User: ${input.prompt}
Assistant:
`;
}

