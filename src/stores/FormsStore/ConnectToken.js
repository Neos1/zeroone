import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';

/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

class ConnectTokenForm extends ExtendedForm {
  setup() {
    return {
      fields: [{
        name: 'address',
        type: 'text',
        label: 'Token Address',
        placeholder: i18n.t('fields:contractAddress'),
        rules: 'required|string|address',
      }],
    };
  }
}
export default ConnectTokenForm;
