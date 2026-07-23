/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  useLightningcss: false,
  env: {
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    NOTION_PORTFOLIO_DB: process.env.NOTION_PORTFOLIO_DB,
    NOTION_BLOG_DB: process.env.NOTION_BLOG_DB,
    MINIMAX_API_KEY: process.env.MINIMAX_API_KEY,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com' },
      { protocol: 'https', hostname: '*.notion.so' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

module.exports = nextConfig;
