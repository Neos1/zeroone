import React from 'react';
import Button from '../../Button/Button';
import LangSwitcher from '../../LangSwitcher';

import styles from '../Settings.scss';

const LangChanger = () => (
  <div className={`${styles.settings__block} ${styles['settings__block--lang']}`}>
    <h2 className={styles['settings__block-heading']}>Язык интерфейса</h2>
    <div className={styles['settings__block-content']}>
      <LangSwitcher />
      <Button theme="white">Применить</Button>
    </div>
  </div>
);

export default LangChanger;
