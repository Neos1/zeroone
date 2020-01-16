/* eslint-disable class-methods-use-this */
import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';

class LoginForm extends ExtendedForm {
  setup() {
    return {
      fields: [{
        name: 'wallet',
        type: 'text',
        label: 'wallet',
        placeholder: i18n.t('fields:wallet'),
        rules: 'required|string',
      }, {
        name: 'password',
        type: 'password',
        label: 'enterPassword',
        placeholder: i18n.t('fields:enterPassword'),
        rules: 'required|password',

      }],
    };
  }
}

export default LoginForm;
