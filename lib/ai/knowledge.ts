import { faq } from "@/data/portfolio_knowledge";

const defaultReply =
  "I'm here to help you learn about Fuaad's portfolio. Ask about a project, the tech stack, services, or how to get in touch.";

const greetingReply =
  "I can walk you through Fuaad's projects, tech stack, services, or background. Start with a project like GoblinOS, RIZZK, ShopMindAI, Elbey Projects, GradeM8, or the portfolio site.";

function normalizePrompt(prompt: string) {
  return prompt.toLowerCase().trim();
}

// Triggers must start at a word boundary so "location" doesn't fire inside "allocation"
const faqMatchers = faq.map((entry) => ({
  answer: entry.answer,
  triggers: entry.trigger.map((trigger) => ({
    length: trigger.length,
    pattern: new RegExp(`\\b${trigger.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
  })),
}));

export function findFaqEntry(prompt: string) {
  const normalizedPrompt = normalizePrompt(prompt);
  let bestMatch: { triggerLength: number; answer: string } | null = null;

  for (const entry of faqMatchers) {
    for (const trigger of entry.triggers) {
      if (!trigger.pattern.test(normalizedPrompt)) {
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
const offTopicRequest = /\b(jokes?|weather|poems?|songs?|lyrics|recipes?|riddles?)\b/;
const undocumentedWorkStatus = /\b(visa|sponsor(ship)?|authori[sz]ed|citizen(ship)?|relocat(e|ion)|remote(ly)?|salary|compensation)\b/;
const documentedTech =
  /\b(next\.?js|react|typescript|tailwind|fastapi|python|postgres(ql)?|redis|docker|azure|vercel|hugging ?face|streamlit|plotly|mdx)\b/;

/** Curated answer for greetings and known topics, or null when nothing matches. */
export function getCuratedReply(prompt: string) {
  const normalizedPrompt = normalizePrompt(prompt);

  const faqAnswer = findFaqEntry(normalizedPrompt);
  if (faqAnswer) {
    return faqAnswer;
  }

  if (personReference.test(normalizedPrompt) && skillVerb.test(normalizedPrompt)) {
    return documentedTech.test(normalizedPrompt)
      ? findFaqEntry("tech stack") ?? notCoveredReply
      : notCoveredReply;
  }

  // The model plays along with off-topic requests, and would guess at work status the site never states
  if (offTopicRequest.test(normalizedPrompt) || undocumentedWorkStatus.test(normalizedPrompt)) {
    return notCoveredReply;
  }

  // Checked last so "Hi, what's his tech stack?" gets the answer rather than the greeting
  if (/\b(hello|hi|hey)\b/.test(normalizedPrompt)) {
    return greetingReply;
  }

  return null;
}

export function getKnowledgeReply(prompt: string) {
  return getCuratedReply(prompt) ?? defaultReply;
}
