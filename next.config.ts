import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'headless.designpulp.net',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'designpulp.net',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
