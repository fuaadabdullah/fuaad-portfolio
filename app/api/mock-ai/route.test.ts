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
      expect(data.reply).toBe('I can walk you through Fuaad\'s projects, tech stack, or how to get in touch. Check out his [featured projects](/portfolio) or [learn more about his background](/about).');
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
      expect(data.reply).toBe('This site runs on Next.js 16 with TypeScript, Tailwind CSS, and MDX. Clean architecture with custom AI integration. Explore the [technical details](/about) or see the [live projects](/portfolio).');
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
      expect(data.reply).toBe('Fuaad combines finance expertise with full-stack development, focusing on practical web applications and developer tools. View his [professional background](/about) or [contact him directly](/resume).');
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
      expect(data.reply).toBe('RIZZK Calculator provides risk management tools for traders. Built with Python and Streamlit for position sizing and analysis. Try the [live demo](https://rizzk.streamlit.app) or see [more projects](/portfolio).');
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
      expect(data.reply).toBe('Fuaad applies the 80/20 principle to development: focus on core features that deliver maximum value, shipping MVPs in weeks. Read his [blog post about this approach](/blog/80-20-rule-student-projects) or [view his services](/services).');
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
      expect(data.reply).toBe('Fuaad builds web applications, MVPs, custom dashboards, and developer utilities. Focus on practical solutions. See his [service offerings](/services) or [get in touch to discuss your project](/resume).');
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
      expect(data.reply).toBe('This portfolio showcases Fuaad\'s projects including trading tools, web applications, and development frameworks. Browse the [full portfolio](/portfolio) or [download his resume](/resume).');
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
      expect(data.reply).toBe('I\'m here to help you learn about Fuaad\'s portfolio! Try asking about the tech stack, projects, or services. Check out his [featured projects](/portfolio) or [learn more about his background](/about).');
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
      expect(data.reply).toBe('I can walk you through Fuaad\'s projects, tech stack, or how to get in touch. Check out his [featured projects](/portfolio) or [learn more about his background](/about).');
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
      expect(data.reply).toBe('This site runs on Next.js 16 with TypeScript, Tailwind CSS, and MDX. Clean architecture with custom AI integration. Explore the [technical details](/about) or see the [live projects](/portfolio).');
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