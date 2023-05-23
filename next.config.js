/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["tse3.mm.bing.net","lh3.googleusercontent.com"],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
};

module.exports = nextConfig;
