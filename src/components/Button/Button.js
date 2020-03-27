import React from 'react';
import PropTypes from 'prop-types';

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
  hint,
  className,
}) => (
  // eslint-disable-next-line react/button-has-type
  <button
    type={type}
    disabled={disabled}
    className={`
      ${styles.btn}
      ${styles[`btn--${theme}`]}
      ${size ? styles[`btn--${size}`] : ''}
      ${hint ? styles['btn--with-hint'] : ''}
      ${className || ''}
    `}
    onClick={onClick}
  >
    {
      hint
        ? (
          <div className={styles.btn__hint}>
            <div className={styles['btn__hint-content']}>
              {hint}
            </div>
          </div>
        )
        : null
    }
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
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.shape({}),
  ]).isRequired,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  theme: PropTypes.string,
  size: PropTypes.string,
  hint: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({}),
  ]),
  className: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  theme: 'black',
  size: 'default',
  icon: null,
  iconPosition: false,
  disabled: false,
  onClick: () => {},
  hint: null,
  className: '',
};

export default Button;
