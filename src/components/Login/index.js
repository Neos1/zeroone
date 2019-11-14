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
import { Button } from '../Button';
import Loader from '../Loader';
import LoginForm from '../../stores/FormsStore/LoginForm';


import styles from './Login.scss';

@withTranslation()
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

  render() {
    // eslint-disable-next-line no-unused-vars
    const { appStore, userStore, t } = this.props;
    const { logging } = userStore;
    const loginForm = new LoginForm({
      hooks: {
        onSuccess(form) {
          userStore.login(form.values().password);
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
              : <LoadingBlock />
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
        <Button className="btn--default btn--black" type="submit">{t('buttons:continue')}</Button>
        <NavLink to="/create">
          <Button className="btn--link">{t('buttons:newWallet')}</Button>
        </NavLink>
        <NavLink to="/restore">
          <Button className="btn--link" disabled={form.loading}>{t('buttons:forgotPassword')}</Button>
        </NavLink>
      </div>
    </form>
  </FormBlock>
));

const LoadingBlock = withTranslation()(({ t }) => (
  <FormBlock>
    <Heading>
      {t('headings:logging.heading')}
      {t('headings:logging.subheading')}
    </Heading>
    <Loader />
  </FormBlock>
));

Login.propTypes = {
  appStore: propTypes.object.isRequired,
  userStore: propTypes.object.isRequired,
  t: propTypes.func.isRequired,
};
InputForm.propTypes = {
  appStore: propTypes.object.isRequired,
  form: propTypes.object.isRequired,
};


export default withTranslation()(Login);
