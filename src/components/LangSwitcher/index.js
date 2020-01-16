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
  static propTypes = {
    t: propTypes.func.isRequired,
    disabled: propTypes.bool.isRequired,
    onSelect: propTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      language: null,
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    window.ipcRenderer.on('change-language:confirm', (event, value) => {
      this.changeLanguage(value);
    });
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    window.ipcRenderer.removeListener('change-language:confirm', (event, value) => {
      this.changeLanguage(value);
    });
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

  changeLanguage = (value) => {
    i18n.changeLanguage(value);
    moment.locale(getCorrectMomentLocale(i18n.language));
  }

  selectOption = (e) => {
    const { props: { disabled, onSelect } } = this;
    const value = e.target.getAttribute('data-value');
    this.toggleOptions();
    this.setState({ language: value });
    if (disabled) {
      onSelect(value);
    } else {
      window.ipcRenderer.send('change-language:request', value);
    }
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
    const { opened, language: stateLanguage } = this.state;
    const { t } = this.props;
    const { language } = i18n;
    return (
      <div className={`${styles.lang} ${opened ? styles['lang--opened'] : ''}`} ref={this.setWrapperRef}>
        <span className={styles['lang--selected']} onClick={this.toggleOptions}>
          {stateLanguage !== null ? stateLanguage : language}
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


export default LangSwitcher;
