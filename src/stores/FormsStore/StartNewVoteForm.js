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
          name: 'question',
          type: 'text',
          label: 'Question',
          placeholder: i18n.t('fields:chooseTheQuestion'),
          rules: 'required|integer|min:1',
        },
      ],
    };
  }
}

export default StartNewVoteForm;
