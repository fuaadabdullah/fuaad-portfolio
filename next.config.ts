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
    // Add remotePatterns if you host screenshots on a CDN or external host later
    // remotePatterns: [
    //   { protocol: "https", hostname: "raw.githubusercontent.com" },
    //   { protocol: "https", hostname: "user-images.githubusercontent.com" },
    //   { protocol: "https", hostname: "*.azurewebsites.net" },
    // ],
  },
  // Silence the multiple lockfiles warning
  // @ts-ignore - turbopack.root is valid but not in types yet
  turbopack: {
    root: __dirname,
  }
};

export default nextConfig;
