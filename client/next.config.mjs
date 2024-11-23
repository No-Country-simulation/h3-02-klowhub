import createNextIntlPlugin from 'next-intl/plugin';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  outputFileTracingRoot: path.join(__dirname, ".next"),
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
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(mjs|cjs)$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  }
};

export default withNextIntl(config);
