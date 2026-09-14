// AI provider configuration
const OLLAMA_BASE_URL = (process.env.OLLAMA_BASE_URL || 'http://localhost:11434').replace(/\/+$/, '');

export const AI_CONFIG = {
  LOCAL_LLM: {
    // Server-side only. Never expose this URL or key to the browser.
    BASE_URL: OLLAMA_BASE_URL,
    URL: `${OLLAMA_BASE_URL}/api/chat`,
    // Optional bearer token for an auth-enforcing reverse proxy in front of Ollama
    API_KEY: process.env.OLLAMA_API_KEY,
    TIMEOUT: 8000,
    MODEL: process.env.OLLAMA_MODEL || 'tinyllama:1.1b'
  },
  GEMINI: {
    URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
    API_KEY: process.env.GEMINI_API_KEY
  },
  HUGGINGFACE: {
    URL: 'https://api-inference.huggingface.co/models/gpt2',
    API_KEY: process.env.HUGGINGFACE_API_KEY
  }
} as const;
