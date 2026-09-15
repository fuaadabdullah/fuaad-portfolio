// AI provider configuration
// TinyLlama runs only on the Oracle Cloud Ollama host (deploy/oracle-ollama). With OLLAMA_BASE_URL
// unset there is no model at all; nothing falls back to a localhost Ollama.
const OLLAMA_BASE_URL = (process.env.OLLAMA_BASE_URL ?? '').trim().replace(/\/+$/, '');

export const AI_CONFIG = {
  OLLAMA: {
    // Server-side only. Never expose this URL or key to the browser.
    BASE_URL: OLLAMA_BASE_URL,
    URL: OLLAMA_BASE_URL ? `${OLLAMA_BASE_URL}/api/chat` : '',
    // Bearer token checked by the Caddy proxy on the Oracle host
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
