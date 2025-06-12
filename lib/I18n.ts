import i18n from "I18next";
import { initReactI18next } from "react-I18next";
import LanguageDetector from "I18next-browser-languagedetector";
import Backend from "I18next-http-backend";

i18n
  .use(Backend )
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
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default I18n;
