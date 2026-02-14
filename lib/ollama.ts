export type OllamaConfig = {
  baseUrl: string;
  apiKey: string;
  model: string;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function pickFirstNonEmpty(env: NodeJS.ProcessEnv, keys: string[]): string {
  for (const k of keys) {
    const v = env[k];
    if (isNonEmptyString(v)) return v;
  }
  return "";
}

export function cleanBaseUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";

  try {
    const candidate = /^(https?:)?\/\//i.test(trimmed) ? trimmed : `http://${trimmed}`;
    const u = new URL(candidate);
    return `${u.protocol}//${u.host}`;
  } catch {
    return trimmed.replace(/\/+$/, "");
  }
}

export function getOllamaConfig(env: NodeJS.ProcessEnv): OllamaConfig {
  const baseUrlRaw = pickFirstNonEmpty(env, [
    "PORTFOLIO_OLLAMA_BASE_URL",
    "OLLAMA_GCP_URL",
    "OLLAMA_GCP_BASE_URL",
    "GCP_OLLAMA_URL",
    "OLLAMA_BASE_URL",
    "OLLAMA_URL",
    "OLLAMA_API_URL",
  ]);

  const baseUrl = cleanBaseUrl(baseUrlRaw) || "http://localhost:11434";

  const apiKey = pickFirstNonEmpty(env, [
    "PORTFOLIO_OLLAMA_API_KEY",
    "OLLAMA_GCP_API_KEY",
    "GCP_OLLAMA_API_KEY",
  ]).trim();

  const model = pickFirstNonEmpty(env, [
    "PORTFOLIO_OLLAMA_MODEL",
    "OLLAMA_GCP_DEFAULT_MODEL",
    "OLLAMA_DEFAULT_MODEL",
    "OLLAMA_MODEL",
  ]).trim() || "gemma:2b";

  return { baseUrl, apiKey, model };
}

function parseOllamaChatShape(json: Record<string, unknown>): string | null {
  const message = json.message;
  if (isRecord(message) && isNonEmptyString(message.content)) {
    return message.content.trim();
  }
  return null;
}

function parseOllamaGenerateShape(json: Record<string, unknown>): string | null {
  if (isNonEmptyString(json.response)) {
    return json.response.trim();
  }
  return null;
}

function parseOpenAIChoicesShape(json: Record<string, unknown>): string | null {
  const choices = json.choices;
  if (!Array.isArray(choices) || choices.length === 0) return null;
  const c0 = choices[0];
  if (!isRecord(c0)) return null;
  if (isRecord(c0.message) && isNonEmptyString(c0.message.content)) {
    return c0.message.content.trim();
  }
  return null;
}

export function parseChatReply(json: unknown): string | null {
  if (isNonEmptyString(json)) return json;
  if (!isRecord(json)) return null;

  return (
    parseOllamaChatShape(json) ||
    parseOllamaGenerateShape(json) ||
    parseOpenAIChoicesShape(json) ||
    null
  );
}
