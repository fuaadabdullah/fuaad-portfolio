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

export function getKnowledgeReply(prompt: string) {
  const normalizedPrompt = normalizePrompt(prompt);

  if (!normalizedPrompt) {
    return defaultReply;
  }

  if (/\b(hello|hi|hey)\b/.test(normalizedPrompt)) {
    return greetingReply;
  }

  const faqAnswer = findFaqEntry(normalizedPrompt);
  if (faqAnswer) {
    return faqAnswer;
  }

  return defaultReply;
}
