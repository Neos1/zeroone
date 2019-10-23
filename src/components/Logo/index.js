import React from 'react';
import styles from './Logo.scss';

const Logo = () => (
  <a href="/" className={styles.logo}>
    <span className="logo__dark">01</span>
    <span className="logo__light">ZeroOne</span>
  </a>
);
export default Logo;
