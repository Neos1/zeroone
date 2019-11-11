/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { observer } from 'mobx-react';
import styles from './Input.scss';

@observer
class Input extends Component {
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
      <div className={`${styles.field} ${className}`}>
        {children}
        <input className="field__input" {...field.bind()} value={field.value} onChange={this.handleOnChange} />
        <span className="field__label">{field.placeholder}</span>
        <p className="field__error-text">
          {field.error}
        </p>
        <div className="field__line" />
      </div>
    );
  }
}

Input.propTypes = {
  children: propTypes.element.isRequired,
  className: propTypes.string,
  field: propTypes.object.isRequired,
  onInput: propTypes.func,
};
Input.defaultProps = {
  className: '',
  onInput: () => null,
};

export default Input;
