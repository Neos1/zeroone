import React, { Component } from 'react';
import propTypes from 'prop-types';
import DropdownOption from '../DropdownOption/DropdownOption';
import { DropdownArrowIcon } from '../Icons';
import styles from './Dropdown.scss';

class Dropdown extends Component {
  constructor() {
    super();
    this.state = {
      selectedValue: '',
      selectedLabel: '',
    };
  }

  toggleOptions = () => {
    const { toggleOptions } = this.props;
    toggleOptions();
  }

  selectOption = ({ value, label }) => {
    this.setState({
      selectedLabel: label,
      selectedValue: value,
    });
    this.toggleOptions();
  }

  render() {
    const { children, options: data, opened } = this.props;
    const { selectedLabel, selectedValue } = this.state;

    const options = data.map((option) => (
      <DropdownOption
        label={option.label}
        value={option.value}
        select={this.selectOption}
      />
    ));

    return (
      <div className={`${styles.dropdown} ${opened ? 'dropdown--opened' : ''}`}>
        <button type="button" className={styles.dropdown__head} onClick={this.toggleOptions}>
          {children ? <span className={styles.dropdown__icon}>{children}</span> : ''}
          <span className={styles.dropdown__selected} data-value={selectedValue}>
            {selectedLabel || 'Выберите кошелек'}
            <span className="dropdown__arrow">
              {' '}
              <DropdownArrowIcon />
            </span>
          </span>
          <div className={styles['dropdown__head-line']} />
        </button>
        <div className={styles.dropdown__options}>
          {options}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  children: propTypes.element,
  options: propTypes.arrayOf(propTypes.object).isRequired,
  opened: propTypes.bool.isRequired,
  toggleOptions: propTypes.func.isRequired,
};
Dropdown.defaultProps = {
  children: '',
};


export default Dropdown;
