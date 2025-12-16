// Circuit breaker implementation for AI providers
export interface CircuitBreakerState {
  state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  failures: number;
  lastFailureTime: number;
  nextAttemptTime: number;
}

export interface CircuitBreakerConfig {
  failureThreshold: number;
  recoveryTimeout: number;
  monitoringWindow: number;
}

const CIRCUIT_BREAKER_CONFIG: CircuitBreakerConfig = {
  failureThreshold: 3, // Open circuit after 3 failures
  recoveryTimeout: 60000, // 1 minute before trying to recover
  monitoringWindow: 300000, // 5 minutes window for failure tracking
};

const circuitBreakers: Record<string, CircuitBreakerState> = {
  'local-llm': {
    state: 'CLOSED',
    failures: 0,
    lastFailureTime: 0,
    nextAttemptTime: 0,
  },
  'gemini-api': {
    state: 'CLOSED',
    failures: 0,
    lastFailureTime: 0,
    nextAttemptTime: 0,
  },
  'huggingface-api': {
    state: 'CLOSED',
    failures: 0,
    lastFailureTime: 0,
    nextAttemptTime: 0,
  },
};

export function canExecute(provider: string): boolean {
  const breaker = circuitBreakers[provider];
  const now = Date.now();

  // Clean up old failures outside monitoring window
  if (now - breaker.lastFailureTime > CIRCUIT_BREAKER_CONFIG.monitoringWindow) {
    breaker.failures = 0;
  }

  switch (breaker.state) {
    case 'CLOSED':
      return true;
    case 'OPEN':
      if (now >= breaker.nextAttemptTime) {
        breaker.state = 'HALF_OPEN';
        console.log(`🔄 Circuit breaker for ${provider} entering HALF_OPEN state`);
        return true;
      }
      return false;
    case 'HALF_OPEN':
      return true;
    default:
      return false;
  }
}

export function recordSuccess(provider: string): void {
  const breaker = circuitBreakers[provider];
  breaker.failures = 0;
  breaker.state = 'CLOSED';
  console.log(`✅ Circuit breaker for ${provider} reset to CLOSED state`);
}

export function recordFailure(provider: string): void {
  const breaker = circuitBreakers[provider];
  const now = Date.now();

  breaker.failures++;
  breaker.lastFailureTime = now;

  if (breaker.failures >= CIRCUIT_BREAKER_CONFIG.failureThreshold) {
    breaker.state = 'OPEN';
    breaker.nextAttemptTime = now + CIRCUIT_BREAKER_CONFIG.recoveryTimeout;
    console.log(`🚫 Circuit breaker for ${provider} opened due to ${breaker.failures} failures`);
  }
}

export function getCircuitBreakerStatus(): Record<string, CircuitBreakerState> {
  return { ...circuitBreakers };
}

export async function callProviderWithCircuitBreaker(
  provider: string,
  providerCall: () => Promise<string>,
  fallbackResponse: string
): Promise<string> {
  if (!canExecute(provider)) {
    console.log(`🚫 Circuit breaker for ${provider} is OPEN, using fallback`);
    return fallbackResponse;
  }

  try {
    const result = await providerCall();
    recordSuccess(provider);
    return result;
  } catch (error) {
    recordFailure(provider);
    throw error; // Re-throw to let caller handle fallback
  }
}