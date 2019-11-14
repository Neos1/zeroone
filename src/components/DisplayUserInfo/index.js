import React from 'react';
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Container from '../Container';
import FormBlock from '../FormBlock';
import Heading from '../Heading';
import { Button } from '../Button';
import styles from '../Login/Login.scss';


const DisplayUserInfo = inject('userStore')(observer(withTranslation()(({ t, userStore: { balance, address } }) => (
  <Container>
    <div className={styles.form}>
      {' '}
      <FormBlock>
        <Heading>
          {t('headings:walletRestoring.heading')}
          {t('headings:walletRestoring.subheading')}
        </Heading>
        <form>
          <div className="form__token">
            <div className="form__token-half">
              <p className="form__token-label">{t('other:walletAddress')}</p>
              <p className="form__token-value">{`${address.substr(0, 8)}...${address.substr(35, 41)}`}</p>
            </div>
            <div className="form__token-divider" />
            <div className="form__token-half">
              <p className="form__token-label">{t('other:balance')}</p>
              <p className="form__token-value">{balance}</p>
            </div>
          </div>
          <div className={styles.form__submit}>
            <NavLink to="/recoverPassword">
              <Button className="btn--default btn--black" type="button">{t('buttons:continue')}</Button>
            </NavLink>
          </div>
        </form>
      </FormBlock>
    </div>
  </Container>
))));

export default DisplayUserInfo;
