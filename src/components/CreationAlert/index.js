/* eslint-disable no-nested-ternary */
import React from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import Container from '../Container';
import FormBlock from '../FormBlock';
import { Button } from '../Button';
import Heading from '../Heading';

import styles from '../Login/Login.scss';

const WalletAddress = withTranslation()(inject('userStore')(observer(({ t, userStore }) => (
  <div className={styles.form__wallet}>
    <p className={styles['form__wallet-label']}>{t('other:yourWallet')}</p>
    <p className={styles['form__wallet-text']}>{userStore.address}</p>
  </div>
))));
WalletAddress.propTypes = {
  userStore: propTypes.object.isRequired,
  t: propTypes.func.isRequired,
};

const CreationAlert = withTranslation()(({ t, success = false, recover = false }) => (
  <Container>
    <div className={styles.form}>
      <FormBlock>
        <Heading>
          {success ? t('headings:walletCreated.heading') : recover ? t('headings:walletRestored.heading') : ''}
          {success ? t('headings:walletCreated.subheading') : recover ? t('headings:walletRestored.subheading') : ''}
        </Heading>
        <WalletAddress />
        <NavLink to="/">
          <Button className="btn--default btn--black">
            {t('buttons:toWallets')}
          </Button>
        </NavLink>
      </FormBlock>
    </div>
  </Container>
));
CreationAlert.propTypes = {
  success: propTypes.bool.isRequired,
  recover: propTypes.bool.isRequired,
};
export default CreationAlert;
