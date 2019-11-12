/* eslint-disable react/button-has-type */
import React from 'react';
import propTypes from 'prop-types';
import styles from './Button.scss';

export const Button = ({
  children, type, disabled, className, onClick,
}) => (
  <button type={type} disabled={disabled} className={`${styles.btn} ${className}`} onClick={() => onClick()}>
    <span className="btn__text">
      {children}
    </span>
  </button>
);

Button.propTypes = {
  children: propTypes.string.isRequired,
  className: propTypes.string.isRequired,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  type: propTypes.string,
};
Button.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => false,
};

export const IconButton = ({
  children, type, disabled, className, onClick,
}) => (
  <button type={type} disabled={disabled} className={`${styles.btn} ${className}`} onClick={() => onClick()}>
    <p className="btn__content">
      {children[0]}
      <span className="btn__text">
        {children[1]}
      </span>
    </p>
  </button>
);

IconButton.propTypes = {
  children: propTypes.arrayOf(propTypes.node).isRequired,
  className: propTypes.string.isRequired,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  type: propTypes.string,
};
IconButton.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: () => false,
};
