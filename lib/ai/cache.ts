// Stale-while-revalidate caching implementation
import { createClient } from 'redis';

const CACHE_TTL = 3600; // 1 hour in seconds for Redis
const STALE_WHILE_REVALIDATE_TTL = 300; // 5 minutes for stale-while-revalidate

// In-memory cache fallback for when Redis is not available
const memoryCache = new Map<string, { data: string; timestamp: number; ttl: number }>();

// Redis client
let redisClient: any = null;

async function getRedisClient() {
  if (!redisClient) {
    try {
      redisClient = createClient({ url: process.env.REDIS_URL });
      await redisClient.connect();
      console.log('✅ Redis client connected');
    } catch (error) {
      console.log('❌ Redis connection failed, using memory cache:', error);
      redisClient = null;
    }
  }
  return redisClient;
}

// Check if Redis is available
async function isRedisAvailable(): Promise<boolean> {
  if (!process.env.REDIS_URL) return false;

  try {
    const client = await getRedisClient();
    if (!client) return false;

    // Test connection with a ping
    await client.ping();
    return true;
  } catch (error) {
    console.log('Redis not available:', error);
    return false;
  }
}

export interface CachedResponse {
  data: string | null;
  isStale: boolean;
}

export async function getCachedResponse(cacheKey: string): Promise<CachedResponse> {
  const redisAvailable = await isRedisAvailable();

  if (!redisAvailable) {
    // Use in-memory cache
    const cached = memoryCache.get(cacheKey);
    if (!cached) {
      return { data: null, isStale: false };
    }

    const isStale = (Date.now() - cached.timestamp) > (STALE_WHILE_REVALIDATE_TTL * 1000);
    return { data: cached.data, isStale };
  }

  try {
    const client = await getRedisClient();
    if (!client) {
      throw new Error('Redis client not available');
    }

    const cached = await client.get(cacheKey);
    if (!cached) {
      return { data: null, isStale: false };
    }

    // Check if cache is stale (older than STALE_WHILE_REVALIDATE_TTL)
    const cacheMetadata = await client.get(`${cacheKey}:meta`);
    const isStale = cacheMetadata ?
      (Date.now() - parseInt(cacheMetadata)) > (STALE_WHILE_REVALIDATE_TTL * 1000) :
      true;

    return { data: cached, isStale };
  } catch (error) {
    console.log('Redis read error, falling back to memory cache:', error);
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
  const redisAvailable = await isRedisAvailable();

  if (redisAvailable) {
    try {
      const client = await getRedisClient();
      if (client) {
        await client.setEx(cacheKey, CACHE_TTL, data);
        await client.setEx(`${cacheKey}:meta`, CACHE_TTL, Date.now().toString());
        return;
      }
    } catch (error) {
      console.log('Redis write error, falling back to memory cache:', error);
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
  const redisAvailable = await isRedisAvailable();
  return {
    ttl: CACHE_TTL,
    staleWhileRevalidateTtl: STALE_WHILE_REVALIDATE_TTL,
    redisAvailable
  };
}