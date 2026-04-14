import projects from "@/data/projects";

export type CvSection = {
  title: string;
  body: string[];
};

export type CvProject = {
  title: string;
  subtitle: string;
  context: string;
  problem?: string;
  audienceAndStakes?: string;
  approach?: string;
  tradeoffs?: string;
  learnings?: string[];
  impact?: string;
  tech: string[];
  links?: { live?: string; source?: string };
};

const selectedProjectSlugs = [
  "rizzk-calculator",
  "goblin-assistant",
  "gradem8",
  "personal-portfolio-site",
] as const;

const selectedProjects: CvProject[] = selectedProjectSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is NonNullable<typeof project> => Boolean(project))
  .map((project) => ({
    title: project.title,
    subtitle: project.tagline,
    context: `${project.role ?? "Solo builder"} · ${project.timeline ?? "Independent project"}`,
    problem: project.problem,
    audienceAndStakes: project.audienceAndStakes,
    approach: project.approach,
    tradeoffs: project.tradeoffs,
    learnings: project.learnings,
    impact: project.impact,
    tech: project.tech,
    links: project.links,
  }));

export const cvData = {
  header: {
    name: "Fuaad Abdullah",
    title: "Curriculum Vitae",
    tagline:
      "Finance student and developer exploring trading systems, applied decision-making, and production software as a form of real-world problem solving.",
    pdfHref: "/Fuaad_Abdullah_CV.pdf",
    resumeHref: "/resume",
    emailHref: "mailto:fuaadabdullah@gmail.com",
    linkedInHref: "https://www.linkedin.com/in/fuaadabdullah",
    githubHref: "https://github.com/fuaadabdullah",
  },
  summary: {
    title: "Academic purpose",
    paragraphs: [
      "My work sits at the intersection of finance, disciplined decision-making, and software systems. Trading pushed me toward questions about risk, information quality, and repeatable process; building tools became the way I test those questions against real behavior instead of leaving them abstract.",
      "I am especially interested in environments that reward intellectual curiosity plus execution: define a real problem, choose a tractable scope, build something measurable, and use the results to refine the next decision.",
    ],
  },
  education: {
    institution: "Georgia State University",
    degree: "B.B.A., Finance",
    years: "2020 – 2025",
    coursework: ["Financial Accounting", "Business Technology", "Marketing Principles"],
    honors: [] as string[],
    gpa: undefined as string | undefined,
    notes: [
      "Academic record fields are structured to support graduate-school applications and can be expanded with GPA, honors, and additional coursework when finalized.",
    ],
  },
  sections: [
    {
      title: "Why I build",
      body: [
        "Finance taught me to think in incentives, risk, and constrained decisions. Trading made those abstractions immediate: every mistake has a cost, every process gap compounds, and every edge depends on disciplined review.",
        "Software became the natural extension of that mindset. I build tools to make uncertain workflows more legible, testable, and repeatable, whether the user is a trader sizing risk, a teacher grading faster, or a small team trying to move from messy inputs to clearer decisions.",
      ],
    },
    {
      title: "Areas of interest",
      body: [
        "Applied decision systems, fintech product design, workflow automation, model-assisted interfaces, and the translation of domain knowledge into usable tools.",
      ],
    },
  ] as CvSection[],
  projects: selectedProjects,
  certifications: [
    "Excel Quick Tips — LinkedIn Learning (Sep 2025)",
    "Creating Your Personal Brand — LinkedIn Learning (Oct 2025)",
  ],
};
