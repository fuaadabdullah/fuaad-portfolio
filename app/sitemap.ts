// app/sitemap.ts
// Dynamically generates sitemap with all pages and blog posts
import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  // Prefer env-configured site URL; fall back to localhost in dev
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  // Get all blog post slugs
  const blogSlugs = getAllSlugs();
  const blogUrls = blogSlugs.map(slug => ({
    url: `${base}/blog/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/portfolio`, changeFrequency: "weekly" },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/resume`, changeFrequency: "monthly" },
    { url: `${base}/services`, changeFrequency: "monthly" },
    ...blogUrls,
  ];
}
