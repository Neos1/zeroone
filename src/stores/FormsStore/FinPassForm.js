/* eslint-disable class-methods-use-this */
import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';

class FinPassForm extends ExtendedForm {
  setup() {
    return {
      fields: [{
        name: 'fin-password',
        type: 'password',
        label: 'Password',
        placeholder: i18n.t('fields:password'),
        rules: 'required|password',
      }],
    };
  }
}

export default FinPassForm;
