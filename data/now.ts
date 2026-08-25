export type NowActivity = {
  building: string;
  detail?: string;
  shipped: string[];
  next?: string;
  updatedAt: string; // YYYY-MM-DD — update this whenever you edit the file
};

export const nowActivity: NowActivity = {
  building: "GoblinOS case study — agent workflow panels, demo GIFs, and observability write-up",
  detail:
    "Full architecture documentation and multi-provider routing deep-dive.",
  shipped: [
    "GoblinOS Assistant — multi-provider AI agent with provider health monitoring",
    "GradeM8 — AI document grading pipeline with Llama 2 rubric-based feedback",
    "RIZZK Calculator — position sizing and risk/reward math tool",
  ],
  next: "Forge — options flow screener with real-time Greeks dashboard",
  updatedAt: "2026-08-25",
};
