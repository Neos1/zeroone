import React, { Component } from 'react';
import propTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Container from '../Container';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import Loader from '../Loader';
import passwordValidation from '../../utils/PasswordValidation';
import PasswordForm from './PasswordForm';
import CreateWalletForm from '../../stores/FormsStore/CreateWalletForm';

import styles from '../Login/Login.scss';

@inject('userStore', 'appStore')
@observer
class CreateWallet extends Component {
  createForm = new CreateWalletForm({
    hooks: {
      onSuccess: (form) => {
        this.createWallet(form);
      },
      onError: () => {
      },
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  createWallet = (form) => {
    const { userStore, recover } = this.props;
    const values = form.values();
    return new Promise((resolve, reject) => {
      if (recover) {
        userStore.recoverWallet(values.password).then(() => {
          userStore.saveWalletToFile();
          resolve();
          this.setState({ redirect: true });
        }).catch(() => {
          reject();
        });
      } else {
        userStore.createWallet(values.password).then(() => {
          resolve();
          this.setState({ redirect: true });
        }).catch(() => {
          reject();
        });
      }
    });
  }

  render() {
    const { recover } = this.props;
    const { redirect } = this.state;
    const { createForm } = this;

    if (redirect) {
      return recover ? <Redirect to="/recoverSuccess" /> : <Redirect to="/showSeed" />;
    }
    return (
      <Container>
        <div className={styles.form}>
          {!createForm.loading
            ? (
              <PasswordForm
                form={createForm}
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
      <span>
        {t('headings:passwordCreation.subheading.0')}
        <br />
        {t('headings:passwordCreation.subheading.1')}
      </span>
    </Heading>
    <Loader />
  </FormBlock>
));

CreateWallet.propTypes = {
  userStore: propTypes.shape({
    recoverWallet: propTypes.func.isRequired,
    saveWalletToFile: propTypes.func.isRequired,
    createWallet: propTypes.func.isRequired,
  }).isRequired,
  recover: propTypes.bool.isRequired,
};

export default withTranslation()(CreateWallet);
