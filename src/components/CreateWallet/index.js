/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import Container from '../Container';
import Header from '../Header';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import { Password, BackIcon } from '../Icons';
import Input from '../Input';
import { Button, IconButton } from '../Button';
import Loader from '../Loader';

import styles from '../Login/Login.scss';

@inject('userStore', 'appStore')
@observer
class CreateWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: 'default',
    };
  }

  createWallet = () => {
    this.setState({
      state: 'loading',
    });

    setTimeout(() => {
      this.setState({
        state: 'seed',
      });
    }, 2000);
  }

  render() {
    const { state } = this.state;
    const { userStore } = this.props;
    return (
      <Container>
        <Header isMenu isLogged={false} />
        <div className={styles.form}>
          {state === 'default' ? <PasswordForm submit={this.createWallet} /> : ''}
          {state === 'loading' ? <CreationLoader /> : ''}
          {state === 'seed' ? <SeedScreen seed={userStore._mnemonic} /> : ''}
          <NavLink to="/">
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

const PasswordForm = ({ submit }) => (
  <FormBlock>
    <Heading>
      {'Создание пароля'}
      {'Будет использоваться для входа в кошелек и подтверждения транзакций'}
    </Heading>
    <Input type="password" required={false} placeholder="Введите пароль" errorText="Вы ошиблись, смиритесь и исправьтесь">
      <Password />
    </Input>
    <Input type="password" required={false} placeholder="Введите пароль" errorText="Вы ошиблись, смиритесь и исправьтесь">
      <Password />
    </Input>
    <div className={styles.form__submit}>
      <Button className="btn--default btn--black" onClick={() => { submit(); }}> Продолжить </Button>
    </div>
  </FormBlock>
);

const CreationLoader = () => (
  <FormBlock>
    <Heading>
      {'Создание пароля'}
      {'Будет использоваться для входа в кошелек и подтверждения транзакций'}
    </Heading>
    <Loader />
  </FormBlock>
);

const SeedScreen = ({ seed }) => (
  <FormBlock>
    <Heading>
      {'Резервная фраза'}
      {'Нужна для восстановления пароля'}
    </Heading>
    <div className={styles.seed}>
      {seed.map((word, id) => (
        <SeedWord {...{ word, id }} />
      ))}
    </div>
    <div className={styles.form__submit}>
      <NavLink to="/checkSeed">
        <Button className="btn--default btn--black"> Продолжить </Button>
      </NavLink>
    </div>
  </FormBlock>
);
const SeedWord = ({ word, id }) => (
  <p className="seed__word">
    <span className="seed__word-id">{id + 1}</span>
    <span className="seed__word-text">{('*').repeat(word.length)}</span>
  </p>
);

CreateWallet.propTypes = {
  userStore: propTypes.object.isRequired,
};

PasswordForm.propTypes = {
  submit: propTypes.func.isRequired,
};

SeedScreen.propTypes = {
  seed: propTypes.arrayOf(propTypes.string).isRequired,
};
SeedWord.propTypes = {
  id: propTypes.number.isRequired,
  word: propTypes.string.isRequired,
};


export default CreateWallet;
