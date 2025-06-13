// next.config.mjs

import { i18n } from './next-i18next.config.js'; // Note the .js extension for the imported file

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  // Add any other Next.js configurations you have here
};

export default nextConfig;
