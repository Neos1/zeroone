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
  children: propTypes.oneOfType([
    propTypes.string,
    propTypes.shape({}),
  ]).isRequired,
  icon: propTypes.node,
  iconPosition: propTypes.bool,
  type: propTypes.string,
  disabled: propTypes.bool,
  onClick: propTypes.func,
  theme: propTypes.string,
  size: propTypes.string,
  hint: propTypes.oneOfType([
    propTypes.string,
    propTypes.shape({}),
  ]),
  className: propTypes.string,
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
