/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Container from '../Container';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Dropdown from '../Dropdown';
import { CreditCard, Password } from '../Icons';
import Input from '../Input';
import Button from '../Button/Button';
import LoadingBlock from '../LoadingBlock';
import LoginForm from '../../stores/FormsStore/LoginForm';
import AppStore from '../../stores/AppStore/AppStore';
import UserStore from '../../stores/UserStore/UserStore';

import styles from './Login.scss';

@withTranslation()
@inject('userStore', 'appStore')
@observer
class Login extends Component {
  static propTypes = {
    appStore: PropTypes.instanceOf(AppStore).isRequired,
    userStore: PropTypes.instanceOf(UserStore).isRequired,
    t: PropTypes.func.isRequired,
  };

  loginForm = new LoginForm({
    hooks: {
      onSuccess: (form) => this.login(form),
      onError: () => {
        this.showError();
      },
    },
  });

  componentDidMount() {
    const { appStore } = this.props;
    appStore.readWalletList();
  }

  login(form) {
    const { userStore } = this.props;
    return userStore.login(form.values().password);
  }

  showError() {
    const { appStore, t } = this.props;
    appStore.displayAlert(t('errors:emptyFields'), 3000);
  }

  render() {
    const { appStore, userStore, t } = this.props;
    const { loginForm } = this;
    if (userStore.authorized) return <Redirect to="/projects" />;
    return (
      <Container>
        <div className={styles.form}>
          {
            !loginForm.loading
              ? (
                <InputForm
                  appStore={appStore}
                  form={loginForm}
                  createKey={this.createKey}
                  onChange={this.getPassword}
                />
              )
              : (
                <LoadingBlock>
                  <Heading>
                    {t('headings:logging.heading')}
                    {t('headings:logging.subheading')}
                  </Heading>
                </LoadingBlock>
              )
          }
        </div>
      </Container>
    );
  }
}

const InputForm = withTranslation()(({
  appStore, form, t,
}) => (
  <FormBlock>
    <Heading>
      {t('headings:login.heading')}
      {t('headings:login.subheading')}
    </Heading>
    <form form={form} onSubmit={form.onSubmit}>
      <Dropdown options={appStore.wallets} subOptions={appStore.balances} field={form.$('wallet')} onSelect={appStore.selectWallet}>
        <CreditCard />
      </Dropdown>
      <Input type="password" field={form.$('password')}>
        <Password />
      </Input>
      <div className={styles.form__submit}>
        <Button theme="black" size="310" type="submit" disabled={form.loading}>
          {t('buttons:continue')}
        </Button>
        <NavLink to="/create">
          <Button theme="link">
            {t('buttons:newWallet')}
          </Button>
        </NavLink>
        <NavLink to="/restore">
          <Button theme="link">
            {t('buttons:forgotPassword')}
          </Button>
        </NavLink>
      </div>
    </form>
  </FormBlock>
));

InputForm.propTypes = {
  appStore: PropTypes.shape({
    wallets: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  form: PropTypes.shape({
    $: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Login;
