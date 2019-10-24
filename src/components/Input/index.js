import React from 'react';
import propTypes from 'prop-types';
import styles from './Input.scss';

const Input = ({
  children, type, required = false, placeholder, className = '', errorText,
}) => (
  <div className={`${styles.field} ${className}`}>
    {children}
    <input
      className={styles.field__input}
      type={type}
      placeholder={placeholder}
      required={required}
    />
    <span className={styles.field__label}>{placeholder}</span>
    <p className={styles['field__error-text']}>
      {errorText}
    </p>
    <div className={styles.field__line} />
  </div>
);
Input.propTypes = {
  children: propTypes.element.isRequired,
  type: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
  className: propTypes.string,
  errorText: propTypes.string.isRequired,
  required: propTypes.bool.isRequired,
};
Input.defaultProps = {
  className: '',
};

export default Input;
