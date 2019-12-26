import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import styles from './Logo.scss';

const Logo = inject('appStore')(observer(({ appStore: { inProject } }) => (
  <Link to={`${inProject ? '/questions' : '/'}`} className={styles.logo}>
    <span className={styles.logo__dark}>
      <span>01</span>
    </span>
    <span className={styles.logo__light}>
      <span>ZeroOne</span>
    </span>
  </Link>
)));

export default Logo;
