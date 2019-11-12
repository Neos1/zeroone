/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Container from '../Container';
import Header from '../Header';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Loader from '../Loader';
import styles from '../Login/Login.scss';

import PasswordForm from './PasswordForm';
import passwordValidation from '../../utils/PasswordValidation';
import CreateWalletForm from '../../stores/FormsStore/CreateWalletForm';


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
    const values = form.values();
    this.setState({ loading: true });
    if (recover) {
      userStore.recoverWallet(values.password).then(() => {
        this.setState({ redirect: true });
        userStore.saveWalletToFile();
      }).catch(() => {
        this.setState({ loading: false });
      });
    } else {
      userStore.createWallet(values.password).then(() => {
        this.setState({ redirect: true });
      }).catch(() => {
        this.setState({ loading: false });
      });
    }
  }


  render() {
    const { recover } = this.props;
    const { redirect, loading } = this.state;
    const { createWallet } = this;
    const createForm = new CreateWalletForm({
      hooks: {
        onSuccess(form) {
          createWallet(form);
        },
        onError() {

        },
      },
    });

    if (redirect) {
      return recover ? <Redirect to="/recoverSuccess" /> : <Redirect to="/showSeed" />;
    }
    return (
      <Container>
        <Header />
        <div className={styles.form}>
          {!loading
            ? (
              <PasswordForm
                form={createForm}
                submit={this.createWallet}
                state={recover}
                onInput={passwordValidation}
              />
            )
            : <CreationLoader />}


        </div>
      </Container>
    );
  }
}


const CreationLoader = withTranslation(['headings'])(({ t }) => (
  <FormBlock>
    <Heading>
      {t('headings:passwordCreation.heading')}
      {t('headings:passwordCreation.subheading')}
    </Heading>
    <Loader />
  </FormBlock>
));

CreateWallet.propTypes = {
  userStore: propTypes.object.isRequired,
  recover: propTypes.bool.isRequired,
};


export default withTranslation()(CreateWallet);
