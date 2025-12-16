// Hugging Face API provider implementation
import { callProviderWithCircuitBreaker } from '../circuit-breaker';
import { AI_CONFIG } from '../config';
import { SYSTEM_PROMPT } from '../prompts';
import { getMockResponse } from '../fallback';

export async function callHuggingFaceAPI(prompt: string): Promise<string> {
  if (!process.env.HUGGINGFACE_API_KEY) {
    console.warn('Hugging Face API key not configured');
    return getMockResponse(prompt);
  }

  return callProviderWithCircuitBreaker(
    'huggingface-api',
    async () => {
      console.debug('Calling Hugging Face API...');
      const response = await fetch(AI_CONFIG.HUGGINGFACE.URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: `${SYSTEM_PROMPT}\n\nUser: ${prompt}\n\nAssistant:`,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.7,
            do_sample: true,
            pad_token_id: 50256,
            eos_token_id: 50256
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.status}`);
      }

      const data = await response.json();

      // Handle different response formats
      let reply = '';
      if (Array.isArray(data) && data.length > 0) {
        reply = data[0].generated_text || '';
      } else if (data.generated_text) {
        reply = data.generated_text;
      }

      if (!reply) {
        throw new Error('No valid response from Hugging Face');
      }

      // Clean up the response (remove the prompt if it's included)
      const promptIndex = reply.indexOf('Assistant:');
      if (promptIndex !== -1) {
        reply = reply.substring(promptIndex + 10).trim();
      }

      // If the response is too long or contains the original prompt, truncate it
      if (reply.length > 500) {
        reply = reply.substring(0, 500) + '...';
      }

      console.debug('Hugging Face succeeded');
      return reply;
    },
    getMockResponse(prompt) // Fallback if circuit breaker is open
  );
}