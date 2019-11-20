/* eslint-disable no-alert */
/* eslint-disable no-console */
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
          label: 'Address',
          placeholder: i18n.t('fields:address'),
          rules: 'required|string',
        },
        {
          name: 'count',
          type: 'text',
          label: 'Count tokens',
          placeholder: i18n.t('fields:countTokens'),
          rules: 'required|numeric|min:1|max:2147483647 ',
        },
        {
          name: 'password',
          type: 'password',
          label: 'Password',
          placeholder: i18n.t('fields:password'),
          rules: 'required|password',
        },
      ],
    };
  }
}

export default TransferTokenForm;
