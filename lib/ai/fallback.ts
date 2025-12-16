// Mock response fallback utilities
export const MOCK_RESPONSES = {
  "hello": "Welcome to Fuaad's portfolio. I'm here to help you understand his work and projects.",
  "tech": "This site runs on Next.js 16 with TypeScript, Tailwind CSS, and MDX. Clean architecture with custom AI integration.",
  "fuaad": "Fuaad combines finance expertise with full-stack development, focusing on practical web applications and developer tools.",
  "rizzk": "RIZZK Calculator provides risk management tools for traders, built with Python and Streamlit for position sizing and analysis.",
  "80/20": "Fuaad applies the 80/20 principle to development: focus on core features that deliver maximum value, shipping MVPs in weeks.",
  "services": "Fuaad builds web applications, MVPs, custom dashboards, and developer utilities with a focus on practical solutions.",
  "portfolio": "This portfolio showcases Fuaad's projects including trading tools, web applications, and development frameworks."
} as const;

export function getMockResponse(prompt: string): string {
  const lower = prompt.toLowerCase();

  // Check for keywords
  for (const [key, response] of Object.entries(MOCK_RESPONSES)) {
    if (lower.includes(key)) {
      return response;
    }
  }

  // Default response
  return "I can help you learn about Fuaad's portfolio, projects, and technical expertise. What would you like to know?";
}