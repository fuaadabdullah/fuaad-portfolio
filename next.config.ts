import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: { 
    optimizeCss: true
  },
  // Silence the multiple lockfiles warning
  // @ts-ignore - turbopack.root is valid but not in types yet
  turbopack: {
    root: __dirname,
  }
};

export default nextConfig;
