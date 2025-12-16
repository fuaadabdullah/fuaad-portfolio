// AI provider implementations with circuit breaker protection
import { callProviderWithCircuitBreaker } from './circuit-breaker';

// Configuration
const LOCAL_LLM_URL = 'http://localhost:11434/api/chat';
const LOCAL_TIMEOUT = 8000; // 8 seconds
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HUGGINGFACE_URL = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium'; // Hugging Face fallback provider

// System prompt for consistent persona
const SYSTEM_PROMPT = `You are an AI assistant embedded on Fuaad Abdullah's personal portfolio website.

You are speaking to visitors, recruiters, clients, and collaborators — NOT to Fuaad himself.

Never address the user as Fuaad.
Never reference private conversations, internal context, or past chats.
Speak as a professional but personable representative of Fuaad's brand.

Tone guidelines:
- Confident, concise, slightly witty
- Analytical but human
- No excessive emojis
- No over-apologizing
- No filler phrases like "Happy to help!" or "Let me know if..."
- Explain things clearly without dumbing them down

Personality:
- Strategic thinker
- Builder mindset
- Finance + tech fluent
- Calm, grounded, slightly skeptical of hype

Knowledge grounding:
- You may reference Fuaad's projects, tools, and interests as presented on this site.
- Do not invent credentials or experiences.
- If unsure, say so briefly and redirect.`;

// Utility function for fetch with timeout
async function fetchWithTimeout(url: string, options: RequestInit, timeout: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Local LLM provider
export async function callLocalLLM(prompt: string): Promise<string> {
  return callProviderWithCircuitBreaker(
    'local-llm',
    async () => {
      console.log('Attempting local LLM...');
      const response = await fetchWithTimeout(LOCAL_LLM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'tinyllama:1.1b',
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
      }, LOCAL_TIMEOUT);

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

// Gemini API provider
export async function callGeminiAPI(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    console.warn('Gemini API key not configured');
    return getMockResponse(prompt);
  }

  return callProviderWithCircuitBreaker(
    'gemini-api',
    async () => {
      console.log('Calling Gemini API...');
      const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
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

// Hugging Face API provider
export async function callHuggingFaceAPI(prompt: string): Promise<string> {
  if (!HUGGINGFACE_API_KEY) {
    console.warn('Hugging Face API key not configured');
    return getMockResponse(prompt);
  }

  return callProviderWithCircuitBreaker(
    'huggingface-api',
    async () => {
      console.log('Calling Hugging Face API...');
      const response = await fetch(HUGGINGFACE_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: {
            past_user_inputs: [],
            generated_responses: [],
            text: `${SYSTEM_PROMPT}\n\nUser: ${prompt}\n\nAssistant:`
          },
          parameters: {
            max_length: 200,
            temperature: 0.7,
            do_sample: true,
            pad_token_id: 50256
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
        reply = data[0].generated_text || data[0].conversation?.generated_responses?.[0] || '';
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

      console.log('Hugging Face succeeded');
      return reply;
    },
    getMockResponse(prompt) // Fallback if circuit breaker is open
  );
}

// Main provider selection logic
export async function tryProvidersWithCircuitBreaker(prompt: string): Promise<string> {
  // Skip local LLM in production (Vercel) since Ollama isn't available
  if (process.env.VERCEL) {
    console.log('Skipping local LLM in production, trying Gemini first');
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

// Mock response fallback
function getMockResponse(prompt: string): string {
  const mockResponses = {
    "hello": "Welcome to Fuaad's portfolio. I'm here to help you understand his work and projects.",
    "tech": "This site runs on Next.js 16 with TypeScript, Tailwind CSS, and MDX. Clean architecture with custom AI integration.",
    "fuaad": "Fuaad combines finance expertise with full-stack development, focusing on practical web applications and developer tools.",
    "rizzk": "RIZZK Calculator provides risk management tools for traders, built with Python and Streamlit for position sizing and analysis.",
    "80/20": "Fuaad applies the 80/20 principle to development: focus on core features that deliver maximum value, shipping MVPs in weeks.",
    "services": "Fuaad builds web applications, MVPs, custom dashboards, and developer utilities with a focus on practical solutions.",
    "portfolio": "This portfolio showcases Fuaad's projects including trading tools, web applications, and development frameworks."
  };

  const lower = prompt.toLowerCase();

  // Check for keywords
  for (const [key, response] of Object.entries(mockResponses)) {
    if (lower.includes(key)) {
      return response;
    }
  }

  // Default response
  return "I can help you learn about Fuaad's portfolio, projects, and technical expertise. What would you like to know?";
}