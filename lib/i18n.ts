// lib/i18n.ts (or wherever you initialize i18next)

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import the configuration from next-i18next.config.js
import nextI18nextConfig from '../next-i18next.config';

const isBrowser = typeof window !== 'undefined';

i18n
  .use(initReactI18next)
  .use(LanguageDetector) // Only use LanguageDetector in the browser
  .init({
    ...nextI18nextConfig.i18n,
    // Load resources based on environment
    backend: {
      loadPath: isBrowser ? '/locales/{{lng}}/{{ns}}.json' : './public/locales/{{lng}}/{{ns}}.json',
    },
    // Use different backends conditionally
    ...(isBrowser
      ? { use: [require('i18next-http-backend')] } // Client-side: HTTP backend
      : { use: [require('i18next-fs-backend')] } // Server-side: FS backend
    ),
    // Fallback language
    fallbackLng: 'en',
    // Default namespace
    ns: ['common'],
    defaultNS: 'common',
    // Key separator
    keySeparator: false,
    interpolation: {
      escapeValue: false, // react already escapes by default
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
