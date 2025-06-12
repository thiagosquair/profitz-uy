import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import both backends
import HttpBackend from "i18next-http-backend";
import FsBackend from "i18next-fs-backend";

// Determine if we are in the browser environment
const isBrowser = typeof window !== "undefined";

i18n
  // Conditionally use the appropriate backend
  .use(isBrowser ? HttpBackend : FsBackend )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    ns: ["common"], // default namespace
    defaultNS: "common",
    backend: {
      // Adjust loadPath based on environment
      loadPath: isBrowser ? "/locales/{{lng}}/{{ns}}.json" : "./public/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;
