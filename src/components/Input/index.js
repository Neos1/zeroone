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

  handleOnChange(e) {
    const { field } = this.props;
    field.onChange(e);
  }

  render() {
    const {
      children, field, className,
    } = this.props;
    console.log(field);
    return (
      <div className={`${styles.field} ${className}`}>
        {children}
        <input className="field__input" {...field.bind()} onChange={this.handleOnChange.bind(this)} />
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
};
Input.defaultProps = {
  className: '',
};

export default Input;
