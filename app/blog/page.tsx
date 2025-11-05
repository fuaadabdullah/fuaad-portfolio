import Link from "next/link";
import { getAllPosts, formatDate, type BlogPostMetadata } from "@/lib/blog";

export const metadata = {
  title: "Blog — Fuaad Abdullah",
  description: "Essays, release notes, and tutorials on building disciplined tools for traders and students.",
  openGraph: {
    title: "Blog — Fuaad Abdullah",
    description: "Essays, release notes, and tutorials on building disciplined tools for traders and students.",
    images: ["/og-default.png"],
  },
};

const categoryColors = {
  essay: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "release-note": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  tutorial: "bg-green-500/20 text-green-300 border-green-500/30",
};

function BlogPostCard({ post }: { post: BlogPostMetadata }) {
  return (
    <article className="border border-white/10 rounded-lg p-6 hover:border-[#16a34a]/50 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <span className={`text-xs font-medium px-2 py-1 rounded border ${categoryColors[post.category]}`}>
          {post.category === "release-note" ? "Release Note" : post.category.charAt(0).toUpperCase() + post.category.slice(1)}
        </span>
        <time className="text-sm text-white/60">{formatDate(post.date)}</time>
      </div>
      
      <Link href={`/blog/${post.slug}`} className="group">
        <h2 className="text-2xl font-semibold mb-2 group-hover:text-[#16a34a] transition-colors">
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
        className="inline-flex items-center gap-1 mt-4 text-[#16a34a] hover:underline text-sm font-medium"
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
          <Link href="/" className="text-[#16a34a] hover:underline">
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
