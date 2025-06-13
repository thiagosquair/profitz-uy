// next-i18next.config.js

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr'], // Add all your supported locales here
  },
  // This is important for server-side rendering
  // It tells next-i18next where to find your translation files on the server
  localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
  // Disable debug mode in production
  debug: process.env.NODE_ENV === 'development',
};
