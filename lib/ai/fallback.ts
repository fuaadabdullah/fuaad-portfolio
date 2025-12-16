// Mock response fallback utilities
export const MOCK_RESPONSES = {
  "hello": "I can walk you through Fuaad's projects, tech stack, or how to get in touch. Check out his [featured projects](/portfolio) or [learn more about his background](/about).",
  "tech": "This site runs on Next.js 16 with TypeScript, Tailwind CSS, and MDX. Clean architecture with custom AI integration. Explore the [technical details](/about) or see the [live projects](/portfolio).",
  "fuaad": "Fuaad combines finance expertise with full-stack development. He focuses on practical web applications and developer tools. View his [professional background](/about) or [contact him directly](/resume).",
  "rizzk": "RIZZK Calculator provides risk management tools for traders. Built with Python and Streamlit for position sizing and analysis. Try the [live demo](https://rizzk.streamlit.app) or see [more projects](/portfolio).",
  "80/20": "Fuaad applies the 80/20 principle to development: focus on core features that deliver maximum value, shipping MVPs in weeks. Read his [blog post about this approach](/blog/80-20-rule-student-projects) or [view his services](/services).",
  "services": "Fuaad builds web applications, MVPs, custom dashboards, and developer utilities. Focus on practical solutions. See his [service offerings](/services) or [get in touch to discuss your project](/resume).",
  "portfolio": "This portfolio showcases Fuaad's projects including trading tools, web applications, and development frameworks. Browse the [full portfolio](/portfolio) or [download his resume](/resume)."
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
  return "I can help you learn about Fuaad's portfolio, projects, and technical expertise. What would you like to know? Check out his [featured projects](/portfolio) or [learn more about his background](/about).";
}