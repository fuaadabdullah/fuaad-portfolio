import { type OllamaConfig, parseChatReply } from "@/lib/ollama";

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

export async function callOllamaChat(input: {
  ollama: OllamaConfig;
  system: string;
  prompt: string;
}): Promise<string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (input.ollama.apiKey) headers.Authorization = `Bearer ${input.ollama.apiKey}`;

  const res = await fetchWithTimeout(
    new URL("/api/chat", input.ollama.baseUrl).toString(),
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: input.ollama.model,
        messages: [
          { role: "system", content: input.system },
          { role: "user", content: input.prompt },
        ],
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`LLM API returned ${res.status}: ${res.statusText}`);
  }

  const json = (await res.json()) as unknown;
  const reply = parseChatReply(json);
  if (!reply) {
    throw new Error("Invalid LLM response format");
  }
  return reply;
}

