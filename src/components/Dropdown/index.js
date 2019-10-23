import React, { Component } from 'react';
import propTypes from 'prop-types';
import { DropdownArrow } from '../Icons';
import styles from './Dropdown.scss';

class Dropdown extends Component {
  constructor() {
    super();
    this.state = {
      opened: false,
      selectedValue: '',
      selectedLabel: '',
    };
  }

  toggleOptions() {
    const { opened } = this.state;
    this.setState({ opened: !opened });
  }

  selectOption(selected) {
    this.setState({
      selectedLabel: selected.label,
      selectedValue: selected.value,
    });
    this.toggleOptions();
  }

  render() {
    const { children, options } = this.props;
    const { opened, selectedLabel } = this.state;
    const getOptions = options.map((option, index) => (
      <p
        className="dropdown__option"
        data-value={option.value}
        key={`option-${index}`}
        onClick={this.selectOption.bind(this, option)}
      >
        {option.label}
      </p>
    ));

    return (
      <div className={`${styles.dropdown} ${opened ? 'dropdown--opened' : ''}`}>
        <p className="dropdown__head" onClick={this.toggleOptions.bind(this)}>
          {children ? <span className="dropdown__icon">{children}</span> : ''}
          <span className="dropdown__selected">
            {selectedLabel || 'Выберите кошелек'}
            <span className="dropdown__arrow">
              {' '}
              <DropdownArrow />
            </span>
          </span>
          <div className="dropdown__head-line" />
        </p>
        <div className="dropdown__options">
          {getOptions}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  children: propTypes.element,
  options: propTypes.arrayOf(propTypes.object).isRequired,
};
Dropdown.defaultProps = {
  children: '',
};

export default Dropdown;
