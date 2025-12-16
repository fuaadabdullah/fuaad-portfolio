// Gemini API provider implementation
import { callProviderWithCircuitBreaker } from '../circuit-breaker';
import { AI_CONFIG } from '../config';
import { SYSTEM_PROMPT } from '../prompts';
import { getMockResponse } from '../fallback';

export async function callGeminiAPI(prompt: string): Promise<string> {
  console.log('Gemini API key present:', !!process.env.GEMINI_API_KEY);
  // Temporarily force fallback to test Hugging Face
  console.warn('Temporarily forcing Gemini to fail for testing');
  return getMockResponse(prompt);