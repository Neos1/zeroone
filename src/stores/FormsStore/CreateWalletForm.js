import ExtendedForm from '../../models/FormModel';

/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

class CreateWalletForm extends ExtendedForm {
  setup() {
    return {
      fields: [{
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Введите пароль',
        rules: 'required|password',
      }, {
        name: 'passwordConfirm',
        type: 'password',
        label: 'Password Confirmation',
        placeholder: 'Подтвердите пароль',
        rules: 'required|same:password',
      }],
    };
  }
}
export default CreateWalletForm;
