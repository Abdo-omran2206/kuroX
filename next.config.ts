import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "cdn.myanimelist.net", // السماح بصور MyAnimeList
    ],
    unoptimized: true, 
  },
  reactStrictMode: true,
};

export default nextConfig;
