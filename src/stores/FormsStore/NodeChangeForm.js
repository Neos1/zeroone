/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';

class NodeChangeForm extends ExtendedForm {
  setup() {
    return {
      fields: [{
        name: 'url',
        type: 'text',
        label: 'Token Address',
        placeholder: 'URL ноды',
        rules: 'required|string|url',
      }],
    };
  }
}

export default NodeChangeForm;
