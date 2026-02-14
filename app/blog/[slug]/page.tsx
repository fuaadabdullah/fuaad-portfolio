import { notFound } from "next/navigation";
import Link from "next/link";
import { type Metadata } from "next";
import { getAllBlogSlugs, getBlogPostEntry, type BlogPostModule } from "@/content/blog/posts";
import { getMDXComponents } from "@/mdx-components";
import { formatDate } from "@/lib/date";
import { BlogCTA } from "@/components/BlogCTA";
import Badge from "@/components/Badge";
import Container from "@/components/layout/Container";

type Category = NonNullable<BlogPostModule["frontmatter"]>["category"];

function categoryLabel(category: Category): string {
  if (category === "release-note") return "Release Note";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function categoryVariant(category: Category): "default" | "success" | "outline" {
  if (category === "tutorial") return "success";
  if (category === "release-note") return "default";
  return "outline";
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getBlogPostEntry(slug);
  if (!entry) {
    return { title: "Post Not Found — Fuaad Abdullah" };
  }

  const mod = (await entry.load()) as BlogPostModule;
  const fm = mod.frontmatter;
  if (!fm) {
    return { title: "Post Not Found — Fuaad Abdullah" };
  }

  return {
    title: `${fm.title} — Fuaad Abdullah`,
    description: fm.excerpt,
    openGraph: {
      title: fm.title,
      description: fm.excerpt,
      type: "article",
      publishedTime: fm.date,
      authors: ["Fuaad Abdullah"],
      images: ["/og-default.png"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getBlogPostEntry(slug);
  if (!entry) {
    notFound();
  }

  const mod = (await entry.load()) as BlogPostModule;
  const Content = mod.default;
  const fm = mod.frontmatter;
  if (!fm) {
    notFound();
  }

  return (
    <Container size="narrow" className="py-16">
      <article>
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-white/60 hover:text-[color:var(--color-accent)] transition-colors mb-8"
      >
        ← Back to blog
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant={categoryVariant(fm.category)}>
            {categoryLabel(fm.category)}
          </Badge>
          <time className="text-sm text-white/60">{formatDate(fm.date)}</time>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          {fm.title}
        </h1>

        {fm.excerpt && (
          <p className="text-xl text-white/80 leading-relaxed">{fm.excerpt}</p>
        )}

        {fm.tags && fm.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {fm.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-white/10 text-white/70 bg-white/0">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <div className="mt-10">
        <Content components={getMDXComponents({})} />
      </div>

      <BlogCTA variant="services" />

      <footer className="mt-12 pt-8 border-t border-white/10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-[color:var(--color-accent)] hover:underline font-medium"
        >
          ← Back to all posts
        </Link>
      </footer>
      </article>
    </Container>
  );
}
