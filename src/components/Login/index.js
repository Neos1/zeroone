/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import propTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import Container from '../Container';
import Header from '../Header';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Dropdown from '../Dropdown';
import { CreditCard, Password } from '../Icons';
import Input from '../Input';
import { Button } from '../Button';
import Loader from '../Loader';
import LoginForm from '../../stores/FormsStore/LoginForm';

import styles from './Login.scss';


@inject('userStore', 'appStore')
@observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { appStore } = this.props;
    appStore.readWalletList();
  }

  createKey = () => {
    const { appStore } = this.props;
    appStore.setMasterState('createWallet', 'passwordInput');
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { appStore, userStore } = this.props;
    const { logging } = userStore;
    const loginForm = new LoginForm({
      hooks: {
        onSuccess(form) {
          userStore.readWallet(form.values().password);
        },
        onError(form) {
          alert('Form has errors');
          console.log(form.errors());
        },
      },
    });

    if (userStore.authorized) return <Redirect to="/projects" />;
    return (
      <Container>
        <Header />
        <div className={styles.form}>
          {
            !logging
              ? (
                <InputForm
                  appStore={appStore}
                  form={loginForm}
                  createKey={this.createKey}
                  onChange={this.getPassword}
                />
              )
              : <LoadingBlock />
          }
        </div>
      </Container>
    );
  }
}

const InputForm = ({
  appStore, form, createKey,
}) => (
  <FormBlock>
    <Heading>
      {'Вход в систему'}
      {'Приготовьтесь к новой эре в сфере голосования'}
    </Heading>
    <form form={form} onSubmit={form.onSubmit}>
      <Dropdown options={appStore.wallets} onSelect={appStore.selectWallet}>
        <CreditCard />
      </Dropdown>
      <Input type="password" field={form.$('password')}>
        <Password />
      </Input>
      <div className={styles.form__submit}>
        <Button className="btn--default btn--black" type="submit"> Войти </Button>
        <NavLink to="/create">
          <Button className="btn--link" onClick={() => createKey()}> Создать новый ключ </Button>
        </NavLink>
        <NavLink to="/restore">
          <Button className="btn--link" disabled={form.loading}> Забыли пароль? </Button>
        </NavLink>
      </div>
    </form>

  </FormBlock>
);

const LoadingBlock = () => (
  <FormBlock>
    <Heading>
      {'Вход в систему'}
      {'Приготовьтесь к новой эре в сфере голосования'}
    </Heading>
    <Loader />
  </FormBlock>
);

Login.propTypes = {
  appStore: propTypes.object.isRequired,
  userStore: propTypes.object.isRequired,
};
InputForm.propTypes = {
  appStore: propTypes.object.isRequired,
  createKey: propTypes.func.isRequired,
  form: propTypes.object.isRequired,
};


export default Login;
