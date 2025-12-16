import { NextRequest, NextResponse } from 'next/server';
import { getClientIP } from '@/lib/ai/ip-detection';
import { checkRateLimit, getRateLimitConfig } from '@/lib/ai/rate-limit';
import { getCachedResponse, setCachedResponse, refreshCacheInBackground, getCacheConfig } from '@/lib/ai/cache';
import { getCircuitBreakerStatus } from '@/lib/ai/circuit-breaker';
import { tryProvidersWithCircuitBreaker } from '@/lib/ai/providers';
import { optimizePrompt, enrichPrompt } from '@/lib/ai/prompt-utils';
import { getFallbackResponse } from '@/lib/ai/responses';

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  if (!prompt?.trim()) {
    return NextResponse.json(
      { error: 'Prompt is required' },
      { status: 400 }
    );
  }

  // Enhanced per-user rate limiting
  const ip = getClientIP(request);
  const rateLimitResult = checkRateLimit(ip);

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: rateLimitResult.error },
      { status: 429 }
    );
  }

  // Generate cache key and implement stale-while-revalidate
  const cacheKey = `ai:${prompt.toLowerCase().trim()}`;
  const { data: cachedData, isStale } = await getCachedResponse(cacheKey);

  // If we have cached data (stale or fresh), serve it immediately
  if (cachedData) {
    console.log(`✅ Serving ${isStale ? 'stale' : 'fresh'} cached response`);

    // If data is stale, trigger background refresh
    if (isStale) {
      console.log('🔄 Triggering background cache refresh');
      // Fire and forget - don't wait for completion
      refreshCacheInBackground(cacheKey, prompt, async (p) => {
        const optimizedPrompt = optimizePrompt(p);
        const enrichedPrompt = await enrichPrompt(optimizedPrompt);
        return tryProvidersWithCircuitBreaker(enrichedPrompt);
      }).catch(error => {
        console.log('Background cache refresh failed:', error);
      });
    }

    return NextResponse.json({
      reply: cachedData,
      cached: true,
      stale: isStale
    });
  }

  // No cached data available, generate fresh response
  console.log('📝 Generating fresh AI response');

  try {
    // Optimize and enrich prompt with context
    const optimizedPrompt = optimizePrompt(prompt);
    const enrichedPrompt = await enrichPrompt(optimizedPrompt);

    // Try providers with circuit breaker protection
    const reply = await tryProvidersWithCircuitBreaker(enrichedPrompt);

    // Cache the successful response
    await setCachedResponse(cacheKey, reply);

    return NextResponse.json({ reply, cached: false });

  } catch (error) {
    console.error('AI API Error:', error);
    return getFallbackResponse();
  }
}

// Circuit breaker status endpoint for monitoring
export async function GET() {
  return NextResponse.json({
    circuitBreakers: getCircuitBreakerStatus(),
    cache: await getCacheConfig(),
    rateLimit: getRateLimitConfig()
  });
}