import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "cdn.myanimelist.net", // السماح بصور MyAnimeList
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
