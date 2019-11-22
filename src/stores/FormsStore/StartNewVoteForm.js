/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';

class StartNewVoteForm extends ExtendedForm {
  setup() {
    return {
      fields: [
        {
          name: 'duration',
          type: 'text',
          label: 'Duration',
          placeholder: i18n.t('fields:durationInBlocks'),
          rules: 'required|numeric',
        },
        {
          name: 'date',
          type: 'text',
          label: 'Date',
          placeholder: i18n.t('fields:date'),
          rules: 'required|string',
        },
        {
          name: 'param1',
          type: 'text',
          label: 'New address',
          placeholder: i18n.t('fields:address'),
          rules: 'required|string',
        },
        {
          name: 'param2',
          type: 'text',
          label: 'New address',
          placeholder: i18n.t('fields:address'),
          rules: 'required|string',
        },
        {
          name: 'param3',
          type: 'text',
          label: 'New address',
          placeholder: i18n.t('fields:address'),
          rules: 'required|string',
        },
      ],
    };
  }
}

export default StartNewVoteForm;
