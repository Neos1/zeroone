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

  createWallet() {
    this.setState({
      state: 'loading',
    });
  }

  render() {
    const { state } = this.state;
    return (
      <Container>
        <Header isMenu isLogged={false} />
        <div className={styles.form}>
          {state === 'default' ? <PasswordForm submit={this.createWallet} /> : ''}
          {state === 'loading' ? <CreationLoader /> : ''}
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

CreateWallet.propTypes = {};

PasswordForm.propTypes = {
  submit: propTypes.func.isRequired,
};


export default CreateWallet;
