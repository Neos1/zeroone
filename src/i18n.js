import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import headingsEn from './locales/en/headings';
import headingsRu from './locales/ru/headings';

const resources = {
  ENG: {
    headings: headingsEn,
  },
  RUS: {
    headings: headingsRu,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'ru',
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default',
      useSuspense: false,
    },
  });

export default i18n;
