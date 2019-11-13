import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import headingsEn from './locales/ENG/headings';
import headingsRu from './locales/RUS/headings';
import explanationsEn from './locales/ENG/explanations';
import explanationsRu from './locales/RUS/explanations';
import buttonsEn from './locales/ENG/buttons';
import buttonsRu from './locales/RUS/buttons';
import fieldsEn from './locales/ENG/fields';
import fieldsRu from './locales/RUS/fields';
import otherEn from './locales/ENG/other';
import otherRu from './locales/RUS/other';


const resources = {
  ENG: {
    headings: headingsEn,
    explanations: explanationsEn,
    buttons: buttonsEn,
    fields: fieldsEn,
    other: otherEn,
  },
  RUS: {
    headings: headingsRu,
    explanations: explanationsRu,
    buttons: buttonsRu,
    fields: fieldsRu,
    other: otherRu,
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
