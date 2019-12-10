import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/en-gb';
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
import errorsEn from './locales/ENG/errors';
import errorsRu from './locales/RUS/errors';
import dialogsEn from './locales/ENG/dialogs';
import dialogsRu from './locales/RUS/dialogs';

const resources = {
  ENG: {
    headings: headingsEn,
    explanations: explanationsEn,
    buttons: buttonsEn,
    fields: fieldsEn,
    other: otherEn,
    errors: errorsEn,
    dialogs: dialogsEn,
  },
  RUS: {
    headings: headingsRu,
    explanations: explanationsRu,
    buttons: buttonsRu,
    fields: fieldsRu,
    other: otherRu,
    errors: errorsRu,
    dialogs: dialogsRu,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: ['RUS', 'ENG'],
    lng: 'RUS',
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default',
      useSuspense: false,
    },
  }, () => {
    moment.locale(i18n.language);
  });
window.i18n = i18n;
export default i18n;
