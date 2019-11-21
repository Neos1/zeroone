import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import SeedForm from '../../stores/FormsStore/SeedForm';
import Input from '../Input';
import { BlackWidestButton } from '../Button';

import styles from '../Login/Login.scss';

@withTranslation()
class SeedInput extends Component {
  render() {
    const {
      seed, submit, showError, t,
    } = this.props;
    const seedForm = new SeedForm({
      hooks: {
        onSuccess(form) {
          submit(form);
        },
        onError() {
          showError();
        },
      },
    });

    return (
      <form form={seedForm} onSubmit={seedForm.onSubmit}>
        <div className={styles.seed}>
          {seed.map((word, index) => (
            <Input
              type="text"
              field={seedForm.$(`word_${index + 1}`)}
              key={`wordInput-${index + 1}`}
            >
              <span>{index + 1}</span>
            </Input>
          ))}
        </div>
        <div className={styles.form__submit}>
          <BlackWidestButton disabled={seedForm.loading} type="submit">
            {t('buttons:continue')}
          </BlackWidestButton>
        </div>
      </form>
    );
  }
}

SeedInput.propTypes = {
  submit: propTypes.func.isRequired,
  showError: propTypes.func.isRequired,
  seed: propTypes.arrayOf(propTypes.string).isRequired,
  t: propTypes.func.isRequired,
};

export default SeedInput;
