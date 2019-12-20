import React, { Component } from 'react';
import propTypes from 'prop-types';
import { DropdownArrowIcon } from '../Icons';
import DropdownOption from '../SimpleDropdownOption';

import styles from '../Dropdown/Dropdown.scss';

class SimpleDropdown extends Component {
  static propTypes = {
    children: propTypes.oneOfType([
      propTypes.element,
      propTypes.string,
    ]),
    options: propTypes.arrayOf(propTypes.shape({
      value: propTypes.oneOfType([
        propTypes.string,
        propTypes.number,
      ]),
      label: propTypes.string,
    })).isRequired,
    onSelect: propTypes.func,
    field: propTypes.shape({
      set: propTypes.func,
    }),
    initIndex: propTypes.number,
  };

  static defaultProps = {
    children: '',
    onSelect: () => false,
    field: {
      set: () => {},
    },
    initIndex: 0,
  }

  constructor(props) {
    super(props);
    const {
      initIndex,
      options,
    } = props;
    const initOption = options[initIndex] || {};
    this.state = {
      opened: false,
      selectedValue: initOption.value || '',
      selectedLabel: initOption.label || '',
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
    const { onSelect, field } = this.props;
    field.set(selected.value);
    this.setState({
      selectedLabel: selected.label,
      selectedValue: selected.value,
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
        value={option.value}
        select={this.handleSelect}
      />
    ));
    return (
      <div className={`${styles.dropdown} ${opened ? 'dropdown--opened' : ''}`} ref={this.setWrapperRef}>
        <input type="hidden" />
        <button type="button" className="dropdown__head" onKeyDown={this.toggleOptions} onClick={this.toggleOptions}>
          {children ? <span className="dropdown__icon">{children}</span> : ''}
          <span className="dropdown__selected" data-value={selectedValue}>
            {selectedLabel || 'Выберите' }
            <span className="dropdown__arrow">
              <DropdownArrowIcon />
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

export default SimpleDropdown;
