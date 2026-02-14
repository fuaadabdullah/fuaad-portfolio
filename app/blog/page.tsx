import Link from "next/link";
import { getAllBlogPostMeta } from "@/content/blog/posts";
import { formatDate } from "@/lib/date";
import Badge from "@/components/Badge";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Blog - Fuaad Abdullah",
  description: "Insights on trading, development, and building useful tools.",
  openGraph: {
    title: "Blog - Fuaad Abdullah",
    description: "Insights on trading, development, and building useful tools.",
    images: ["/og-default.png"]
  }
};

function categoryLabel(category: BlogPostMetadata["category"]): string {
  if (category === "release-note") return "Release Note";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function categoryVariant(category: BlogPostMetadata["category"]): "default" | "success" | "outline" {
  if (category === "tutorial") return "success";
  if (category === "release-note") return "default";
  return "outline";
}

function BlogPostCard({ post }: { post: BlogPostMetadata }) {
  return (
  <article className="border border-white/10 rounded-lg p-6 hover:border-[color:var(--color-accent)]/50 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <Badge variant={categoryVariant(post.category)}>
          {categoryLabel(post.category)}
        </Badge>
        <time className="text-sm text-white/60">{formatDate(post.date)}</time>
      </div>
      
      <Link href={`/blog/${post.slug}`} className="group">
        <h2 className="text-2xl font-semibold mb-2 group-hover:text-[color:var(--color-accent)] transition-colors">
          {post.title}
        </h2>
      </Link>
      
      <p className="text-white/80 mb-4 line-clamp-2">{post.excerpt}</p>
      
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <Badge key={tag} variant="outline" className="border-white/10 text-white/70 bg-white/0">
              #{tag}
            </Badge>
          ))}
        </div>
      )}
      
      <Link
        href={`/blog/${post.slug}`}
        className="inline-flex items-center gap-1 mt-4 text-[color:var(--color-accent)] hover:underline text-sm font-medium"
      >
        Read more →
      </Link>
    </article>
  );
}

type BlogPostMetadata = Awaited<ReturnType<typeof getAllBlogPostMeta>>[number]["frontmatter"] & {
  slug: string;
};

function toPostMeta(p: Awaited<ReturnType<typeof getAllBlogPostMeta>>[number]): BlogPostMetadata {
  return { slug: p.slug, ...p.frontmatter };
}

export default async function BlogPage() {
  const posts = (await getAllBlogPostMeta()).map(toPostMeta);

  return (
    <Container size="default" className="py-16">
      <PageHeader
        title="Blog"
        description="Essays, release notes, and tutorials on building disciplined tools."
      />

      {posts.length === 0 ? (
        <div className="border border-white/10 rounded-lg p-12 text-center">
          <p className="text-white/60 mb-4">No posts yet. Check back soon!</p>
          <Link href="/" className="text-[color:var(--color-accent)] hover:underline">
            ← Back to home
          </Link>
        </div>
      ) : (
        <div className="mt-10 space-y-6">
          {posts.map(post => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </Container>
  );
}
