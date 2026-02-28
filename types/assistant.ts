export type FaqEntry = {
  trigger: string[];
  answer: string;
};

export type ContentEntry = {
  slug: string;
  title: string;
  summary: string;
  keyPoints: string[];
};

export type AssistantContextPayload = {
  prompt: string;
  siteFacts: string;
  faq: FaqEntry[];
  blogContent: ContentEntry[];
  projectContent: ContentEntry[];
};
