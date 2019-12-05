/* eslint-disable class-methods-use-this */
import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';

class CreateQuestionDynamicForm extends ExtendedForm {
  setup() {
    return {
      fields: [
        {
          name: 'param_input--0',
          type: 'text',
          label: 'parameter',
          placeholder: i18n.t('fields:enterNewParameterName'),
          rules: 'required',
        },
        {
          name: 'param_select--0',
          type: 'text',
          label: 'parameter',
          placeholder: i18n.t('fields:selectParameterType'),
          rules: 'required',
        },
      ],
    };
  }
}

export default CreateQuestionDynamicForm;
