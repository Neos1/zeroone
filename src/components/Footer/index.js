import React from 'react';
import { GithubIcon } from '../Icons';

import styles from './Footer.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <a href="/">
      <GithubIcon />
      <span>GitHub</span>
    </a>
  </footer>
);

export default Footer;
