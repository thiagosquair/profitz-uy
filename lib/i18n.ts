// lib/i18n.ts - Fixed version with static imports instead of HTTP backend
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files directly
import enCommon from '../public/locales/en/common.json';
import esCommon from '../public/locales/es/common.json';
import ptBRCommon from '../public/locales/pt-BR/common.json';
import frCommon from '../public/locales/fr/common.json';

// Resources object with all translations
const resources = {
  en: {
    common: enCommon,
  },
  es: {
    common: esCommon,
  },
  'pt-BR': {
    common: ptBRCommon,
  },
  fr: {
    common: frCommon,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true, // Keep debug mode to see what's happening
    ns: ['common'],
    defaultNS: 'common',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;

