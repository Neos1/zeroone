/* eslint-disable class-methods-use-this */
import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';

class CreateGroupQuestionsForm extends ExtendedForm {
  setup() {
    return {
      fields: [{
        name: 'name',
        type: 'text',
        label: i18n.t('fields:titleGroupQuestions'),
        placeholder: i18n.t('fields:titleGroupQuestions'),
        rules: 'required|string',
      }, {
        name: 'description',
        type: 'text',
        label: i18n.t('fields:descriptionOrComment'),
        placeholder: i18n.t('fields:descriptionOrComment'),
        rules: 'string',
      }],
    };
  }
}

export default CreateGroupQuestionsForm;
