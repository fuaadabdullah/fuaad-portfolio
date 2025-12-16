// Stale-while-revalidate caching implementation
import { kv } from '@vercel/kv';

const CACHE_TTL = 3600; // 1 hour in seconds for Redis
const STALE_WHILE_REVALIDATE_TTL = 300; // 5 minutes for stale-while-revalidate
const IS_VERCEL = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;

export interface CachedResponse {
  data: string | null;
  isStale: boolean;
}

export async function getCachedResponse(cacheKey: string): Promise<CachedResponse> {
  if (!IS_VERCEL) {
    return { data: null, isStale: false };
  }

  try {
    const cached = await kv.get(cacheKey);
    if (!cached) {
      return { data: null, isStale: false };
    }

    // Check if cache is stale (older than STALE_WHILE_REVALIDATE_TTL)
    const cacheMetadata = await kv.get(`${cacheKey}:meta`);
    const isStale = cacheMetadata ?
      (Date.now() - (cacheMetadata as any).timestamp) > (STALE_WHILE_REVALIDATE_TTL * 1000) :
      true;

    return { data: cached as string, isStale };
  } catch (error) {
    console.log('Cache read error:', error);
    return { data: null, isStale: false };
  }
}

export async function setCachedResponse(cacheKey: string, data: string): Promise<void> {
  if (!IS_VERCEL) return;

  try {
    await kv.set(cacheKey, data, { ex: CACHE_TTL });
    await kv.set(`${cacheKey}:meta`, { timestamp: Date.now() }, { ex: CACHE_TTL });
  } catch (error) {
    console.log('Cache write error:', error);
  }
}

export async function refreshCacheInBackground(
  cacheKey: string,
  prompt: string,
  generateResponse: (prompt: string) => Promise<string>
): Promise<void> {
  try {
    console.log('🔄 Starting background cache refresh');

    const freshReply = await generateResponse(prompt);

    // Update cache with fresh data
    await setCachedResponse(cacheKey, freshReply);

    console.log('✅ Background cache refresh completed');
  } catch (error) {
    console.log('❌ Background cache refresh failed:', error);
    // Don't throw - this is fire-and-forget
  }
}

export function getCacheConfig() {
  return {
    ttl: CACHE_TTL,
    staleWhileRevalidateTtl: STALE_WHILE_REVALIDATE_TTL,
    isVercel: IS_VERCEL
  };
}