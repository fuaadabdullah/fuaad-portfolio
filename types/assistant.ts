export interface ContentEntry {
  slug: string;
  title: string;
  summary: string;
  keyPoints: string[];
}

export interface FaqEntry {
  trigger: string[];
  answer: string;
}
