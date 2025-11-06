import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: { 
    optimizeCss: true
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
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://platform.linkedin.com https://www.linkedin.com https://va.vercel-scripts.com",
              "frame-src https://www.linkedin.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://vitals.vercel-insights.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
  // Silence the multiple lockfiles warning
  // @ts-ignore - turbopack.root is valid but not in types yet
  turbopack: {
    root: __dirname,
  }
};

export default nextConfig;
