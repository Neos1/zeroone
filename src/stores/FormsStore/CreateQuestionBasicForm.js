/* eslint-disable class-methods-use-this */
import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';

class CreateQuestionBasicForm extends ExtendedForm {
  setup() {
    return {
      fields: [
        {
          name: 'GroupId',
          type: 'text',
          label: 'Question title',
          placeholder: 'Группа вопросов',
          rules: '',
        },
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
          rules: 'required',

        },
        {
          name: 'target',
          type: 'text',
          label: 'Parameter question',
          placeholder: 'Адрес целевого контракта',

        },
        {
          name: 'methodSelector',
          type: 'text',
          label: 'Parameter question',
          placeholder: 'Селектор функции',

        },
        {
          name: 'voting_formula',
          type: 'text',
          label: 'Voting formula',
          placeholder: i18n.t('fields:votingFormula'),
          rules: 'required',

        },
        {
          name: 'description',
          type: 'text',
          label: i18n.t('fields:questionDescription'),
          rules: 'required',
        },
      ],
    };
  }
}

export default CreateQuestionBasicForm;
