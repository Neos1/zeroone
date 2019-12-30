/* eslint-disable class-methods-use-this */
import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';

class CreateTokenForm extends ExtendedForm {
  setup() {
    return {
      fields: [{
        name: 'name',
        type: 'text',
        label: i18n.t('fields:tokenTitle'),
        placeholder: i18n.t('fields:tokenTitle'),
        rules: 'required|string',
      }, {
        name: 'symbol',
        type: 'text',
        label: i18n.t('fields:symbol'),
        placeholder: i18n.t('fields:symbol'),
        rules: 'required|string|between:3,5',
      }, {
        name: 'count',
        type: 'text',
        label: i18n.t('fields:quantity'),
        placeholder: i18n.t('fields:quantity'),
        rules: 'required|numeric|min:1|max:2147483647 ',
      }, {
        name: 'password',
        type: 'password',
        label: i18n.t('fields:enterPassword'),
        placeholder: i18n.t('fields:enterPassword'),
        rules: 'required|password',
      }],
    };
  }
}

export default CreateTokenForm;
