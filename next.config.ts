import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // @ts-expect-error
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
