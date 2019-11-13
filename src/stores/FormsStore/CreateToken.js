import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';

/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

class CreateTokenForm extends ExtendedForm {
  setup() {
    return {
      fields: [{
        name: 'name',
        type: 'text',
        label: 'Имя',
        placeholder: i18n.t('fields:tokenTitle'),
        rules: 'required|string',
      }, {
        name: 'symbol',
        type: 'text',
        label: 'Символ Токена',
        placeholder: i18n.t('fields:symbol'),
        rules: 'required|string|between:3,5',
      }, {
        name: 'count',
        type: 'text',
        label: 'Количество токенов',
        placeholder: i18n.t('fields:quantity'),
        rules: 'required|numeric',
      }, {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: i18n.t('fields:enterPassword'),
        rules: 'required|password',
      }],
    };
  }
}
export default CreateTokenForm;
