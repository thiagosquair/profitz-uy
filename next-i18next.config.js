const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'pt-BR'], // Added pt-BR
  },
  localePath: path.resolve('./public/locales'),
};
