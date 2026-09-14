import { faq } from "@/data/portfolio_knowledge";

const defaultReply =
  "I'm here to help you learn about Fuaad's portfolio. Ask about a project, the tech stack, services, or how to get in touch.";

const greetingReply =
  "I can walk you through Fuaad's projects, tech stack, services, or background. Start with a project like GoblinOS, RIZZK, ShopMindAI, Elbey Projects, GradeM8, or the portfolio site.";

function normalizePrompt(prompt: string) {
  return prompt.toLowerCase().trim();
}

export function findFaqEntry(prompt: string) {
  const normalizedPrompt = normalizePrompt(prompt);
  let bestMatch: { triggerLength: number; answer: string } | null = null;

  for (const entry of faq) {
    for (const trigger of entry.trigger) {
      if (!normalizedPrompt.includes(trigger)) {
        continue;
      }

      if (!bestMatch || trigger.length > bestMatch.triggerLength) {
        bestMatch = {
          triggerLength: trigger.length,
          answer: entry.answer,
        };
      }
    }
  }

  return bestMatch?.answer;
}

export const notCoveredReply =
  "That isn't covered on this site. You can ask Fuaad directly via the [contact page](/contact).";

// Skill questions ("does he know X?") are where the model invents claims in both directions,
// so they are answered only from technologies the portfolio actually documents.
const personReference = /\b(fuaad|he|him|his|you|your)\b/;
const skillVerb = /\b(know|knows|use|used|uses|using|familiar|experience|experienced|skilled|proficient|worked|good at|good with|expert)\b/;
const documentedTech =
  /\b(next\.?js|react|typescript|tailwind|fastapi|python|postgres(ql)?|redis|docker|azure|vercel|hugging ?face|streamlit|plotly|mdx)\b/;

/** Curated answer for greetings and known topics, or null when nothing matches. */
export function getCuratedReply(prompt: string) {
  const normalizedPrompt = normalizePrompt(prompt);

  if (/\b(hello|hi|hey)\b/.test(normalizedPrompt)) {
    return greetingReply;
  }

  const faqAnswer = findFaqEntry(normalizedPrompt);
  if (faqAnswer) {
    return faqAnswer;
  }

  if (personReference.test(normalizedPrompt) && skillVerb.test(normalizedPrompt)) {
    return documentedTech.test(normalizedPrompt)
      ? findFaqEntry("tech stack") ?? notCoveredReply
      : notCoveredReply;
  }

  return null;
}

export function getKnowledgeReply(prompt: string) {
  return getCuratedReply(prompt) ?? defaultReply;
}
