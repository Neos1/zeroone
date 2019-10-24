import React from 'react';
import propTypes from 'prop-types';
import { InfoIcon, CloseIcon } from '../Icons';
import styles from './Alert.scss';

const Alert = ({ children, visible }) => (
  <div className={`${styles.alert} ${visible ? styles['alert--visible'] : ''}`}>
    <InfoIcon />
    <span className={styles.alert__text}>
      {children}
    </span>
    <span className={styles.alert__close}>
      <CloseIcon />
    </span>
  </div>
);

Alert.propTypes = {
  visible: propTypes.bool.isRequired,
  children: propTypes.string.isRequired,
};

export default Alert;
