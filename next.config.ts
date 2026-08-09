import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75, 85],
  },
  pageExtensions: ['ts', 'tsx'],
};

export default nextConfig;
