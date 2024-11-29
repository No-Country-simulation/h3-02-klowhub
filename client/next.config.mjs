import createNextIntlPlugin from 'next-intl/plugin';
import {join, dirname} from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const withNextIntl = createNextIntlPlugin('./src/core/lib/i18n.ts');

/** @type {import('next').NextConfig} */
const config = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  output:"standalone",
  outputFileTracingRoot: join(__dirname, ".next"),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.cloud.google.com',
        pathname: '/klowhub-mediafiles/*',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/klowhub-mediafiles/*',
      },
    ],
  },
  transpilePackages: ['@silvermine/videojs-quality-selector'],
};

export default withNextIntl(config);
