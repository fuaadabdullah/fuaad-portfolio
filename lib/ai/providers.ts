// Main AI provider orchestration with circuit breaker protection
import { AI_CONFIG } from './config';
import { callOllama, callGeminiAPI, callHuggingFaceAPI } from './providers/index';

async function callHostedProviders(prompt: string): Promise<string> {
  try {
    return await callGeminiAPI(prompt);
  } catch (error) {
    console.log('Gemini failed, falling back to Hugging Face:', error instanceof Error ? error.message : String(error));
    return await callHuggingFaceAPI(prompt);
  }
}

// Main provider selection logic
export async function tryProvidersWithCircuitBreaker(prompt: string): Promise<string> {
  // TinyLlama runs only on the Oracle host; without it configured, go straight to Gemini
  if (!AI_CONFIG.OLLAMA.URL) {
    return callHostedProviders(prompt);
  }

  try {
    return await callOllama(prompt);
  } catch (error) {
    console.log('Ollama failed, falling back to Gemini:', error instanceof Error ? error.message : String(error));
    return callHostedProviders(prompt);
  }
}
