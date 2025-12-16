// Stale-while-revalidate caching implementation
import { kv } from '@vercel/kv';

const CACHE_TTL = 3600; // 1 hour in seconds for Redis
const STALE_WHILE_REVALIDATE_TTL = 300; // 5 minutes for stale-while-revalidate
const IS_VERCEL = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;

// In-memory cache fallback for when KV is not available
const memoryCache = new Map<string, { data: string; timestamp: number; ttl: number }>();

export interface CachedResponse {
  data: string | null;
  isStale: boolean;
}

// Check if KV is available
async function isKVAvailable(): Promise<boolean> {
  if (!IS_VERCEL) return false;

  try {
    // Try a simple KV operation to test connectivity
    await kv.set('health-check', 'ok', { ex: 10 });
    await kv.del('health-check');
    return true;
  } catch (error) {
    console.log('KV not available, using in-memory cache:', error instanceof Error ? error.message : String(error));
    return false;
  }
}

export async function getCachedResponse(cacheKey: string): Promise<CachedResponse> {
  const kvAvailable = await isKVAvailable();

  if (!kvAvailable) {
    // Use in-memory cache
    const cached = memoryCache.get(cacheKey);
    if (!cached) {
      return { data: null, isStale: false };
    }

    const isStale = (Date.now() - cached.timestamp) > (STALE_WHILE_REVALIDATE_TTL * 1000);
    return { data: cached.data, isStale };
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
    console.log('KV read error, falling back to memory cache:', error);
    // Fallback to memory cache
    const cached = memoryCache.get(cacheKey);
    if (!cached) {
      return { data: null, isStale: false };
    }

    const isStale = (Date.now() - cached.timestamp) > (STALE_WHILE_REVALIDATE_TTL * 1000);
    return { data: cached.data, isStale };
  }
}

export async function setCachedResponse(cacheKey: string, data: string): Promise<void> {
  const kvAvailable = await isKVAvailable();

  if (kvAvailable) {
    try {
      await kv.set(cacheKey, data, { ex: CACHE_TTL });
      await kv.set(`${cacheKey}:meta`, { timestamp: Date.now() }, { ex: CACHE_TTL });
      return;
    } catch (error) {
      console.log('KV write error, falling back to memory cache:', error);
    }
  }

  // Fallback to in-memory cache
  memoryCache.set(cacheKey, {
    data,
    timestamp: Date.now(),
    ttl: CACHE_TTL
  });

  // Clean up expired entries periodically
  if (Math.random() < 0.1) { // 10% chance to clean up
    const now = Date.now();
    for (const [key, value] of memoryCache.entries()) {
      if (now - value.timestamp > value.ttl * 1000) {
        memoryCache.delete(key);
      }
    }
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

export async function getCacheConfig() {
  const kvAvailable = await isKVAvailable();
  return {
    ttl: CACHE_TTL,
    staleWhileRevalidateTtl: STALE_WHILE_REVALIDATE_TTL,
    isVercel: IS_VERCEL,
    kvAvailable
  };
}