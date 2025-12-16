// Main AI provider orchestration with circuit breaker protection
import { callLocalLLM, callGeminiAPI, callHuggingFaceAPI } from './providers/index';

// Main provider selection logic
export async function tryProvidersWithCircuitBreaker(prompt: string): Promise<string> {
  console.log('Starting provider selection, VERCEL env:', !!process.env.VERCEL);
  // Skip local LLM in production (Vercel) since Ollama isn't available
  if (process.env.VERCEL) {
    console.log('Production: trying Gemini first, Hugging Face as fallback');
    try {
      console.log('Calling Gemini API...');
      const result = await callGeminiAPI(prompt);
      console.log('Gemini succeeded');
      return result;
    } catch (error) {
      console.log('Gemini failed, falling back to Hugging Face:', error instanceof Error ? error.message : String(error));
      try {
        console.log('Calling Hugging Face API...');
        const result = await callHuggingFaceAPI(prompt);
        console.log('Hugging Face succeeded');
        return result;
      } catch (hfError) {
        console.log('Hugging Face also failed:', hfError instanceof Error ? hfError.message : String(hfError));
        throw hfError; // Let it bubble up to the route handler
      }
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