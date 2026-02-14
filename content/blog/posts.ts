export type BlogFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  category: "essay" | "release-note" | "tutorial";
  tags?: string[];
};

export type BlogPostModule = {
  default: (props: { components?: Record<string, unknown> }) => JSX.Element;
  frontmatter?: BlogFrontmatter;
};

export const blogPosts = [
  {
    slug: "80-20-rule-student-projects",
    load: () => import("./80-20-rule-student-projects.mdx"),
  },
  { slug: "building-rizzk", load: () => import("./building-rizzk.mdx") },
  { slug: "portfolio-v1-release", load: () => import("./portfolio-v1-release.mdx") },
] as const;

export type BlogSlug = (typeof blogPosts)[number]["slug"];

export function getAllBlogSlugs(): BlogSlug[] {
  return blogPosts.map((p) => p.slug);
}

export function getBlogPostEntry(slug: string) {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}

export async function getAllBlogPostMeta(): Promise<
  Array<{ slug: BlogSlug; frontmatter: BlogFrontmatter }>
> {
  const loaded = await Promise.all(
    blogPosts.map(async (p) => {
      const mod = (await p.load()) as BlogPostModule;
      const fm = mod.frontmatter;
      if (!fm) {
        throw new Error(`Missing frontmatter export in ${p.slug}.mdx`);
      }
      return { slug: p.slug, frontmatter: fm };
    })
  );

  return loaded
    .slice()
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

