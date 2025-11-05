// app/sitemap.ts
// Dynamically generates sitemap with all pages and blog posts
import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export default function sitemap(): MetadataRoute.Sitemap {
  // Prefer env-configured site URL; fall back to localhost in dev
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  // Get all blog post slugs dynamically
  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const blogSlugs = getAllSlugs();
    blogUrls = blogSlugs.map(slug => ({
      url: `${base}/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    // Fallback: manually list blog posts if fs operations fail in production
    const manualSlugs = [
      "building-rizzk",
      "portfolio-v1-release",
      "80-20-rule-student-projects",
    ];
    blogUrls = manualSlugs.map(slug => ({
      url: `${base}/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  }
  
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/portfolio`, changeFrequency: "weekly" },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/resume`, changeFrequency: "monthly" },
    { url: `${base}/services`, changeFrequency: "monthly" },
    ...blogUrls,
  ];
}
