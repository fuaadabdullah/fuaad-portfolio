// AI provider implementations with circuit breaker protection
import { callProviderWithCircuitBreaker } from './circuit-breaker';

// Configuration
const LOCAL_LLM_URL = 'http://localhost:11434/api/chat';
const LOCAL_TIMEOUT = 8000; // 8 seconds
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

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
              text: `${SYSTEM_PROMPT}\n\nUser question: ${prompt}`
            }]
          }],
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

// Main provider selection logic
export async function tryProvidersWithCircuitBreaker(prompt: string): Promise<string> {
  // Skip local LLM in production (Vercel) since Ollama isn't available
  if (process.env.VERCEL) {
    console.log('Skipping local LLM in production, going straight to Gemini');
    return await callGeminiAPI(prompt);
  }

  try {
    // First attempt: Local TinyLlama
    return await callLocalLLM(prompt);
  } catch (error) {
    console.log('Local LLM failed, falling back to Gemini:', error instanceof Error ? error.message : String(error));
    return await callGeminiAPI(prompt);
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