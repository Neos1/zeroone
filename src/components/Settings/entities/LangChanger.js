import React from 'react';
import { withTranslation } from 'react-i18next';
import Button from '../../Button/Button';
import LangSwitcher from '../../LangSwitcher';

import styles from '../Settings.scss';

const LangChanger = withTranslation()(({ t }) => (
  <div className={`${styles.settings__block} ${styles['settings__block--lang']}`}>
    <h2 className={styles['settings__block-heading']}>{t('headings:interfaceLanguage')}</h2>
    <div className={styles['settings__block-content']}>
      <LangSwitcher />
      <Button theme="white">{t('buttons:apply')}</Button>
    </div>
  </div>
));

export default LangChanger;
