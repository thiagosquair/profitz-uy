// next-i18next.config.js
const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr'], // Adjust your locales as needed
  },
  // This is important for server-side loading
  localePath: typeof window === 'undefined'
    ? path.resolve('./public/locales')
    : '/locales',
};
