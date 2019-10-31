/* eslint-disable react/button-has-type */
import React from 'react';
import propTypes from 'prop-types';
import styles from './Button.scss';

export const Button = ({
  children, type, className, onClick,
}) => (
  <button type={type} className={`${styles.btn} ${className}`} onClick={() => onClick()}>
    <span className="btn__text">
      {children}
    </span>
  </button>
);

Button.propTypes = {
  children: propTypes.string.isRequired,
  className: propTypes.string.isRequired,
  onClick: propTypes.func,
  type: propTypes.string,
};
Button.defaultProps = {
  type: 'button',
  onClick: () => false,
};

export const IconButton = ({
  children, type, className, onClick,
}) => (
  <button type={type} className={`${styles.btn} ${className}`} onClick={() => onClick()}>
    {children[0]}
    <span className="btn__text">
      {children[1]}
    </span>
  </button>
);

IconButton.propTypes = {
  children: propTypes.arrayOf(propTypes.node).isRequired,
  className: propTypes.string.isRequired,
  onClick: propTypes.func,
  type: propTypes.string,
};
IconButton.defaultProps = {
  type: 'button',
  onClick: () => false,
};
