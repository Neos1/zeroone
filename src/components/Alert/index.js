import React from 'react';
import propTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { IconInfo, CloseIcon } from '../Icons';
import styles from './Alert.scss';

const Alert = inject('appStore')(observer(({ appStore, appStore: { alert } }) => (
  <div className={`${styles.alert} ${alert.visible ? styles['alert--visible'] : ''}`}>
    <IconInfo />
    <span className={styles.alert__text}>
      {alert.text}
    </span>
    <button type="button" className={styles.alert__close} onClick={() => appStore.closeAlert()}>
      <CloseIcon />
    </button>
  </div>
)));

Alert.propTypes = {
  alertStore: propTypes.shape({
    text: propTypes.string.isRequired,
    visible: propTypes.bool.isRequired,
    closeAlert: propTypes.func.isRequired,
  }),
};

export default Alert;
