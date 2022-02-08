/** Load dependencies */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

/** Load translations */
import common_en from "./translations/en/common.json";
import common_de from "./translations/de/common.json";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    react: {
      useSuspense: false,
    },
    resources: {
      en: {
        common: common_en,
      },
      de: {
        common: common_de,
      },
    },
  });

export default i18n;
