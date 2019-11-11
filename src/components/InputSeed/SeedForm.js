import React, { Component } from 'react';
import propTypes from 'prop-types';

import SeedForm from '../../stores/FormsStore/SeedForm';
import styles from '../Login/Login.scss';
import Input from '../Input';
import { Button } from '../Button';


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
            <Input type="text" field={seedForm.$(`word_${index + 1}`)} placeholder="">
              <span>{index + 1}</span>
            </Input>
          ))}
        </div>
        <div className={styles.form__submit}>
          <Button className="btn--default btn--black" type="submit"> Продолжить </Button>
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
