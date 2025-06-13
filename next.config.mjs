// next.config.mjs

import nextI18nextConfig from './next-i18next.config.mjs'; // Note the .mjs extension

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: nextI18nextConfig.i18n,
  // Add any other Next.js configurations you have here
};

export default nextConfig;
