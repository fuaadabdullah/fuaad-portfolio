// Main AI provider orchestration with circuit breaker protection
import { callLocalLLM, callGeminiAPI, callHuggingFaceAPI } from './providers/index';

// Main provider selection logic
export async function tryProvidersWithCircuitBreaker(prompt: string): Promise<string> {
  // Skip local LLM in production (Vercel) since Ollama isn't available
  if (process.env.VERCEL) {
    console.log('Production: trying Gemini first, Hugging Face as fallback');
    try {
      return await callGeminiAPI(prompt);
    } catch (error) {
      console.log('Gemini failed, falling back to Hugging Face:', error instanceof Error ? error.message : String(error));
      return await callHuggingFaceAPI(prompt);
    }
  }

  try {
    // First attempt: Local TinyLlama
    return await callLocalLLM(prompt);
  } catch (error) {
    console.log('Local LLM failed, falling back to Gemini:', error instanceof Error ? error.message : String(error));
    try {
      return await callGeminiAPI(prompt);
    } catch (geminiError) {
      console.log('Gemini also failed, falling back to Hugging Face:', geminiError instanceof Error ? geminiError.message : String(geminiError));
      return await callHuggingFaceAPI(prompt);
    }
  }
}