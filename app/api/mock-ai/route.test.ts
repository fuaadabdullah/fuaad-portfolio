import { describe, it, expect } from 'vitest';

describe('Mock AI API Route', () => {
  describe('POST /api/mock-ai', () => {
    it('should return mock response for hello', async () => {
      const { POST } = await import('../mock-ai/route');

      const request = new Request('http://localhost/api/mock-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'hello' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.reply).toBe('Hello! I\'m the portfolio assistant. How can I help you learn about Fuaad\'s work?');
    });

    it('should return mock response for tech', async () => {
      const { POST } = await import('../mock-ai/route');

      const request = new Request('http://localhost/api/mock-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'tech' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.reply).toBe('This portfolio uses Next.js 16, TypeScript, Tailwind CSS, MDX for blogs, and custom tooling.');
    });

    it('should return mock response for fuaad', async () => {
      const { POST } = await import('../mock-ai/route');

      const request = new Request('http://localhost/api/mock-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'fuaad' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.reply).toBe('Fuaad is a finance major and full-stack developer who specializes in web apps, MVP tooling, and custom dashboards.');
    });

    it('should return mock response for rizzk', async () => {
      const { POST } = await import('../mock-ai/route');

      const request = new Request('http://localhost/api/mock-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'rizzk' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.reply).toBe('RIZZK Calculator is a risk management tool for day traders, built with Python and Streamlit. It helps with position sizing and risk/reward calculations.');
    });

    it('should return mock response for 80/20', async () => {
      const { POST } = await import('../mock-ai/route');

      const request = new Request('http://localhost/api/mock-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: '80/20' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.reply).toBe('The 80/20 rule means focusing on the 20% of features that deliver 80% of the value. Fuaad uses this to ship production-ready projects in just 2 weeks.');
    });

    it('should return mock response for services', async () => {
      const { POST } = await import('../mock-ai/route');

      const request = new Request('http://localhost/api/mock-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'services' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.reply).toBe('Fuaad offers web app builds, MVP tooling, custom dashboards, and developer utilities.');
    });

    it('should return mock response for portfolio', async () => {
      const { POST } = await import('../mock-ai/route');

      const request = new Request('http://localhost/api/mock-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'portfolio' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.reply).toBe('This is Fuaad\'s personal portfolio showcasing his projects like RIZZK Calculator, this website, and various development tools.');
    });

    it('should return default response for unknown prompt', async () => {
      const { POST } = await import('../mock-ai/route');

      const request = new Request('http://localhost/api/mock-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'unknown topic xyz' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.reply).toBe('I\'m here to help you learn about Fuaad\'s portfolio! Try asking about the tech stack, projects, or services.');
    });

    it('should handle case insensitive matching', async () => {
      const { POST } = await import('../mock-ai/route');

      const request = new Request('http://localhost/api/mock-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'HELLO' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.reply).toBe('Hello! I\'m the portfolio assistant. How can I help you learn about Fuaad\'s work?');
    });

    it('should handle partial keyword matches', async () => {
      const { POST } = await import('../mock-ai/route');

      const request = new Request('http://localhost/api/mock-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'tell me about the technology' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.reply).toBe('This portfolio uses Next.js 16, TypeScript, Tailwind CSS, MDX for blogs, and custom tooling.');
    });

    it('should return valid JSON response', async () => {
      const { POST } = await import('../mock-ai/route');

      const request = new Request('http://localhost/api/mock-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'test' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('reply');
      expect(typeof data.reply).toBe('string');
      expect(data.reply.length).toBeGreaterThan(0);
    });
  });
});