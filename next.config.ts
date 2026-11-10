import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Tesla-ийн нийтийн CDN-ээс зураг татна
    remotePatterns: [new URL("https://digitalassets.tesla.com/tesla-contents/image/upload/**")],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
