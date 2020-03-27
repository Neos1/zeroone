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
          label: 'questionGroup',
          placeholder: i18n.t('fields:questionGroup'),
          rules: '',
        },
        {
          name: 'question_title',
          type: 'text',
          label: 'questionTitle',
          placeholder: i18n.t('fields:questionTitle'),
          rules: 'required',
        },
        {
          name: 'question_life_time',
          type: 'text',
          label: 'questionLifeTime',
          placeholder: i18n.t('fields:questionLifeTime'),
          rules: 'required|numeric',
        },
        {
          name: 'target',
          type: 'text',
          label: 'targetContractAddress',
          placeholder: i18n.t('fields:targetContractAddress'),
          rules: 'required|string|address',
        },
        {
          name: 'methodSelector',
          type: 'text',
          label: 'methodSelector',
          placeholder: i18n.t('fields:methodSelector'),
          rules: 'string|bytes4',
        },
        {
          name: 'voting_formula',
          type: 'text',
          label: 'votingFormula',
          placeholder: i18n.t('fields:votingFormula'),
          rules: 'required',
        },
        {
          name: 'description',
          type: 'text',
          label: 'questionDescription',
          placeholder: i18n.t('fields:questionDescription'),
          rules: 'required',
        },
      ],
    };
  }
}

export default CreateQuestionBasicForm;
