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
        rules: 'required|string|between:3,10',
      }, {
        name: 'address',
        type: 'text',
        label: 'Token Address',
        placeholder: 'Введите адрес контракта',
        rules: 'required|string|address',
      }],
    };
  }
}
export default ConnectProjectForm;
