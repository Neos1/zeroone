/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import propTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { IconInfo, CloseIcon } from '../Icons';
import styles from './Alert.scss';

const Alert = inject('appStore')(observer(({ appStore }) => (
  <div className={`${styles.alert} ${appStore.alertVisible ? styles['alert--visible'] : ''}`}>
    <IconInfo />
    <span className={styles.alert__text}>
      {appStore.alertText}
    </span>
    <span className={styles.alert__close} onClick={() => { appStore.closeAlert(); }}>
      <CloseIcon />
    </span>
  </div>
)));

Alert.propTypes = {
  appStore: propTypes.shape({
    alertVisible: propTypes.bool.isRequired,
    alertText: propTypes.string.isRequired,
    closeAlert: propTypes.func.isRequired,
  }).isRequired,
  children: propTypes.string.isRequired,
};

export default Alert;
