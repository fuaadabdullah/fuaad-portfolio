import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Allow optimized images from common CDNs used in this project
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  // Serve one canonical host: www.heyimfuaad.me permanently redirects to the apex domain
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.heyimfuaad.me" }],
        destination: "https://heyimfuaad.me/:path*",
        permanent: true,
      },
    ];
  },
  // CSP headers for LinkedIn badge integration
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              `script-src 'self' 'unsafe-inline' ${process.env.NODE_ENV === "production" ? "" : "'unsafe-eval'"} https://platform.linkedin.com https://www.linkedin.com https://va.vercel-scripts.com https://badges.linkedin.com`,
              "frame-src https://www.linkedin.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://vitals.vercel-insights.com",
            ].join("; "),
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
                    // Ensure pages are indexable by search engines in production
          {
            key: "X-Robots-Tag",
            value: process.env.VERCEL_ENV === "production" ? "index, follow" : "noindex",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
