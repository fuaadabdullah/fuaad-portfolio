import { NextRequest, NextResponse } from 'next/server';
import { siteFacts, faq } from '@/data/portfolio_knowledge';
import { blogContent, projectContent } from '@/data/site_content';

// Your local LLM endpoint
const LOCAL_LLM_URL = 'http://localhost:11434/api/chat';
const LOCAL_TIMEOUT = 8000; // 8 seconds

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// Rate limiting
let lastRequestTime = 0;
const RATE_LIMIT_MS = 500;

export async function POST(request: NextRequest) {
  // Rate limiting
  const now = Date.now();
  if (now - lastRequestTime < RATE_LIMIT_MS) {
    return NextResponse.json(
      { error: 'Please wait a moment before sending another message' },
      { status: 429 }
    );
  }
  lastRequestTime = now;

  try {
    const { prompt } = await request.json();

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Enrich prompt with context
    const enrichedPrompt = await enrichPrompt(prompt);

    // Try local LLM first, fallback to Gemini
    const reply = await tryLocalLLMThenGemini(enrichedPrompt);

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('AI API Error:', error);
    return getFallbackResponse();
  }
}

// ========== IMPLEMENTATION DETAILS ==========

async function tryLocalLLMThenGemini(prompt: string): Promise<string> {
  try {
    // First attempt: Local TinyLlama
    console.log('Attempting local LLM...');
    const localResponse = await fetchWithTimeout(LOCAL_LLM_URL, {
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

    if (localResponse.ok) {
      const data = await localResponse.json();
      console.log('Local LLM succeeded');
      return data.message?.content || data.response || 'I received your message.';
    }

    // Local failed, try Gemini
    throw new Error('Local LLM failed, trying Gemini...');

  } catch (error) {
    console.log('Local LLM failed, falling back to Gemini:', error instanceof Error ? error.message : String(error));
    return await callGeminiAPI(prompt);
  }
}

async function callGeminiAPI(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    console.warn('Gemini API key not configured');
    return getMockResponse(prompt);
  }

  try {
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
          maxOutputTokens: 150
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (reply) {
      console.log('Gemini succeeded');
      return reply;
    }

    throw new Error('No valid response from Gemini');

  } catch (error) {
    console.error('Gemini API failed:', error);
    return getMockResponse(prompt);
  }
}

async function enrichPrompt(userPrompt: string): Promise<string> {
  const lower = userPrompt.toLowerCase();

  // FAQ
  const matchedFaq = faq.find(f =>
    f.trigger.some(t => lower.includes(t))
  );
  const faqText = matchedFaq ? `FAQ Answer: ${matchedFaq.answer}` : '';

  // blog matches
  const matchedBlog = blogContent.find(b =>
    lower.includes(b.slug) || lower.includes(b.title.toLowerCase())
  );
  const blogText = matchedBlog
    ? `Blog: ${matchedBlog.title}\nSummary: ${matchedBlog.summary}\nKey points: ${matchedBlog.keyPoints.join(', ')}\n`
    : '';

  // project matches
  const matchedProject = projectContent.find(p =>
    lower.includes(p.slug) || lower.includes(p.title.toLowerCase())
  );
  const projectText = matchedProject
    ? `Project: ${matchedProject.title}\nSummary: ${matchedProject.summary}\nKey points: ${matchedProject.keyPoints.join(', ')}\n`
    : '';

  const fullContext = `
Portfolio Facts:
${siteFacts}

${faqText}

${blogText}

${projectText}

User: ${userPrompt}
Assistant:
`;

  return fullContext;
}

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

function getFallbackResponse() {
  return NextResponse.json({
    reply: "Sorry, something went wrong with the AI assistant. Please try again."
  });
}

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