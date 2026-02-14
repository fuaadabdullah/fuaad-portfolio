let lastRequestTime = 0;

export function isRateLimited(now = Date.now(), minIntervalMs = 500): boolean {
  if (now - lastRequestTime < minIntervalMs) return true;
  lastRequestTime = now;
  return false;
}

