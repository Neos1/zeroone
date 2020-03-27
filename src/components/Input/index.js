/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { observer } from 'mobx-react';

import styles from './Input.scss';

@observer
class Input extends Component {
  constructor(props) {
    super(props);

    const { field } = props;
    if (props.defaultValue) {
      field.set(props.defaultValue);
    }
  }

  handleOnChange = (e) => {
    const { field, onInput } = this.props;
    field.onChange(e);
    onInput(field.value);
  }

  render() {
    const {
      children, field, className, hint,
    } = this.props;
    return (
      <div className={`${styles.field} ${field.error ? styles['field--error'] : ''} ${className}`}>
        {children}
        <input
          className={styles.field__input}
          {...field.bind()}
          value={field.value}
          onChange={this.handleOnChange}
        />
        <span
          className={styles.field__label}
          onClick={() => { field.focus(); }}
        >
          {field.placeholder}
        </span>
        {hint}
        <p className={styles['field__error-text']}>
          {field.error}
        </p>
        <div className={styles.field__line} />
      </div>
    );
  }
}

Input.propTypes = {
  children: propTypes.element,
  className: propTypes.string,
  field: propTypes.shape({
    error: propTypes.string,
    value: propTypes.oneOfType([
      propTypes.string,
      propTypes.number,
    ]).isRequired,
    placeholder: propTypes.oneOfType([
      propTypes.string,
      propTypes.shape({}),
    ]).isRequired,
    set: propTypes.func.isRequired,
    focus: propTypes.func.isRequired,
    bind: propTypes.func.isRequired,
    onChange: propTypes.func.isRequired,
  }).isRequired,
  defaultValue: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onInput: propTypes.func,
  hint: propTypes.element,
};

Input.defaultProps = {
  children: null,
  className: '',
  onInput: () => null,
  defaultValue: '',
  hint: null,
};

export default Input;
