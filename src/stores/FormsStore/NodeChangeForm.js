/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-globals */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';
import { fs, PATH_TO_CONFIG } from '../../constants/windowModules';

const { ipcRenderer } = window.require('electron');

let config;
try {
  config = JSON.parse(fs.readFileSync(PATH_TO_CONFIG), 'utf8');
} catch {
  ipcRenderer.send('config-problem', PATH_TO_CONFIG);
  // alert(`Something wrong with config file
  // located in ${PATH_TO_CONFIG}.
  // Please check it, without this you can't continue.`);
}

class NodeChangeForm extends ExtendedForm {
  setup() {
    return {
      fields: [{
        name: 'url',
        type: 'text',
        label: 'nodeUrl',
        placeholder: i18n.t('fields:nodeUrl'),
        rules: 'required|url',
        value: config.host,
      }],
    };
  }
}

export default NodeChangeForm;
