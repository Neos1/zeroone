/* eslint-disable max-len */
/* eslint-disable no-empty */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import propTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import Container from '../Container';
import Header from '../Header';
import Heading from '../Heading';
import Input from '../Input';

import styles from '../Login/Login.scss';
import FormBlock from '../FormBlock';
import { Button, IconButton } from '../Button';
import { BackIcon } from '../Icons';
import Loader from '../Loader';
import SeedInput from './SeedForm';


@inject('appStore', 'userStore')
@observer

class InputSeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      redirect: false,
    };
  }

  setRedirect = () => {
    this.setState({ redirect: true });
  }

  toggleLoading = () => {
    const { loading } = this.state;
    this.setState({
      loading: !loading,
    });
  }

  submitForm = (form) => {
    const { userStore, appStore, recover } = this.props;
    const values = Object.values(form.values());
    userStore.mnemonicRepeat = values;
    const mnemonic = values.join(' ');
    if (userStore.isSeedValid(mnemonic)) {
      this.toggleLoading();
      if (recover) {
        userStore.recoverWallet(mnemonic)
          .then((data) => {
            userStore.setEncryptedWallet(data.v3wallet);
            userStore.getEthBalance();
            this.setRedirect();
          });
      } else if (!recover) {
        if (userStore.isSeedValid(mnemonic)) {
          userStore.saveWalletToFile();
          this.setRedirect();
        }
      }
    } else {
      appStore.displayAlert('Проверьте правильность заполнения полей', 2000);
    }
  }

  showError = () => {
    const { appStore } = this.props;
    appStore.displayAlert('Заполните все поля', 2000);
  }

  render() {
    const { userStore, recover } = this.props;
    const { _mnemonic: seed } = userStore;
    const { loading, redirect } = this.state;
    if (redirect) return recover ? <Redirect to="/userInfo" /> : <Redirect to="/creatingSuccess" />;
    return (
      <Container>
        <Header />
        <div className={styles.form}>
          <FormBlock>
            <Heading>
              {'Проверка резервной фразы'}
              {loading ? 'Проверяется фраза' : 'Введите  фразу, которую вы записали'}
            </Heading>
            {loading ? <Loader /> : <SeedInput submit={this.submitForm} seed={seed} error={this.showError} />}
          </FormBlock>
          <NavLink to={`${recover ? '/' : '/showSeed'}`}>
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
  appStore: propTypes.object.isRequired,
  recover: propTypes.bool.isRequired,
};


export default InputSeed;
