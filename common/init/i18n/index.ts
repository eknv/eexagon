
import i18next from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';
import { common as common_en } from "Common/lang/en";
import { common as common_de } from "Common/lang/de";

/**
 * language configuration
 */
i18next
  .use(reactI18nextModule)
  .use(LngDetector)
  .init({
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    fallbackLng: 'en',
    keySeparator: '.',
    react: {
      wait: true
    },
    resources: {
      en: {
        common: common_en
      },
      de: {
        common: common_de
      }
    },
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      lookupCookie: 'i18next',
      lookupLocalStorage: 'eexagon_lng',
      caches: ['localStorage', 'cookie']
    }
  });

