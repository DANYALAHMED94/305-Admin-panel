import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  typescript: {
    // ✅ This will ignore TypeScript errors during `next build`
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
