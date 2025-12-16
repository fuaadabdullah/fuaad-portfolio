// Local LLM provider implementation
import { callProviderWithCircuitBreaker } from '../circuit-breaker';
import { AI_CONFIG } from '../config';
import { SYSTEM_PROMPT, fetchWithTimeout } from '../prompts';
import { getMockResponse } from '../fallback';

export async function callLocalLLM(prompt: string): Promise<string> {
  return callProviderWithCircuitBreaker(
    'local-llm',
    async () => {
      console.log('Attempting local LLM...');
      const response = await fetchWithTimeout(AI_CONFIG.LOCAL_LLM.URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: AI_CONFIG.LOCAL_LLM.MODEL,
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT
            },
            { role: 'user', content: prompt }
          ],
          stream: false,
          options: { temperature: 0.7 }
        })
      }, AI_CONFIG.LOCAL_LLM.TIMEOUT);

      if (!response.ok) {
        throw new Error(`Local LLM error: ${response.status}`);
      }

      const data = await response.json();
      const result = data.message?.content || data.response || 'I received your message.';

      console.log('Local LLM succeeded');
      return result;
    },
    getMockResponse(prompt) // Fallback if circuit breaker is open
  );
}