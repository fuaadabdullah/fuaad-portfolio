import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getCachedResponse, setCachedResponse } from '@/lib/ai/cache';
import { getClientIP } from '@/lib/ai/ip-detection';
import { getCuratedReply, getKnowledgeReply } from '@/lib/ai/knowledge';
import { checkRateLimit } from '@/lib/ai/rate-limit';
import { MAX_REPLY_CHARS, streamTinyLlama } from '@/lib/ai/tinyllama';

// Public portfolio chat. Known topics get curated answers instantly; TinyLlama handles
// everything else, with curated knowledge as the fallback when the model is unavailable.
// Deliberately never calls paid providers (Gemini/Hugging Face stay behind /api/ai).

export const maxDuration = 60;

const MAX_BODY_CHARS = 16_000;
const MAX_HISTORY_MESSAGES = 5;

const ChatRequestSchema = z
  .object({
    messages: z
      .array(
        z.discriminatedUnion('role', [
          z.object({ role: z.literal('user'), content: z.string().trim().min(1).max(500) }).strict(),
          z.object({ role: z.literal('assistant'), content: z.string().trim().min(1).max(MAX_REPLY_CHARS + 20) }).strict(),
        ])
      )
      .min(1)
      .max(MAX_HISTORY_MESSAGES),
  })
  .strict()
  .refine(({ messages }) => messages[messages.length - 1].role === 'user', {
    message: 'The last message must come from the user',
  });

function jsonError(error: string, status: number, headers?: HeadersInit) {
  return NextResponse.json({ error }, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
}

function textResponse(
  body: string | ReadableStream<Uint8Array>,
  source: 'curated' | 'cache' | 'tinyllama' | 'fallback'
) {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Accel-Buffering': 'no',
      'X-Chat-Source': source,
    },
  });
}

// Stops other sites from using this endpoint as a free LLM API from visitors' browsers.
function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;

  try {
    const originHost = new URL(origin).host;
    // Next builds request.url from its bind address ("localhost"), not the host the browser used,
    // so a same-origin visit to 127.0.0.1 was rejected. Browsers can't forge the Host header.
    const allowedHosts = [new URL(request.url).host];
    const hostHeader = request.headers.get('host');
    if (hostHeader) {
      allowedHosts.push(hostHeader);
    }
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      allowedHosts.push(new URL(process.env.NEXT_PUBLIC_SITE_URL).host);
    }
    return allowedHosts.includes(originHost);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return jsonError('Forbidden', 403);
  }

  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return jsonError('Content-Type must be application/json', 415);
  }

  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (declaredLength > MAX_BODY_CHARS) {
    return jsonError('Request too large', 413);
  }

  const rateLimit = checkRateLimit(getClientIP(request));
  if (!rateLimit.allowed) {
    return jsonError(rateLimit.error ?? 'Rate limit exceeded. Please try again later.', 429, { 'Retry-After': '60' });
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_CHARS) {
    return jsonError('Request too large', 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonError('Invalid JSON', 400);
  }

  const parsed = ChatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError('Invalid chat request', 400);
  }

  const messages = parsed.data.messages.map(({ role, content }) => ({
    role,
    content: content.replace(/\s+/g, ' '),
  }));
  const question = messages[messages.length - 1].content;

  // A 1.1B model invents details, so documented topics always get the reviewed answer
  const curated = getCuratedReply(question);
  if (curated) {
    return textResponse(curated, 'curated');
  }

  // Only standalone questions are cacheable; follow-ups depend on the conversation
  const cacheKey = messages.length === 1 ? `chat:tinyllama:${question.toLowerCase()}` : null;

  if (cacheKey) {
    const { data } = await getCachedResponse(cacheKey);
    if (data) return textResponse(data, 'cache');
  }

  const stream = await streamTinyLlama(messages, {
    signal: request.signal,
    onComplete: cacheKey
      ? (reply) => {
          if (reply.trim()) setCachedResponse(cacheKey, reply).catch(() => {});
        }
      : undefined,
  });

  if (stream) {
    return textResponse(stream, 'tinyllama');
  }

  return textResponse(getKnowledgeReply(question), 'fallback');
}
