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
          label: 'question',
          placeholder: i18n.t('fields:question'),
        },
        {
          name: 'date_before',
          type: 'text',
          label: 'dateBefore',
          placeholder: i18n.t('fields:dateBefore'),
        },
        {
          name: 'date_after',
          type: 'text',
          label: 'dateAfter',
          placeholder: i18n.t('fields:dateAfter'),
        },
      ],
    };
  }
}

export default VotingFilterForm;
