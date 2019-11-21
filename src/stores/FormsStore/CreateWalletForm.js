/* eslint-disable class-methods-use-this */
import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';

class CreateWalletForm extends ExtendedForm {
  setup() {
    return {
      fields: [{
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: i18n.t('fields:enterPassword'),
        rules: 'required|password',
      }, {
        name: 'passwordConfirm',
        type: 'password',
        label: 'Password Confirmation',
        placeholder: i18n.t('fields:repeatPassword'),
        rules: 'required|same:password',
      }],
    };
  }
}
export default CreateWalletForm;
