/* eslint-disable no-restricted-globals */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import i18n from 'i18next';
import ExtendedForm from '../../models/FormModel';
import { fs, ROOT_DIR, path } from '../../constants/windowModules';

let config;
try {
  config = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, './config.json')), 'utf8');
} catch {
  alert(`Something wrong with config file
  located in ${path.join(ROOT_DIR, './config.json')}. 
  Please check it, without this you can't continue.`);
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
