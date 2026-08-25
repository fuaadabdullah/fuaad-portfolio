// app/sitemap.ts
// Dynamically generates sitemap with all pages, portfolio projects, and blog posts
import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";
import projects from "@/data/projects";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://heyimfuaad.me";
  const defaultBlogSlugs = [
    "goblinos-assistant-release",
    "portfolio-v1-release",
    "building-rizzk",
    "performance-tips",
    "80-20-rule-student-projects",
  ];

  const portfolioUrls: MetadataRoute.Sitemap = projects.map(project => ({
    url: `${base}/portfolio/${project.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const blogSlugs = getAllSlugs();
    blogUrls = blogSlugs.map(slug => ({
      url: `${base}/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    blogUrls = defaultBlogSlugs.map(slug => ({
      url: `${base}/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  }
  
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/portfolio`, changeFrequency: "weekly" },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/resume`, changeFrequency: "monthly" },
    { url: `${base}/cv`, changeFrequency: "monthly" },
    { url: `${base}/services`, changeFrequency: "monthly" },
    ...portfolioUrls,
    ...blogUrls,
  ];
}
