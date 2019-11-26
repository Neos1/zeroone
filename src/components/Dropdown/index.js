import React, { Component } from 'react';
import propTypes from 'prop-types';
import { DropdownArrow } from '../Icons';
import styles from './Dropdown.scss';
import DropdownOption from '../DropdownOption';

class Dropdown extends Component {
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
    const { onSelect, field } = this.props;
    this.setState({
      selectedLabel: selected,
      selectedValue: selected,
    });
    field.set(selected);
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
      children, options, field, subOptions,
    } = this.props;
    const { opened, selectedLabel, selectedValue } = this.state;

    const getOptions = options.map((option) => (
      <DropdownOption
        key={`dropdown-${option.label}`}
        label={option.label}
        value={option.label}
        subOption={subOptions[option.label.replace('0x', '')]}
        select={this.handleSelect}
      />
    ));
    // eslint-disable-next-line no-console

    return (
      <div className={`${styles.dropdown} ${opened ? 'dropdown--opened' : ''}`} ref={this.setWrapperRef}>
        <input type="hidden" value={field.value} />
        <button type="button" className={styles.dropdown__head} onKeyDown={this.toggleOptions} onClick={this.toggleOptions}>
          {children ? <span className={styles.dropdown__icon}>{children}</span> : ''}
          <span className={styles.dropdown__selected} data-value={selectedValue}>
            {selectedLabel || field.placeholder }
            <span className={styles.dropdown__arrow}>
              <DropdownArrow />
            </span>
          </span>
          <div className={styles['dropdown__head-line']} />
        </button>
        <div className={styles.dropdown__options}>
          {getOptions}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  children: propTypes.element,
  options: propTypes.arrayOf(propTypes.object).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  subOptions: propTypes.object,
  onSelect: propTypes.func.isRequired,
  field: propTypes.shape({
    set: propTypes.func.isRequired,
    value: propTypes.string.isRequired,
    placeholder: propTypes.string.isRequired,
  }).isRequired,
};
Dropdown.defaultProps = {
  children: '',
  subOptions: {},
};

export default Dropdown;
