/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { NavLink, Redirect } from 'react-router-dom';
import Container from '../Container';
import Header from '../Header';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import { Password, BackIcon } from '../Icons';
import Input from '../Input';
import { Button, IconButton } from '../Button';
import Loader from '../Loader';
import Explanation from '../Explanation';
import Indicator from '../Indicator';
import CreateWalletForm from '../../stores/FormsStore/CreateWalletForm';

import styles from '../Login/Login.scss';


@inject('userStore', 'appStore')
@observer
class CreateWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  createWallet = () => {
    const { appStore, userStore } = this.props;
    appStore.setMasterState('createWallet', 'creating');
    userStore.createWallet('password').then((result) => {
      if (!result) appStore.setMasterState('createWallet', 'passwordInput');
      this.setState({ redirect: true });
    });
  }

  render() {
    const { appStore } = this.props;
    const { masterSubState } = appStore;
    const { redirect } = this.state;
    const { createWallet } = this;
    const CreateForm = new CreateWalletForm({
      hooks: {
        onSuccess() {
          createWallet();
        },
        onError(form) {
          console.log(form);
        },
      },
    });

    if (redirect) {
      return <Redirect to="/showSeed" />;
    }
    return (
      <Container>
        <Header />
        <div className={styles.form}>
          {masterSubState === 0 ? <PasswordForm submit={this.createWallet} form={CreateForm} /> : ''}
          {masterSubState === 1 ? <CreationLoader /> : ''}
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

const PasswordForm = ({ form }) => (
  <FormBlock>
    <Heading>
      {'Создание пароля'}
      {'Будет использоваться для входа в кошелек и подтверждения транзакций'}
    </Heading>
    <form form={form} onSubmit={form.onSubmit}>
      <Input type="password" field={form.$('password')}>
        <Password />
      </Input>
      <Input type="password" field={form.$('passwordConfirm')}>
        <Password />
      </Input>
      <div className={styles.form__submit}>
        <Button type="submit" className="btn--default btn--black"> Продолжить </Button>
      </div>
      <div className={`${styles.form__explanation} ${styles['form__explanation--right']}`}>
        <Explanation>
          <p>
            Пароль задается на английской раскладке
            <br />
            И должен содержать:
          </p>
          <p>
            <ul>
              <li>
                <Indicator />
                {' '}
                цифру
                {' '}
              </li>
              <li>
                <Indicator />
                {' '}
                заглавную букву
                {' '}
              </li>
              <li>
                <Indicator />
                {' '}
                спецсимвол
              </li>
            </ul>
          </p>
        </Explanation>
      </div>
    </form>
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

CreateWallet.propTypes = {
  userStore: propTypes.object.isRequired,
  appStore: propTypes.object.isRequired,
};

PasswordForm.propTypes = {
  form: propTypes.object.isRequired,
};

export default CreateWallet;
