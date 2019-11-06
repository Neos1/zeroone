/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Container from '../Container';
import Header from '../Header';
import Heading from '../Heading';
import Input from '../Input';
import SeedForm from '../../stores/FormsStore/SeedForm';

import styles from '../Login/Login.scss';
import FormBlock from '../FormBlock';
import { Button, IconButton } from '../Button';
import { BackIcon } from '../Icons';


@inject('appStore', 'userStore')
@observer

class InputSeed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { userStore } = this.props;
    const { _mnemonic: seed } = userStore;

    const seedForm = new SeedForm({
      hooks: {
        onSuccess(form) {
          const values = Object.values(form.values());
          const mnemonic = values.join(' ');
          console.log(mnemonic);
        },
        onError(form) {
          console.log(`ALARM ${form}`);
        },
      },
    });
    return (
      <Container>
        <Header />
        <div className={styles.form}>
          <FormBlock>
            <Heading>
              {'Проверка резервной фразы'}
              {'Введите  фразу, которую вы записали'}
            </Heading>
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
          </FormBlock>
          <NavLink to="/showSeed">
            <IconButton className="btn--link btn--noborder btn--back">
              <BackIcon />
              Назад
            </IconButton>
          </NavLink>
        </div>
      </Container>
    );
  }
}

InputSeed.propTypes = {
  userStore: propTypes.object.isRequired,

};

export default InputSeed;
