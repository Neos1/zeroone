/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import propTypes from 'prop-types';
import i18n from '../../i18n';
import styles from './LangSwitcher.scss';
import { getCorrectMomentLocale } from '../../utils/Date';

@withTranslation()
class LangSwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
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
    this.setState({
      opened: !opened,
    });
  }

  selectOption = (e) => {
    const value = e.target.getAttribute('data-value');
    this.toggleOptions();
    i18n.changeLanguage(value);
    moment.locale(getCorrectMomentLocale(i18n.language));
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
    const { opened } = this.state;
    const { t } = this.props;
    const { language } = i18n;
    return (
      <div className={`${styles.lang} ${opened ? styles['lang--opened'] : ''}`} ref={this.setWrapperRef}>
        <span className={styles['lang--selected']} onClick={this.toggleOptions}>
          {language}
        </span>
        <div className={styles.lang__options}>
          {
          i18n.languages.map((item) => (
            <button
              type="button"
              className={styles.lang__option}
              data-value={item}
              onClick={this.selectOption}
            >
              {`${t(`other:${item}`)} (${item})`}
            </button>
          ))
          }
        </div>
      </div>
    );
  }
}

LangSwitcher.propTypes = {
  t: propTypes.func.isRequired,
};

export default LangSwitcher;
