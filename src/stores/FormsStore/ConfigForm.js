/* eslint-disable class-methods-use-this */
import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';

class ConfigForm extends ExtendedForm {
  setup() {
    return {
      fields: [{
        name: 'minGasPrice',
        type: 'text',
        label: 'minGasPrice',
        placeholder: i18n.t('fields:minGasPrice'),
        rules: 'numeric|min:1|max:100',
      }, {
        name: 'maxGasPrice',
        type: 'text',
        label: 'maxGasPrice',
        placeholder: i18n.t('fields:maxGasPrice'),
        rules: 'numeric|min:1|max:100',
      },
      {
        name: 'gasLimit',
        type: 'text',
        label: 'gasLimit',
        value: 7900000,
        placeholder: i18n.t('fields:gasLimit'),
        rules: 'numeric|min:25000|max:7900000',
      },
      {
        name: 'interval',
        type: 'text',
        label: 'interval',
        placeholder: i18n.t('fields:interval'),
        rules: 'numeric|min:10',
      }],
    };
  }
}

export default ConfigForm;
