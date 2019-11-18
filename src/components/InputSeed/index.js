import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import propTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Container from '../Container';
import Heading from '../Heading';
import FormBlock from '../FormBlock';
import { IconButton } from '../Button';
import { BackIcon } from '../Icons';
import Loader from '../Loader';
import SeedInput from './SeedForm';

import styles from '../Login/Login.scss';

@withTranslation()
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
    const {
      userStore, appStore, recover, t,
    } = this.props;
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
      appStore.displayAlert(t('errors:validationError'), 2000);
    }
  }

  showError = () => {
    const { appStore, t } = this.props;
    appStore.displayAlert(t('errors:emptyFields'), 2000);
  }

  render() {
    const { userStore, recover, t } = this.props;
    const { loading, redirect } = this.state;
    if (redirect) return recover ? <Redirect to="/userInfo" /> : <Redirect to="/creatingSuccess" />;
    return (
      <Container>
        <div className={styles.form}>
          <FormBlock>
            <Heading>
              {t('headings:seedCheck.heading')}
              {loading ? t('headings:seedCheck.subheading.0') : t('headings:seedCheck.subheading.1')}
            </Heading>
            {loading
              ? <Loader />
              : (
                <SeedInput
                  submit={this.submitForm}
                  seed={userStore.mnemonic}
                  error={this.showError}
                />
              )}
          </FormBlock>
          <NavLink to={`${recover ? '/' : '/showSeed'}`}>
            <IconButton className="btn--link btn--noborder btn--back">
              <BackIcon />
              {t('buttons:back')}
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
  t: propTypes.func.isRequired,
};


export default InputSeed;
