import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import Button from '../../Button/Button';
import LangSwitcher from '../../LangSwitcher';
import { getCorrectMomentLocale } from '../../../utils/Date';


import styles from '../Settings.scss';

@withTranslation()
class LangChanger extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      language: i18n.language,
    };
    window.ipcRenderer.on('change-language:confirm', (event, language) => {
      this.changeLanguage(language);
    });
  }

  componentWillUnmount() {
    window.ipcRenderer.removeListener('change-language:confirm', (event, language) => {
      this.changeLanguage(language);
    });
  }

  handleSelect = (language) => {
    this.setState({ language });
  }

  changeLanguage = (language) => {
    i18n.changeLanguage(language);
    moment.locale(getCorrectMomentLocale(i18n.language));
  }

  setLanguage = () => {
    const { language } = this.state;
    window.ipcRenderer.send('change-language:request', language);
  }

  render() {
    const { props: { t } } = this;
    return (
      <div className={`${styles.settings__block} ${styles['settings__block--lang']}`}>
        <h2 className={styles['settings__block-heading']}>{t('headings:interfaceLanguage')}</h2>
        <div className={styles['settings__block-content']}>
          <LangSwitcher disabled onSelect={this.handleSelect} />
          <Button theme="white" onClick={this.setLanguage}>{t('buttons:apply')}</Button>
        </div>
      </div>
    );
  }
}


export default LangChanger;
