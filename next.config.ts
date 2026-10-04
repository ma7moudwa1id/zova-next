import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  redirects: async () => [
    {
      source: "/allorders",
      destination: "/orders",
      permanent: true,
    },
  ],
};

export default nextConfig;
