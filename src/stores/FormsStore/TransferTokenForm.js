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
          name: 'wallet',
          type: 'text',
          label: 'Wallet',
          placeholder: i18n.t('fields:wallet'),
          rules: 'required|string',
        },
        {
          name: 'count',
          type: 'text',
          label: 'Count tokens',
          placeholder: i18n.t('fields:quantity'),
          rules: 'required|numeric|min:1|max:2147483647 ',
        },
        {
          name: 'password',
          type: 'password',
          label: 'Password',
          placeholder: i18n.t('fields:enterPassword'),
          rules: 'required|password',
        },
      ],
    };
  }
}

export default TransferTokenForm;
