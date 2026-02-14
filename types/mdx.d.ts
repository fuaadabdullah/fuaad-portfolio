import type { BlogFrontmatter } from "@/content/blog/posts";

declare module "*.mdx" {
  export const frontmatter: BlogFrontmatter;
  const MDXComponent: (props: { components?: Record<string, unknown> }) => JSX.Element;
  export default MDXComponent;
}

