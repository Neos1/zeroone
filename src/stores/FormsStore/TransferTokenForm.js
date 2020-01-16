/* eslint-disable class-methods-use-this */
import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';

class TransferTokenForm extends ExtendedForm {
  setup() {
    return {
      fields: [
        {
          name: 'address',
          type: 'text',
          label: 'address',
          placeholder: i18n.t('fields:address'),
          rules: 'required|string|address',
        },
        {
          name: 'count',
          type: 'text',
          label: 'countTokens',
          placeholder: i18n.t('fields:countTokens'),
          rules: 'required|numeric',
        },
        {
          name: 'password',
          type: 'password',
          label: 'password',
          placeholder: i18n.t('fields:password'),
          rules: 'required|password',
        },
      ],
    };
  }
}

export default TransferTokenForm;
