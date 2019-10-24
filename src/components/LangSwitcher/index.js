import React from 'react';
import styles from './LangSwitcher.scss';


const LangSwitcher = () => (
  <div className={`${styles.lang}`}>
    <span className={styles['lang--selected']} data-value="RUS"> RUS </span>
    <div className={styles.lang__options}>
      <span className={styles.lang__option} data-value="RUS"> Русский (RUS)</span>
      <span className={styles.lang__option} data-value="ENG"> Русский (ENG)</span>
      <span className={styles.lang__option} data-value="ESP"> Русский (ESP)</span>
    </div>
  </div>
);

export default LangSwitcher;
