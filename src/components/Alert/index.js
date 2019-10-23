import React from 'react';
import propTypes from 'prop-types';
import { IconInfo, CloseIcon } from '../Icons';
import styles from './Alert.scss';

const Alert = ({ children, visible }) => (
  <div className={`${styles.alert} ${visible ? 'alert--visible' : ''}`}>
    <IconInfo />
    <span className="alert__text">
      {children}
    </span>
    <span className="alert__close">
      <CloseIcon />
    </span>
  </div>
);

Alert.propTypes = {
  visible: propTypes.bool.isRequired,
  children: propTypes.string.isRequired,
};

export default Alert;
