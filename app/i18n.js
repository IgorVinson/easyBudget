'use strict';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../public/utils/translate/en.json';
import ukTranslation from '../public/utils/translate/uk.json';

const resources = {
  en: { translation: enTranslation },
  uk: { translation: ukTranslation },
};

if (!i18n.isInitialized) { // Перевірка, чи ще не було ініціалізовано i18n
  i18n
    .use(LanguageDetector) // Enable language detector
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en', // Default language if no language is detected
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;
