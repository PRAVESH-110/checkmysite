import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  distDir: 'dist',
};

export default nextConfig;
