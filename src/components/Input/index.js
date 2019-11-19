/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { observer } from 'mobx-react';
import styles from './Input.scss';

@observer
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleOnChange = (e) => {
    const { field, onInput } = this.props;
    field.onChange(e);
    onInput(field.value);
  }

  render() {
    const {
      children, field, className,
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
        <span className={styles.field__label}>{field.placeholder}</span>
        <p className={styles['field__error-text']}>
          {field.error}
        </p>
        <div className={styles.field__line} />
      </div>
    );
  }
}

Input.propTypes = {
  children: propTypes.element.isRequired,
  className: propTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  field: propTypes.object.isRequired,
  onInput: propTypes.func,
};
Input.defaultProps = {
  className: '',
  onInput: () => null,
};

export default Input;
