import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jonixair.com',
      },
      {
        protocol: 'https',
        hostname: 'cms.bconsole.com',
      },
      {
        protocol: 'https',
        hostname: 'www.jonixair.ie',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
};

export default withNextIntl(nextConfig);
