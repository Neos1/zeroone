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
          label: i18n.t('fields:questionGroup'),
          placeholder: i18n.t('fields:questionGroup'),
          rules: '',
        },
        {
          name: 'question_title',
          type: 'text',
          label: i18n.t('fields:questionTitle'),
          placeholder: i18n.t('fields:questionTitle'),
          rules: 'required',
        },
        {
          name: 'question_life_time',
          type: 'text',
          label: i18n.t('fields:questionLifeTime'),
          placeholder: i18n.t('fields:questionLifeTime'),
          rules: 'required|numeric',
        },
        {
          name: 'target',
          type: 'text',
          label: i18n.t('fields:targetContractAddress'),
          placeholder: i18n.t('fields:targetContractAddress'),
          rules: 'required|string|address',
        },
        {
          name: 'methodSelector',
          type: 'text',
          label: i18n.t('fields:functionSelector'),
          placeholder: i18n.t('fields:functionSelector'),
          rules: 'string|bytes4',
        },
        {
          name: 'voting_formula',
          type: 'text',
          label: i18n.t('fields:votingFormula'),
          placeholder: i18n.t('fields:votingFormula'),
          rules: 'required|formula',
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
