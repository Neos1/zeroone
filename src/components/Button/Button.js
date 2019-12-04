import React from 'react';
import propTypes from 'prop-types';

import styles from './Button.scss';

const Button = ({
  children,
  theme,
  size,
  type,
  disabled,
  icon,
  iconPosition,
  onClick,
}) => (
  // eslint-disable-next-line react/button-has-type
  <button
    type={type}
    disabled={disabled}
    className={`${styles.btn}
                ${styles[`btn--${theme}`]}
                ${size ? styles[`btn--${size}`] : ''}`}
    onClick={onClick}
  >
    <p className={styles.btn__content}>
      <span className={`${styles.btn__icon} ${iconPosition === 'top' ? styles['btn__icon--block'] : ''}`}>
        {icon}
      </span>
      <span className={styles.btn__text}>
        {children}
      </span>
    </p>
  </button>
);

Button.propTypes = {
  children: propTypes.string.isRequired,
  icon: propTypes.node,
  iconPosition: propTypes.bool,
  type: propTypes.string,
  disabled: propTypes.bool,
  onClick: propTypes.func.isRequired,
  theme: propTypes.string,
  size: propTypes.string,
};

Button.defaultProps = {
  type: 'button',
  theme: 'black',
  size: 'default',
  icon: null,
  iconPosition: false,
  disabled: false,
};

export default Button;
