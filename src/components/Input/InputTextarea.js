/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { observer } from 'mobx-react';

import styles from './Input.scss';

@observer
class InputTextarea extends Component {
  handleOnChange = (e) => {
    const { field, onInput } = this.props;
    field.onChange(e);
    onInput(field.value);
  }

  render() {
    const {
      field, className, hint,
    } = this.props;
    return (
      <div
        className={`
          ${styles['field--textarea']}
          ${field.error ? styles['field--error'] : ''}
          ${className}
        `}
      >
        <textarea
          className={styles['field__input--textarea']}
          {...field.bind()}
          value={field.value}
          onChange={this.handleOnChange}
        />
        <div className={styles['field__label--textarea']}>
          <span>{field.placeholder}</span>
          {hint}
        </div>
        <p className={styles['field__error-text']}>
          {field.error}
        </p>
      </div>
    );
  }
}

InputTextarea.propTypes = {
  className: propTypes.string,
  field: propTypes.shape({
    error: propTypes.string,
    value: propTypes.string.isRequired,
    placeholder: propTypes.string,
    label: propTypes.string,
    bind: propTypes.func.isRequired,
    onChange: propTypes.func.isRequired,
  }).isRequired,
  onInput: propTypes.func,
  hint: propTypes.element,
};

InputTextarea.defaultProps = {
  className: '',
  onInput: () => null,
  hint: null,
};

export default InputTextarea;
