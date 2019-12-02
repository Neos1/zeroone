import React from 'react';
import { inject, observer } from 'mobx-react';
import Logo from '../Logo';
import HeaderNav from './HeaderNav';
import LangSwitcher from '../LangSwitcher';
import User from '../User';

import styles from './Header.scss';

const Header = inject('userStore', 'appStore')(observer(({ appStore: { inProject }, userStore: { authorized, address } }) => (
  <header className={styles.header}>
    <Logo />
    {inProject ? <HeaderNav /> : ''}
    <hr className={`${styles.header__line}`} />
    <div>
      <LangSwitcher />
      {authorized ? <User>{address}</User> : ''}
    </div>
  </header>
)));

export default Header;
