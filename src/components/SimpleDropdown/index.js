import React, { Component } from 'react';
import propTypes from 'prop-types';
import { DropdownArrow } from '../Icons';
import styles from '../Dropdown/Dropdown.scss';
import DropdownOption from '../DropdownOption';

class SimpleDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      selectedValue: '',
      selectedLabel: '',
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }


  toggleOptions = () => {
    const { opened } = this.state;
    this.setState({ opened: !opened });
  }

  closeOptions = () => {
    this.setState({ opened: false });
  }


  handleSelect = (selected) => {
    const { onSelect } = this.props;
    this.setState({
      selectedLabel: selected,
      selectedValue: selected,
    });
    onSelect(selected);
    this.toggleOptions();
  }


  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.closeOptions();
    }
  }


  render() {
    const {
      children, options,
    } = this.props;
    const { opened, selectedLabel, selectedValue } = this.state;

    const getOptions = options.map((option) => (
      <DropdownOption
        key={`dropdown-${option.label}`}
        label={option.label}
        value={option.label}
        select={this.handleSelect}
      />
    ));
    // eslint-disable-next-line no-console


    return (
      <div className={`${styles.dropdown} ${opened ? 'dropdown--opened' : ''}`} ref={this.setWrapperRef}>
        <input type="hidden" />
        <button type="button" className="dropdown__head" onKeyDown={this.toggleOptions} onClick={this.toggleOptions}>
          {children ? <span className="dropdown__icon">{children}</span> : ''}
          <span className="dropdown__selected" data-value={selectedValue}>
            {selectedLabel || 'Выберите' }
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

SimpleDropdown.propTypes = {
  children: propTypes.element,
  options: propTypes.arrayOf(propTypes.object).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  onSelect: propTypes.func,
  // eslint-disable-next-line react/forbid-prop-types

};
SimpleDropdown.defaultProps = {
  children: '',
  onSelect: () => false,
};

export default SimpleDropdown;
