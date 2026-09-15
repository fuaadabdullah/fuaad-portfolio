import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { getAllPosts, formatDate, type BlogPostMetadata } from "@/lib/blog";

export const metadata = {
  title: "Blog - Fuaad Abdullah",
  description: "Insights on trading, development, and building useful tools.",
  openGraph: {
    title: "Blog - Fuaad Abdullah",
    description: "Insights on trading, development, and building useful tools.",
    images: ["/og-default.png"]
  }
};

const categoryColors = {
  essay: "bg-[var(--color-accent-soft)] text-[var(--color-accent)] border-[var(--color-border)]",
  "release-note": "bg-[var(--color-accent-soft)] text-[var(--color-accent)] border-[var(--color-border)]",
  tutorial: "bg-[var(--color-accent-soft)] text-[var(--color-accent)] border-[var(--color-border)]",
};

function BlogPostCard({ post }: { post: BlogPostMetadata }) {
  return (
  <article className="border-t border-[var(--color-border)] py-8 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <span className={`text-xs font-medium px-2 py-1 rounded border ${categoryColors[post.category]}`}>
          {post.category === "release-note" ? "Release Note" : post.category.charAt(0).toUpperCase() + post.category.slice(1)}
        </span>
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
            <span key={tag} className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      <Link
        href={`/blog/${post.slug}`}
        className="inline-flex items-center gap-1 mt-4 text-[var(--color-accent)] hover:underline text-sm font-medium"
      >
        Read more →
      </Link>
    </article>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="page-shell">
      <PageHeader label="Notes from the work" title="Thinking out loud."><p>Essays, release notes, and tutorials on building disciplined tools.</p></PageHeader>

      {posts.length === 0 ? (
        <div className="border border-white/10 rounded-lg p-12 text-center">
          <p className="text-white/60 mb-4">No posts yet. Check back soon!</p>
          <Link href="/" className="text-[color:var(--color-accent)] hover:underline">
            ← Back to home
          </Link>
        </div>
      ) : (
        <div className="max-w-3xl">
          {posts.map(post => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
