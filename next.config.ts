import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.mastersunion.org" },
      { protocol: "https", hostname: "files.mastersunion.link" },
      { protocol: "https", hostname: "shop.mastersunion.org" },
    ],
  },
};

export default nextConfig;
