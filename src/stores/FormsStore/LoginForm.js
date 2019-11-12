/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import ExtendedForm from '../../models/FormModel';

class LoginForm extends ExtendedForm {
  setup() {
    return {
      fields: [{
        name: 'wallet',
        type: 'text',
        label: 'Wallet',
        placeholder: 'Выберите кошелек',
        rules: 'required|string',
      }, {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Введите пароль',
        rules: 'required|string',

      }],
    };
  }
}

export default LoginForm;
