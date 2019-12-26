
import React from 'react';
import { GithubIcon } from '../Icons';

import styles from './Footer.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <a href="https://github.com/Neos1/zeroone" target="_blank" rel="noopener noreferrer">
      <GithubIcon />
      <span>GitHub</span>
    </a>
  </footer>
);

export default Footer;
