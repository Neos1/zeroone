/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import propTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { IconInfo, CloseIcon } from '../Icons';
import styles from './Alert.scss';

const Alert = inject('appStore')(observer(({ appStore }) => (
  <div className={`${styles.alert} ${appStore.alertVisible ? 'alert--visible' : ''}`}>
    <IconInfo />
    <span className="alert__text">
      {appStore.alertText}
    </span>
    <span className="alert__close" onClick={() => { appStore.closeAlert(); }}>
      <CloseIcon />
    </span>
  </div>
)));

Alert.propTypes = {
  appStore: propTypes.shape({
    alertVisible: propTypes.bool.isRequired,
    alertText: propTypes.string.isRequired,
  }).isRequired,
  children: propTypes.string.isRequired,
};

export default Alert;
