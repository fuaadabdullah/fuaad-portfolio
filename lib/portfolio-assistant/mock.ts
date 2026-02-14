const mockResponses: Record<string, string> = {
  hello: "Hello! I'm the portfolio assistant. How can I help you learn about Fuaad's work?",
  tech: "This portfolio uses Next.js 16, TypeScript, Tailwind CSS, MDX for blogs, and custom tooling.",
  fuaad:
    "Fuaad is a finance major and full-stack developer who specializes in web apps, MVP tooling, and custom dashboards.",
  rizzk:
    "RIZZK Calculator is a risk management tool for day traders, built with Python and Streamlit. It helps with position sizing and risk/reward calculations.",
  goblin:
    "GoblinOS Assistant is a multi-provider, privacy-first AI assistant platform with intelligent model routing. It includes a FastAPI backend, a React + Vite frontend, and production deployment tooling.",
  "80/20":
    "The 80/20 rule means focusing on the 20% of features that deliver 80% of the value. Fuaad uses this to ship production-ready projects in just 2 weeks.",
  services: "Fuaad offers web app builds, MVP tooling, custom dashboards, and developer utilities.",
  portfolio:
    "This is Fuaad's personal portfolio showcasing projects like RIZZK Calculator, GoblinOS Assistant, this website, and various development tools.",
};

export function fallbackMockReply(prompt: string): string {
  const lower = prompt.toLowerCase();
  for (const [key, response] of Object.entries(mockResponses)) {
    if (lower.includes(key)) return response;
  }
  return "I'm here to help you learn about Fuaad's portfolio! Try asking about the tech stack, projects, or services.";
}

