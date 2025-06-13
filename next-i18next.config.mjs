// next-i18next.config.mjs

const nextI18nextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr'], // Add all your supported locales here
  },
  // This is important for server-side rendering
  // It tells next-i18next where to find your translation files on the server
  localePath: typeof window === 'undefined' ? (await import('path')).resolve('./public/locales') : '/locales',
  // Disable debug mode in production
  debug: process.env.NODE_ENV === 'development',
};

export default nextI18nextConfig;
