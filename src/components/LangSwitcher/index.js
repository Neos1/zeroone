/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
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
      <div className={`${styles.lang} ${opened ? 'lang--opened' : ''}`} ref={this.setWrapperRef}>
        <span className="lang--selected" data-value={value} onClick={this.toggleOptions}>
          {' '}
          {value}
        </span>
        <div className="lang__options">
          <span className="lang__option" data-value="RUS" onClick={this.selectOption}> Русский (RUS)</span>
          <span className="lang__option" data-value="ENG" onClick={this.selectOption}> Русский (ENG)</span>
          <span className="lang__option" data-value="ESP" onClick={this.selectOption}> Русский (ESP)</span>
        </div>
      </div>
    );
  }
}

export default LangSwitcher;
