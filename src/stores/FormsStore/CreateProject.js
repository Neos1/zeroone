import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';

/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

class СreateProjectForm extends ExtendedForm {
  setup() {
    return {
      fields: [{
        name: 'name',
        type: 'text',
        label: 'Project name',
        placeholder: i18n.t('fields:projectTitle'),
        rules: 'required|string',
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
export default СreateProjectForm;
