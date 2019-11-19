import React from 'react';
import styles from './Logo.scss';

const Logo = () => (

  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a href="#" className={styles.logo}>
    <span className={styles.logo__dark}>
      <span>01</span>
    </span>
    <span className={styles.logo__light}>
      <span>ZeroOne</span>
    </span>
  </a>
);
export default Logo;
