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
        placeholder: 'Придумайте название токена',
        rules: 'required|string',
      }, {
        name: 'symbol',
        type: 'text',
        label: 'Символ Токена',
        placeholder: 'Символ',
        rules: 'required|string|between:3,5',
      }, {
        name: 'count',
        type: 'text',
        label: 'Количество токенов',
        placeholder: 'Количество',
        rules: 'required|numeric',
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
export default CreateTokenForm;
