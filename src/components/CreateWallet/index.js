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
      loading: false,
    };
  }

  createWallet = (form) => {
    const { userStore, recover } = this.props;
    const { _mnemonic } = userStore;
    const values = form.values();
    const seed = _mnemonic.join(' ');
    this.setState({ loading: true });
    userStore.createWallet(values.password, seed).then(() => {
      if (recover) {
        userStore.saveWalletToFile();
      }
      this.setState({ redirect: true });
    }).catch(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { recover } = this.props;
    const { redirect, loading } = this.state;
    const { createWallet } = this;
    const CreateForm = new CreateWalletForm({
      hooks: {
        onSuccess(form) {
          createWallet(form);
        },
        onError(form) {
          console.log(form);
        },
      },
    });

    if (redirect) {
      return recover ? <Redirect to="/creatingSuccess" /> : <Redirect to="/showSeed" />;
    }
    return (
      <Container>
        <Header />
        <div className={styles.form}>
          {!loading
            ? <PasswordForm submit={this.createWallet} form={CreateForm} />
            : <CreationLoader />}

          <NavLink to={`${recover ? '/restore' : '/'}`}>
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
  recover: propTypes.bool.isRequired,
};

PasswordForm.propTypes = {
  form: propTypes.object.isRequired,
};

export default CreateWallet;
