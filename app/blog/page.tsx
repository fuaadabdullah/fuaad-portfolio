import Link from "next/link";
import { getAllPosts, formatDate, type BlogPostMetadata } from "@/lib/blog";
import { categoryColors, formatCategoryName } from "@/lib/blog-constants";

export const metadata = {
  title: "Blog - Fuaad Abdullah",
  description: "Insights on trading, development, and building useful tools.",
  openGraph: {
    title: "Blog - Fuaad Abdullah",
    description: "Insights on trading, development, and building useful tools.",
    images: ["/og-default.png"]
  }
};

function BlogPostCard({ post }: { post: BlogPostMetadata }) {
  return (
  <article className="border border-white/10 rounded-lg p-6 hover:border-[color:var(--color-accent)]/50 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <span className={`text-xs font-medium px-2 py-1 rounded border ${categoryColors[post.category]}`}>
          {formatCategoryName(post.category)}
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
        className="inline-flex items-center gap-1 mt-4 text-[color:var(--color-accent)] hover:underline text-sm font-medium"
      >
        Read more →
      </Link>
    </article>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Blog</h1>
      <p className="text-white/80 mt-3 mb-8">
        Essays, release notes, and tutorials on building disciplined tools.
      </p>

      {posts.length === 0 ? (
        <div className="border border-white/10 rounded-lg p-12 text-center">
          <p className="text-white/60 mb-4">No posts yet. Check back soon!</p>
          <Link href="/" className="text-[color:var(--color-accent)] hover:underline">
            ← Back to home
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
