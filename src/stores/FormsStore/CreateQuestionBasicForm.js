/* eslint-disable class-methods-use-this */
import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';

class CreateQuestionBasicForm extends ExtendedForm {
  setup() {
    return {
      fields: [
        {
          name: 'question_title',
          type: 'text',
          label: 'Question title',
          placeholder: i18n.t('fields:questionTitle'),
          rules: 'required',
        },
        {
          name: 'question_life_time',
          type: 'text',
          label: 'Question lifetime',
          placeholder: i18n.t('fields:questionLifeTime'),
        },
        {
          name: 'param_question',
          type: 'text',
          label: 'Parameter question',
          placeholder: i18n.t('fields:parameter'),
        },
        {
          name: 'voting_formula',
          type: 'text',
          label: 'Voting formula',
          placeholder: i18n.t('fields:votingFormula'),
        },
        {
          name: 'description',
          type: 'text',
          label: i18n.t('fields:questionDescription'),
        },
      ],
    };
  }
}

export default CreateQuestionBasicForm;
