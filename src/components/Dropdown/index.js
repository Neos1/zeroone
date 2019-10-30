import React, { Component } from 'react';
import propTypes from 'prop-types';
import { DropdownArrow } from '../Icons';
import styles from './Dropdown.scss';
import DropdownOption from '../DropdownOption';

class Dropdown extends Component {
  constructor() {
    super();
    this.state = {
      opened: false,
      selectedValue: '',
      selectedLabel: '',
    };
  }

  toggleOptions = () => {
    const { opened } = this.state;
    this.setState({ opened: !opened });
  }

  selectOption = (selected) => {
    const { onSelect } = this.props;
    this.setState({
      selectedLabel: selected,
      selectedValue: selected,
    });
    onSelect(selected);
    this.toggleOptions();
  }

  render() {
    const { children, options } = this.props;
    const { opened, selectedLabel, selectedValue } = this.state;
    const getOptions = options.map((option, index) => (
      <DropdownOption key={`${index + 1}`} label={option.label} value={option.label} select={this.selectOption} />
    ));

    return (
      <div className={`${styles.dropdown} ${opened ? 'dropdown--opened' : ''}`}>
        <input type="hidden" value={selectedValue} />
        <button type="button" className="dropdown__head" onKeyDown={this.toggleOptions} onClick={this.toggleOptions}>
          {children ? <span className="dropdown__icon">{children}</span> : ''}
          <span className="dropdown__selected" data-value={selectedValue}>
            {selectedLabel || 'Выберите кошелек'}
            <span className="dropdown__arrow">
              <DropdownArrow />
            </span>
          </span>
          <div className="dropdown__head-line" />
        </button>
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
  onSelect: propTypes.func.isRequired,
};
Dropdown.defaultProps = {
  children: '',
};

export default Dropdown;
