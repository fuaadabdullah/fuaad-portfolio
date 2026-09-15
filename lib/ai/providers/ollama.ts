// TinyLlama provider: the Ollama host on Oracle Cloud (deploy/oracle-ollama)
import { callProviderWithCircuitBreaker } from '../circuit-breaker';
import { AI_CONFIG } from '../config';
import { SYSTEM_PROMPT, fetchWithTimeout } from '../prompts';
import { getMockResponse } from '../fallback';
import { getOllamaHeaders } from '../tinyllama';

export async function callOllama(prompt: string): Promise<string> {
  if (!AI_CONFIG.OLLAMA.URL) {
    throw new Error('OLLAMA_BASE_URL is not set');
  }

  return callProviderWithCircuitBreaker(
    'ollama',
    async () => {
      console.log('Calling TinyLlama on the Oracle Ollama host...');
      const response = await fetchWithTimeout(AI_CONFIG.OLLAMA.URL, {
        method: 'POST',
        headers: getOllamaHeaders(),
        body: JSON.stringify({
          model: AI_CONFIG.OLLAMA.MODEL,
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
      }, AI_CONFIG.OLLAMA.TIMEOUT);

      if (!response.ok) {
        throw new Error(`Ollama error: ${response.status}`);
      }

      const data = await response.json();
      const result = data.message?.content || data.response || 'I received your message.';

      console.log('Ollama succeeded');
      return result;
    },
    getMockResponse(prompt) // Fallback if circuit breaker is open
  );
}
