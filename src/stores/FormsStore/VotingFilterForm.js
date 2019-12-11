/* eslint-disable class-methods-use-this */
import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';

class VotingFilterForm extends ExtendedForm {
  setup() {
    return {
      fields: [
        {
          name: 'question',
          type: 'text',
          label: i18n.t('fields:question'),
          placeholder: i18n.t('fields:question'),
          rules: 'required|string',
        },
        {
          name: 'status',
          type: 'text',
          label: i18n.t('fields:status'),
          placeholder: i18n.t('fields:status'),
          rules: 'required|string',
        },
        {
          name: 'date_before',
          type: 'text',
          label: i18n.t('fields:dateBefore'),
          placeholder: i18n.t('fields:dateBefore'),
          rules: 'required|string',
        },
        {
          name: 'date_after',
          type: 'text',
          label: i18n.t('fields:dateAfter'),
          placeholder: i18n.t('fields:dateAfter'),
          rules: 'required|string',
        },
      ],
    };
  }
}

export default VotingFilterForm;
