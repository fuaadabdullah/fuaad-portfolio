// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://YOURDOMAIN.com"; // TODO: replace when domain is set
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/portfolio`, changeFrequency: "weekly" },
    { url: `${base}/resume`, changeFrequency: "monthly" },
    { url: `${base}/services`, changeFrequency: "monthly" },
  ];
}
