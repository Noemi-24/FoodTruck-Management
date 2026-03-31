import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en/translation.json';
import esTranslations from './locales/es/translation.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: false,
        resources: {
            en: {translation: enTranslations},
            es: {translation: esTranslations},
        },
        interpolation: {escapeValue: false},
    });

export default i18n;