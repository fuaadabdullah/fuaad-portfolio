// AI provider configuration
export const AI_CONFIG = {
  LOCAL_LLM: {
    URL: 'http://localhost:11434/api/chat',
    TIMEOUT: 8000,
    MODEL: 'tinyllama:1.1b'
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