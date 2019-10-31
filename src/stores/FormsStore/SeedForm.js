/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { Form } from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';

class SeedForm extends Form {
  plugins() {
    return {
      dvr: dvr(validatorjs),
    };
  }

  setup() {
    const fields = [];
    for (let i = 1; i < 13; i += 1) {
      fields.push({
        name: `word_${i}`,
        rules: 'required|string',
        value: '',
      });
    }
    return { fields };
  }
}
const seedForm = new SeedForm();


export default seedForm;
