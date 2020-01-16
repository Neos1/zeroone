import React, { Component } from 'react';
import propTypes from 'prop-types';
import DropdownOption from '../DropdownOption';
import { DropdownArrowIcon } from '../Icons';
import i18n from '../../i18n';

import styles from './Dropdown.scss';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '',
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    const { field } = props;
    window.ipcRenderer.on('change-language:confirm', () => {
      field.set('placeholder', i18n.t(`fields:${field.label}`));
    });
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
    const { opened, selectedValue } = this.state;

    const getOptions = options.map((option) => (
      <DropdownOption
        key={`dropdown-${option.label}`}
        label={option.label}
        value={option.label}
        subOption={subOptions[option.label.replace('0x', '')]}
        select={this.handleSelect}
      />
    ));

    return (
      <div
        className={`
        ${styles.dropdown} 
        ${opened ? 'dropdown--opened' : ''}
        ${field && field.error ? styles['dropdown--error'] : ''}
      `}
        ref={this.setWrapperRef}
      >
        <input type="hidden" value={field.value} />
        <button type="button" className={styles.dropdown__head} onKeyDown={this.toggleOptions} onClick={this.toggleOptions}>
          {children ? <span className={styles.dropdown__icon}>{children}</span> : ''}
          <span className={styles.dropdown__selected} data-value={selectedValue}>
            {field.value || field.placeholder }
            <span className={styles.dropdown__arrow}>
              <DropdownArrowIcon />
            </span>
          </span>
          <div className={styles['dropdown__head-line']} />
        </button>
        <div className={styles.dropdown__options}>
          {getOptions}
        </div>
        <p className={styles['dropdown__error-text']}>
          {field.error}
        </p>
      </div>
    );
  }
}

Dropdown.propTypes = {
  children: propTypes.element,
  options: propTypes.arrayOf(propTypes.object).isRequired,
  subOptions: propTypes.shape({}),
  onSelect: propTypes.func.isRequired,
  field: propTypes.shape({
    set: propTypes.func.isRequired,
    value: propTypes.string.isRequired,
    placeholder: propTypes.oneOfType([
      propTypes.string,
      propTypes.shape({}),
    ]).isRequired,
    label: propTypes.string.isRequired,
    error: propTypes.string.isRequired,
  }).isRequired,
};

Dropdown.defaultProps = {
  children: '',
  subOptions: {},
};


export default Dropdown;
