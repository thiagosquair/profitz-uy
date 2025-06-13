// next-i18next.config.js
const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr'], // Adjust your locales as needed
  },
  localePath: path.resolve('./public/locales'), // Absolute path to your translation files
};


