import React from 'react';
import propTypes from 'prop-types';
import styles from './Button.scss';

export const Button = ({ children, className, onClick }) => (
  <button type="button" className={`${styles.btn} ${className}`} onClick={() => onClick()}>
    <span className="btn__text">
      {children}
    </span>
  </button>
);

Button.propTypes = {
  children: propTypes.string.isRequired,
  className: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};

export const IconButton = ({ children, className, onClick }) => (
  <button type="button" className={`${styles.btn} ${className}`} onClick={() => onClick()}>
    {children[0]}
    <span className="btn__text">
      {children[1]}
    </span>
  </button>
);

IconButton.propTypes = {
  children: propTypes.arrayOf(propTypes.node).isRequired,
  className: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};
