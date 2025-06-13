// next.config.js

const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  // Add any other Next.js configurations you have here
};

module.exports = nextConfig;
