// AI provider implementations with circuit breaker protection
import { callProviderWithCircuitBreaker } from './circuit-breaker';

// Configuration
const LOCAL_LLM_URL = 'http://localhost:11434/api/chat';
const LOCAL_TIMEOUT = 8000; // 8 seconds
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

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
              content: `You are a helpful assistant for a portfolio website.
                     Keep responses concise (2-3 sentences max).
                     Be friendly and professional.`
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
              text: `You are a portfolio assistant. Reply briefly (1-2 sentences).
                   User question: ${prompt}`
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
    "hello": "Hello! I'm the portfolio assistant. How can I help you learn about Fuaad's work?",
    "tech": "This portfolio uses Next.js 16, TypeScript, Tailwind CSS, MDX for blogs, and custom tooling.",
    "fuaad": "Fuaad is a finance major and full-stack developer who specializes in web apps, MVP tooling, and custom dashboards.",
    "rizzk": "RIZZK Calculator is a risk management tool for day traders, built with Python and Streamlit. It helps with position sizing and risk/reward calculations.",
    "80/20": "The 80/20 rule means focusing on the 20% of features that deliver 80% of the value. Fuaad uses this to ship production-ready projects in just 2 weeks.",
    "services": "Fuaad offers web app builds, MVP tooling, custom dashboards, and developer utilities.",
    "portfolio": "This is Fuaad's personal portfolio showcasing his projects like RIZZK Calculator, this website, and various development tools."
  };

  const lower = prompt.toLowerCase();

  // Check for keywords
  for (const [key, response] of Object.entries(mockResponses)) {
    if (lower.includes(key)) {
      return response;
    }
  }

  // Default response
  return "I'm here to help you learn about Fuaad's portfolio! Try asking about the tech stack, projects, or services.";
}