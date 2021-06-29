/* eslint-disable class-methods-use-this */
import ExtendedForm from '../../models/FormModel';

class SeedForm extends ExtendedForm {
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

export default SeedForm;
