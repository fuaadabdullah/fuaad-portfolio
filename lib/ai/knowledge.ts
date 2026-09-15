import { faq } from "@/data/portfolio_knowledge";
import projects from "@/data/projects";

// Contract: anything the chat says about Fuaad comes from site data. Questions without
// enough documented evidence get this instead of a generated guess.
export const abstainReply =
  "I don't have enough information about that yet. You can explore Fuaad's [projects](/portfolio), [résumé](/resume), or [contact him directly](/contact).";

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

// Skill questions ("does he know X?") invite invented claims in both directions,
// so they are answered only from technologies the project data lists.
const personReference = /\b(fuaad|he|him|his|you|your)\b/;
const skillVerb = /\b(know|knows|use|used|uses|using|familiar|experience|experienced|skilled|proficient|worked|good at|good with|expert)\b/;
const offTopicRequest = /\b(jokes?|weather|poems?|songs?|lyrics|recipes?|riddles?)\b/;
const undocumentedWorkStatus = /\b(visa|sponsor(ship)?|authori[sz]ed|citizen(ship)?|relocat(e|ion)|remote(ly)?|salary|compensation)\b/;

// Spellings visitors use for technologies the project data names differently
const techAliases: [RegExp, string][] = [
  [/\bhugging face\b/g, "huggingface"],
  [/\bnext ?js\b/g, "next.js"],
  [/\bpostgres\b/g, "postgresql"],
];

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Names that are also everyday words ("how would he react?") only count alongside tech wording
const ambiguousTech = new Set(["react", "azure", "framer"]);
const techContext = /\b(use[sd]?|using|built|build|stack|projects?|framework|library|runs?|know|knows|experience|with)\b/;

// Technology -> projects, built from each project's `tech` list. Multi-word names are keyed by
// their first word ("Azure App Service" -> azure) so the same platform groups together.
const techIndex = (() => {
  const index = new Map<string, { label: string; projects: { name: string; slug: string }[] }>();
  for (const project of projects) {
    const name = project.title.replace(/[^\p{L}\p{N}\s&.—-]/gu, "").split("—")[0].replace(/\s+/g, " ").trim();
    for (const tech of project.tech) {
      const key = tech.split(" ")[0].toLowerCase();
      const entry = index.get(key) ?? { label: tech, projects: [] };
      // Label with the shortest listed variant: "Azure" rather than "Azure App Service"
      if (tech.length < entry.label.length) entry.label = tech;
      if (!entry.projects.some((p) => p.slug === project.slug)) {
        entry.projects.push({ name, slug: project.slug });
      }
      index.set(key, entry);
    }
  }
  return [...index.entries()]
    .sort(([a], [b]) => b.length - a.length)
    .map(([key, entry]) => ({ key, pattern: new RegExp(`(^|[^\\w.-])${escapeRegExp(key)}(?![\\w-])`), ...entry }));
})();

const joinNames = (names: string[]) =>
  names.length <= 2 ? names.join(" and ") : `${names.slice(0, -1).join(", ")}, and ${names.at(-1)}`;

/** Which projects use the technologies a question names, stated only from project data. */
function getTechReply(normalizedPrompt: string) {
  let text = normalizedPrompt;
  for (const [pattern, replacement] of techAliases) text = text.replace(pattern, replacement);

  const matches = techIndex.filter(({ key, pattern }, i, all) =>
    pattern.test(text) &&
    (!ambiguousTech.has(key) || techContext.test(text)) &&
    !all.some((other, j) => j < i && other.key.includes(key) && other.pattern.test(text))
  );
  if (matches.length === 0) return null;

  return matches
    .slice(0, 3)
    .map(({ label, projects: used }) =>
      used.length === 1
        ? `${label} is part of the ${used[0].name} stack; see the [${used[0].name} case study](/portfolio/${used[0].slug}).`
        : `${label} shows up in ${joinNames(used.map((p) => p.name))}. Details are on the [projects page](/portfolio).`
    )
    .join(" ");
}

/** Curated answer for greetings and known topics, or null when nothing matches. */
export function getCuratedReply(prompt: string) {
  const normalizedPrompt = normalizePrompt(prompt);

  const faqAnswer = findFaqEntry(normalizedPrompt);
  if (faqAnswer) {
    return faqAnswer;
  }

  const techReply = getTechReply(normalizedPrompt);
  if (techReply) {
    return techReply;
  }

  // A skill question naming no documented technology ("does he know Rust?")
  if (personReference.test(normalizedPrompt) && skillVerb.test(normalizedPrompt)) {
    return notCoveredReply;
  }

  // Off-topic requests and work status the site never states get a pointer to Fuaad instead
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
  return getCuratedReply(prompt) ?? abstainReply;
}
