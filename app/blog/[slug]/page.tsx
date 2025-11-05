import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getPostBySlug, formatDate } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const categoryColors = {
  essay: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "release-note": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  tutorial: "bg-green-500/20 text-green-300 border-green-500/30",
};

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} — Fuaad Abdullah`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Fuaad Abdullah"],
      images: ["/og-default.png"],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const components = useMDXComponents({});

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-white/60 hover:text-[#16a34a] transition-colors mb-8"
      >
        ← Back to blog
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs font-medium px-2 py-1 rounded border ${categoryColors[post.category]}`}>
            {post.category === "release-note" ? "Release Note" : post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </span>
          <time className="text-sm text-white/60">{formatDate(post.date)}</time>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-xl text-white/80 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-invert max-w-none">
        <MDXRemote
          source={post.content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeHighlight],
            },
          }}
        />
      </div>

      <footer className="mt-12 pt-8 border-t border-white/10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-[#16a34a] hover:underline font-medium"
        >
          ← Back to all posts
        </Link>
      </footer>
    </article>
  );
}
