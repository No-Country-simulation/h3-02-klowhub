import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/core/lib/i18n.ts');

/** @type {import('next').NextConfig} */
const config = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['@silvermine/videojs-quality-selector'],
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default withNextIntl(config);
