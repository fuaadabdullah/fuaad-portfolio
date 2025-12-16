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

  // Intent detection
  let intent = 'CASUAL';
  if (lower.includes('experience') || lower.includes('background') || lower.includes('resume') ||
      lower.includes('qualifications') || lower.includes('education') || lower.includes('work history')) {
    intent = 'RECRUITER';
  } else if (lower.includes('pricing') || lower.includes('cost') || lower.includes('hire') ||
             lower.includes('services') || lower.includes('availability') || lower.includes('project') ||
             lower.includes('work with') || lower.includes('commission')) {
    intent = 'CLIENT';
  } else if (lower.includes('code') || lower.includes('architecture') || lower.includes('tech') ||
             lower.includes('implementation') || lower.includes('framework') || lower.includes('api') ||
             lower.includes('database') || lower.includes('deployment')) {
    intent = 'DEVELOPER';
  }

  // FAQ matches
  const matchedFaq = faq.find(f =>
    f.trigger.some(t => lower.includes(t))
  );

  // Blog matches
  const matchedBlog = blogContent.find(b =>
    lower.includes(b.slug) || lower.includes(b.title.toLowerCase())
  );

  // Project matches
  const matchedProject = projectContent.find(p =>
    lower.includes(p.slug) || lower.includes(p.title.toLowerCase())
  );

  // Determine the best action based on intent and matches
  let action = '';
  if (intent === 'RECRUITER') {
    action = 'Focus on professional background and direct to resume/about page. Suggest resume download for detailed experience.';
  } else if (intent === 'CLIENT') {
    action = 'Focus on services and deliverables, direct to contact or services page. Push serious inquiries to email/LinkedIn.';
  } else if (intent === 'DEVELOPER') {
    action = 'Focus on technical details and direct to relevant project or GitHub repo. Offer deeper technical breakdowns.';
  } else if (matchedProject) {
    action = `Direct to project: ${matchedProject.slug}. Link to GitHub repo if available.`;
  } else if (matchedBlog) {
    action = `Direct to blog: ${matchedBlog.slug}. Keep it brief.`;
  } else if (matchedFaq) {
    action = 'Provide FAQ answer and suggest next steps. Keep under 3 sentences.';
  } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('work')) {
    action = 'Direct to contact information. Push to email or LinkedIn for serious inquiries.';
  } else if (lower.includes('about') || lower.includes('background') || lower.includes('experience')) {
    action = 'Direct to about page. Suggest resume download for detailed background.';
  } else {
    action = 'Provide overview and direct to relevant section. Be a traffic router, not a conversationalist.';
  }

  // Build context with intent and action guidance (include site facts for richer responses)
  const contextParts = [
    `Site: ${siteFacts.trim().replace(/\n+/g, ' ')}`,
    `Intent: ${intent}`,
    matchedFaq ? `FAQ: ${matchedFaq.answer}` : '',
    matchedBlog ? `Blog: ${matchedBlog.title} - ${matchedBlog.summary}` : '',
    matchedProject ? `Project: ${matchedProject.title} - ${matchedProject.summary}` : '',
    `Action: ${action}`
  ].filter(Boolean);

  return `Context: ${contextParts.join(' | ')}
User question: ${userPrompt}
Remember: 3-6 sentences max. Use bullet points for lists. One idea per response. Say "I don't know" when appropriate. Be a traffic router. Kill parasocial energy. Front-load credibility. Classify intent (${intent}). Respond accordingly. End with specific direction to about page, project page, contact, or next page.`;
}