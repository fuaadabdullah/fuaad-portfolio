// Gemini API provider implementation
import { callProviderWithCircuitBreaker } from '../circuit-breaker';
import { AI_CONFIG } from '../config';
import { SYSTEM_PROMPT } from '../prompts';
import { getMockResponse } from '../fallback';

export async function callGeminiAPI(prompt: string): Promise<string> {
  if (!AI_CONFIG.GEMINI.API_KEY) {
    console.warn('Gemini API key not configured');
    return getMockResponse(prompt);
  }

  return callProviderWithCircuitBreaker(
    'gemini-api',
    async () => {
      console.log('Calling Gemini API...');
      const response = await fetch(`${AI_CONFIG.GEMINI.URL}?key=${AI_CONFIG.GEMINI.API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          systemInstruction: {
            parts: [{
              text: SYSTEM_PROMPT
            }]
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!reply) {
        throw new Error('No valid response from Gemini');
      }

      console.log('Gemini succeeded');
      return reply;
    },
    getMockResponse(prompt) // Fallback if circuit breaker is open
  );
}