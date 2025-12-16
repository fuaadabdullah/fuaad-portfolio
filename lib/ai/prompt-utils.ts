// Prompt optimization and enrichment utilities
import { siteFacts, faq } from '@/data/portfolio_knowledge';
import { blogContent, projectContent } from '@/data/site_content';

export function optimizePrompt(userPrompt: string): string {
  // Remove unnecessary words, keep context concise
  const optimized = userPrompt
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 500); // Limit prompt length

  return optimized;
}

export async function enrichPrompt(userPrompt: string): Promise<string> {
  const lower = userPrompt.toLowerCase();

  // FAQ matches (keep concise)
  const matchedFaq = faq.find(f =>
    f.trigger.some(t => lower.includes(t))
  );
  const faqText = matchedFaq ? `FAQ: ${matchedFaq.answer}` : '';

  // Blog matches (keep concise)
  const matchedBlog = blogContent.find(b =>
    lower.includes(b.slug) || lower.includes(b.title.toLowerCase())
  );
  const blogText = matchedBlog
    ? `Blog: ${matchedBlog.title} - ${matchedBlog.summary}`
    : '';

  // Project matches (keep concise)
  const matchedProject = projectContent.find(p =>
    lower.includes(p.slug) || lower.includes(p.title.toLowerCase())
  );
  const projectText = matchedProject
    ? `Project: ${matchedProject.title} - ${matchedProject.summary}`
    : '';

  // Build compact context
  const contextParts = [
    `Facts: ${siteFacts}`,
    faqText,
    blogText,
    projectText
  ].filter(Boolean);

  return `Portfolio context: ${contextParts.join(' | ')}
Question: ${userPrompt}`;
}