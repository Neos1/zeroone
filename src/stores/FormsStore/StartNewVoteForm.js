/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import ExtendedForm from '../../models/FormModel';

class StartNewVoteForm extends ExtendedForm {
  setup() {
    return {
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          placeholder: 'Выберите вопрос',
          rules: 'required|numeric',
        },
      ],
    };
  }
}

export default StartNewVoteForm;
