/* eslint-disable class-methods-use-this */
import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';

class ConnectProjectForm extends ExtendedForm {
  setup() {
    return {
      fields: [{
        name: 'name',
        type: 'text',
        label: 'Project Name',
        placeholder: i18n.t('fields:projectTitle'),
        rules: 'required|string|between:3,20',
      }, {
        name: 'address',
        type: 'text',
        label: 'Token Address',
        placeholder: i18n.t('fields:contractAddress'),
        rules: 'required|string|address',
      }],
    };
  }
}

export default ConnectProjectForm;
