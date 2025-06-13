// lib/i18n.ts (or wherever you initialize i18next)

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// next-i18next.config.js is not directly imported here for client-side setup
// The configuration will be passed via props or context from server-side

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpBackend) // Always use HttpBackend for client-side
  .init({
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;


