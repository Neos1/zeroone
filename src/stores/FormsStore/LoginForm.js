/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import ExtendedForm from '../../models/FormModel';

class LoginForm extends ExtendedForm {
  setup() {
    return {
      fields: [{
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Введите пароль',
        rules: 'required|string|same:password',
      }],
    };
  }
}

export default LoginForm;
