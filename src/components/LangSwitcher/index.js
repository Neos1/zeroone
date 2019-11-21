/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import i18n from '../../i18n';

import styles from './LangSwitcher.scss';

class LangSwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      value: 'RUS',
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

  toggleOptions=() => {
    const { opened } = this.state;
    this.setState({
      opened: !opened,
    });
  }

  selectOption=(e) => {
    const value = e.target.getAttribute('data-value');
    this.setState({ value });
    this.toggleOptions();
    i18n.changeLanguage(value);
  }

  closeOptions = () => {
    this.setState({
      opened: false,
    });
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.closeOptions();
    }
  }

  render() {
    const { opened, value } = this.state;
    return (
      <div className={`${styles.lang} ${opened ? styles['lang--opened'] : ''}`} ref={this.setWrapperRef}>
        <span className={styles['lang--selected']} onClick={this.toggleOptions}>
          {value}
        </span>
        <div className={styles.lang__options}>
          <span className={styles.lang__option} data-value="RUS" onClick={this.selectOption}> Русский (RUS)</span>
          <span className={styles.lang__option} data-value="ENG" onClick={this.selectOption}> English (ENG)</span>
        </div>
      </div>
    );
  }
}

export default LangSwitcher;
