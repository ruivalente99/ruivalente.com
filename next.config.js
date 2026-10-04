const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@ruivalente99/bibliotheca'],
  images: { unoptimized: true },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  poweredByHeader: false,
  async headers() {
    return [
      {
        // JSON endpoints are data for the UI, not pages: keep them out of search results.
        source: '/api/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        // Static images and icons from /public: cache for a day, serve stale while revalidating.
        source: '/:all*(svg|webp|png|jpg|jpeg|ico)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
