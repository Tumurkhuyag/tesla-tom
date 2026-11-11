import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      // Tesla-ийн нийтийн CDN-ээс зураг татна
      new URL("https://digitalassets.tesla.com/tesla-contents/image/upload/**"),
      // Admin-аас upload хийсэн зургууд (Supabase Storage, lib/admin-shared.ts-тэй таарна)
      ...(process.env.NEXT_PUBLIC_SUPABASE_URL
        ? [new URL(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/**`)]
        : []),
    ],
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
