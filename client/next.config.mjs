import createNextIntlPlugin from 'next-intl/plugin';

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
  }
};

export default withNextIntl(config);
