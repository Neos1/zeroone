import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import propTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Container from '../Container';
import Heading from '../Heading';
import FormBlock from '../FormBlock';
import Button from '../Button/Button';
import { BackIcon } from '../Icons';
import Loader from '../Loader';
import SeedForm from '../../stores/FormsStore/SeedForm';
import SeedInput from './SeedForm';


import styles from '../Login/Login.scss';

@withTranslation()
@inject('appStore', 'userStore')
@observer
class InputSeed extends Component {
  seedForm = new SeedForm({
    hooks: {
      onSuccess: (form) => this.submitForm(form),
      onError: () => {
        this.showError();
      },
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  setRedirect = () => {
    this.setState({ redirect: true });
  }


  submitForm = (form) => {
    const {
      userStore, appStore, recover, t,
    } = this.props;
    const values = Object.values(form.values());
    userStore.setMnemonicRepeat(values);
    const mnemonic = values.join(' ');
    return new Promise((resolve, reject) => {
      if (userStore.isSeedValid(mnemonic)) {
        if (recover) {
          userStore.recoverWallet(mnemonic)
            .then((data) => {
              userStore.setEncryptedWallet(data.v3wallet);
              userStore.getEthBalance();
              this.setRedirect();
              resolve();
            });
        } else if (!recover) {
          if (userStore.isSeedValid(mnemonic)) {
            userStore.saveWalletToFile();
            this.setRedirect();
            resolve();
          }
        }
      } else {
        appStore.displayAlert(t('errors:validationError'), 2000);
        reject();
      }
    });
  }

  showError = () => {
    const { appStore, t } = this.props;
    appStore.displayAlert(t('errors:emptyFields'), 2000);
  }

  render() {
    const { userStore, recover, t } = this.props;
    const { redirect } = this.state;
    const { seedForm } = this;
    if (redirect) return recover ? <Redirect to="/userInfo" /> : <Redirect to="/creatingSuccess" />;
    return (
      <Container>
        <div className={styles.form}>
          <FormBlock>
            <Heading>
              {t('headings:seedCheck.heading')}
              {seedForm.loading ? t('headings:seedCheck.subheading.0') : t('headings:seedCheck.subheading.1')}
            </Heading>
            {seedForm.loading
              ? <Loader />
              : (
                <SeedInput
                  form={this.seedForm}
                  seed={userStore.mnemonic}
                />
              )}
          </FormBlock>
          <NavLink to={`${recover ? '/' : '/showSeed'}`}>
            <Button theme="back">
              <BackIcon />
              {t('buttons:back')}
            </Button>
          </NavLink>
        </div>
      </Container>
    );
  }
}


InputSeed.propTypes = {
  userStore: propTypes.shape({
    setMnemonicRepeat: propTypes.func.isRequired,
    isSeedValid: propTypes.func.isRequired,
    recoverWallet: propTypes.func.isRequired,
    setEncryptedWallet: propTypes.func.isRequired,
    getEthBalance: propTypes.func.isRequired,
    saveWalletToFile: propTypes.func.isRequired,
    mnemonic: propTypes.arrayOf(propTypes.string).isRequired,
  }).isRequired,
  appStore: propTypes.shape({
    displayAlert: propTypes.func.isRequired,
  }).isRequired,
  recover: propTypes.bool.isRequired,
  t: propTypes.func.isRequired,
};

export default InputSeed;
