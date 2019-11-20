import React, { Component } from 'react';
import propTypes from 'prop-types';
import SeedForm from '../../stores/FormsStore/SeedForm';
import Input from '../Input';
import { BlackWidestButton } from '../Button';

import styles from '../Login/Login.scss';

class SeedInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { seed, submit, error } = this.props;
    const seedForm = new SeedForm({
      hooks: {
        onSuccess(form) {
          submit(form);
        },
        onError() {
          error();
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
            Продолжить
          </BlackWidestButton>
        </div>
      </form>
    );
  }
}

SeedInput.propTypes = {
  submit: propTypes.func.isRequired,
  error: propTypes.func.isRequired,
  seed: propTypes.arrayOf(propTypes.string).isRequired,
};

export default SeedInput;
