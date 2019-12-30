/* eslint-disable class-methods-use-this */
import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';

class CreateProjectForm extends ExtendedForm {
  setup() {
    return {
      fields: [{
        name: 'name',
        type: 'text',
        label: 'Project name',
        placeholder: i18n.t('fields:projectTitle'),
        rules: 'required|string|between:3,20',
      }, {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: i18n.t('fields:enterPassword'),
        rules: 'required|password',
      }],
    };
  }
}

export default CreateProjectForm;
