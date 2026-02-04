import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  distDir: 'dist',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;



