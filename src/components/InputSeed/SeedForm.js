import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Input from '../Input';
import { BlackWidestButton } from '../Button';

import styles from '../Login/Login.scss';

@withTranslation()
class SeedInput extends Component {
  render() {
    const {
      seed, form, t,
    } = this.props;

    return (
      <form form={form} onSubmit={form.onSubmit}>
        <div className={styles.seed}>
          {seed.map((word, index) => (
            <Input
              type="text"
              field={form.$(`word_${index + 1}`)}
              key={`wordInput-${index + 1}`}
            >
              <span>{index + 1}</span>
            </Input>
          ))}
        </div>
        <div className={styles.form__submit}>
          <BlackWidestButton disabled={form.loading} type="submit">
            {t('buttons:continue')}
          </BlackWidestButton>
        </div>
      </form>
    );
  }
}

SeedInput.propTypes = {
  form: propTypes.shape({
    onSubmit: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired,
    $: propTypes.func.isRequired,
  }).isRequired,
  seed: propTypes.arrayOf(propTypes.string).isRequired,
  t: propTypes.func.isRequired,
};

export default SeedInput;
