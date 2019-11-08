import ExtendedForm from '../../models/FormModel';

/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

class ConnectProjectForm extends ExtendedForm {
  setup() {
    return {
      fields: [{
        name: 'name',
        type: 'text',
        label: 'Project Name',
        placeholder: 'Придумайте название проекта',
        rules: 'required|string',
      }, {
        name: 'address',
        type: 'text',
        label: 'Token Address',
        placeholder: 'Введите адрес контракта',
        rules: 'required|string|between:42,42',
      }],
    };
  }
}
export default ConnectProjectForm;
