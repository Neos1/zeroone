import React, { Component } from 'react';
import propTypes from 'prop-types';
import nextId from 'react-id-generator';
import { withTranslation } from 'react-i18next';
import { DropdownArrowIcon } from '../Icons';
import DropdownOption from '../SimpleDropdownOption';

import styles from '../Dropdown/Dropdown.scss';

@withTranslation()
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
      validate: propTypes.func,
      error: propTypes.string,
    }),
    initIndex: propTypes.number,
    t: propTypes.func.isRequired,
    placeholder: propTypes.string.isRequired,
    isNewQuestion: propTypes.bool,
  };

  static defaultProps = {
    children: '',
    onSelect: () => false,
    field: {
      set: () => {},
      validate: () => {},
      error: null,
    },
    initIndex: null,
    isNewQuestion: false,
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
    document.removeEventListener('mousedown', this.handleClickOutside);
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

  handleSelect = async (selected) => {
    const { onSelect, field } = this.props;
    field.set(selected.value);
    field.validate();
    onSelect(selected);
    this.setState({
      selectedLabel: selected.label,
      selectedValue: selected.value,
    });
    this.toggleOptions();
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.closeOptions();
    }
  }

  render() {
    const {
      children,
      options,
      t,
      field,
      placeholder,
      isNewQuestion,
    } = this.props;
    const { opened, selectedLabel, selectedValue } = this.state;
    const getOptions = options.map((option) => (
      <DropdownOption
        key={nextId('dropdown_option')}
        label={option.label}
        value={option.value}
        select={this.handleSelect}
      />
    ));
    return (
      <div
        className={`
          ${styles.dropdown}
          ${styles['dropdown--simple']}
          ${opened ? 'dropdown--opened' : ''}
          ${field && field.error ? styles['dropdown--error'] : ''}
        `}
        ref={this.setWrapperRef}
      >
        <input type="hidden" />
        <button type="button" className="dropdown__head" onKeyDown={this.toggleOptions} onClick={this.toggleOptions}>
          {children ? <span className="dropdown__icon">{children}</span> : ''}
          <span className="dropdown__selected" data-value={selectedValue}>
            {selectedLabel || placeholder || t('other:select') }
            {
              (isNewQuestion && selectedLabel !== '')
                ? (
                  <span className={styles['dropdown__selected-label']}>
                    {placeholder}
                  </span>
                )
                : ''
            }
            <span className="dropdown__arrow">
              <DropdownArrowIcon />
            </span>
          </span>
          <div className="dropdown__head-line" />
        </button>
        <div className="dropdown__options">
          {getOptions}
        </div>
        <p className={styles['dropdown__error-text']}>
          {field.error}
        </p>
      </div>
    );
  }
}

export default SimpleDropdown;
