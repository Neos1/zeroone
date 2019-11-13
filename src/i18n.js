import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import headingsEn from './locales/ENG/headings';
import headingsRu from './locales/RUS/headings';
import explanationsEn from './locales/ENG/explanations';
import explanationsRu from './locales/RUS/explanations';

const resources = {
  ENG: {
    headings: headingsEn,
    explanations: explanationsEn,
  },
  RUS: {
    headings: headingsRu,
    explanations: explanationsRu,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'ENG',
    lng: 'RUS',
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default',
      useSuspense: false,
    },
  });

export default i18n;
