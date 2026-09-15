// Streaming TinyLlama (via Ollama) client for the public chat assistant.
// Server-side only: the Ollama URL and API key never reach the browser.
import { siteFacts } from '@/data/portfolio_knowledge';
import { projectContent } from '@/data/site_content';
import { canExecute, recordFailure, recordSuccess } from './circuit-breaker';
import { AI_CONFIG } from './config';
import { notCoveredReply as NOT_COVERED_REPLY } from './knowledge';

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

interface StreamOptions {
  /** Aborts generation when the visitor disconnects. */
  signal?: AbortSignal;
  /** Called with the full reply once generation finishes cleanly. */
  onComplete?: (reply: string) => void;
}

const PROVIDER = 'ollama';
const FIRST_TOKEN_TIMEOUT_MS = 15_000; // allows a cold model load on a small CPU host
const TOTAL_TIMEOUT_MS = 45_000;
const MAX_CONCURRENT_GENERATIONS = 2; // TinyLlama hosts are usually 1-2 vCPU boxes
export const MAX_REPLY_CHARS = 1_200;

const SITE_FACTS = siteFacts.trim().replace(/\s*\n\s*/g, ' ');
const PROJECT_FACTS = projectContent
  .map(({ title, summary }) => {
    const name = title.replace(/[^\p{L}\p{N}\s&.—-]/gu, '').replace(/\s+/g, ' ').trim();
    return `${name}: ${summary.trim()}`;
  })
  .join(' ');

// TinyLlama copies demonstrated behavior far more reliably than it follows written rules,
// so show it both a grounded answer and the refusal for off-topic or undocumented questions.
const FEW_SHOT_EXAMPLES: ChatTurn[] = [
  { role: 'user', content: 'Which project is about trading?' },
  {
    role: 'assistant',
    content:
      'RIZZK Calculator is a risk management tool for day traders that handles position sizing and risk/reward math. See it on the [projects page](/portfolio).',
  },
  { role: 'user', content: 'Write me a song about dogs.' },
  { role: 'assistant', content: NOT_COVERED_REPLY },
  { role: 'user', content: 'Does Fuaad know Rust?' },
  { role: 'assistant', content: NOT_COVERED_REPLY },
];

let activeGenerations = 0;

export function getOllamaHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (AI_CONFIG.OLLAMA.API_KEY) {
    headers.Authorization = `Bearer ${AI_CONFIG.OLLAMA.API_KEY}`;
  }
  return headers;
}

function isConfigured(): boolean {
  // TinyLlama runs only on the Oracle host; there is no local Ollama to fall back to
  return Boolean(AI_CONFIG.OLLAMA.URL);
}

// Small models follow short, concrete instructions far better than long ones.
export const SYSTEM_PROMPT = [
  "You answer visitor questions about Fuaad Abdullah's portfolio website using ONLY these facts.",
  `Facts: ${SITE_FACTS}`,
  `Projects: ${PROJECT_FACTS}`,
  'Reply in at most 3 sentences and refer to Fuaad in the third person.',
  `If the facts do not answer the question, or it is unrelated to Fuaad's work, reply exactly: "${NOT_COVERED_REPLY}"`,
  'Never invent details, companies, prices, or URLs. Only link to /portfolio, /about, /services, /resume, /blog, or /contact.',
].join('\n');

// Parses Ollama's NDJSON stream into content tokens.
async function* readTokens(body: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  const parseLine = (line: string): { token?: string; done: boolean } => {
    const chunk = JSON.parse(line);
    if (chunk.error) throw new Error(`Ollama error: ${chunk.error}`);
    // Mark replies cut off by the num_predict limit
    const token = chunk.done_reason === 'length' ? `${chunk.message?.content ?? ''}…` : chunk.message?.content;
    return { token, done: Boolean(chunk.done) };
  };

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let newline: number;
      while ((newline = buffer.indexOf('\n')) !== -1) {
        const line = buffer.slice(0, newline).trim();
        buffer = buffer.slice(newline + 1);
        if (!line) continue;

        const { token, done: finished } = parseLine(line);
        if (token) yield token;
        if (finished) return;
      }
    }

    const tail = (buffer + decoder.decode()).trim();
    if (tail) {
      const { token, done } = parseLine(tail);
      if (token) yield token;
      if (done) return;
    }
    throw new Error('Ollama stream ended before completion');
  } finally {
    // Closing the connection early makes Ollama stop generating
    await reader.cancel().catch(() => {});
  }
}

/**
 * Starts a TinyLlama generation and resolves once the first token arrives.
 * Resolves to null when the model is unavailable (not configured, circuit open,
 * at capacity, or failed before producing output) so callers can fall back
 * before any response bytes are sent.
 */
export async function streamTinyLlama(
  turns: ChatTurn[],
  { signal, onComplete }: StreamOptions = {}
): Promise<ReadableStream<Uint8Array> | null> {
  if (
    signal?.aborted ||
    !isConfigured() ||
    activeGenerations >= MAX_CONCURRENT_GENERATIONS ||
    !canExecute(PROVIDER)
  ) {
    return null;
  }

  activeGenerations++;
  const upstream = new AbortController();
  let clientGone = false;
  const onClientAbort = () => {
    clientGone = true;
    upstream.abort();
  };
  signal?.addEventListener('abort', onClientAbort, { once: true });
  const totalTimer = setTimeout(() => upstream.abort(), TOTAL_TIMEOUT_MS);

  let released = false;
  const release = () => {
    if (released) return;
    released = true;
    activeGenerations--;
    clearTimeout(totalTimer);
    signal?.removeEventListener('abort', onClientAbort);
  };

  const fail = (error: unknown) => {
    if (!clientGone) {
      recordFailure(PROVIDER);
      console.warn('TinyLlama generation failed:', error instanceof Error ? error.message : String(error));
    }
    release();
  };

  const firstTokenTimer = setTimeout(() => upstream.abort(), FIRST_TOKEN_TIMEOUT_MS);
  let tokens: AsyncGenerator<string>;
  let firstToken: string;

  try {
    const response = await fetch(AI_CONFIG.OLLAMA.URL, {
      method: 'POST',
      headers: getOllamaHeaders(),
      cache: 'no-store',
      signal: upstream.signal,
      body: JSON.stringify({
        model: AI_CONFIG.OLLAMA.MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...FEW_SHOT_EXAMPLES, ...turns],
        stream: true,
        // No per-request keep_alive: the host's OLLAMA_KEEP_ALIVE decides how long the model stays warm
        options: {
          temperature: 0.2,
          top_p: 0.9,
          repeat_penalty: 1.15,
          num_predict: 150,
          num_ctx: 2048,
        },
      }),
    });

    if (!response.ok || !response.body) {
      throw new Error(`Ollama responded with ${response.status}`);
    }

    tokens = readTokens(response.body);
    const first = await tokens.next();
    if (first.done) throw new Error('Ollama returned an empty reply');
    firstToken = first.value;
  } catch (error) {
    fail(error);
    return null;
  } finally {
    clearTimeout(firstTokenTimer);
  }

  const encoder = new TextEncoder();
  let pending: string | null = firstToken;
  let reply = '';

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const next = pending !== null ? { done: false as const, value: pending } : await tokens.next();
        pending = null;

        if (next.done || reply.length >= MAX_REPLY_CHARS) {
          await tokens.return(undefined);
          recordSuccess(PROVIDER);
          release();
          onComplete?.(reply);
          controller.close();
          return;
        }

        const text = next.value.slice(0, MAX_REPLY_CHARS - reply.length);
        reply += text;
        controller.enqueue(encoder.encode(text));
      } catch (error) {
        fail(error);
        controller.error(error);
      }
    },
    cancel() {
      onClientAbort();
      release();
    },
  });
}
