/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import propTypes from 'prop-types';
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

import styles from './Login.scss';

@withTranslation()
@inject('userStore', 'appStore')
@observer
class Login extends Component {
  componentDidMount() {
    const { appStore } = this.props;
    appStore.readWalletList();
  }

  render() {
    const { appStore, userStore, t } = this.props;
    const { logging } = userStore;
    const loginForm = new LoginForm({
      hooks: {
        onSuccess(form) {
          return new Promise(() => {
            userStore.login(form.values().password);
          });
        },
        onError() {
          appStore.displayAlert(t('errors:emptyFields'), 3000);
        },
      },
    });
    if (userStore.authorized) return <Redirect to="/projects" />;
    return (
      <Container>
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

Login.propTypes = {
  appStore: propTypes.shape({
    displayAlert: propTypes.func.isRequired,
    readWalletList: propTypes.func.isRequired,
  }).isRequired,
  userStore: propTypes.shape({
    logging: propTypes.bool.isRequired,
    login: propTypes.func.isRequired,
    authorized: propTypes.bool.isRequired,
  }).isRequired,
  t: propTypes.func.isRequired,
};

InputForm.propTypes = {
  appStore: propTypes.shape({
    wallets: propTypes.arrayOf(propTypes.object).isRequired,
  }).isRequired,
  form: propTypes.shape({
    $: propTypes.func.isRequired,
    onSubmit: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired,
  }).isRequired,
};

export default withTranslation()(Login);
