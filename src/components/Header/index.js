import React from 'react';
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo';
import HeaderNav from './HeaderNav';
import LangSwitcher from '../LangSwitcher';
import User from '../User';

import styles from './Header.scss';
import { SettingsIcon } from '../Icons';

const Header = inject('userStore', 'appStore')(observer(({ appStore: { inProject }, userStore: { authorized, address } }) => (
  <header className={styles.header}>
    <Logo />
    {inProject ? <HeaderNav /> : ''}
    <hr className={`${styles.header__line}`} />
    <div className={styles.header__right}>
      <LangSwitcher />
      {authorized ? <User>{address}</User> : ''}
      <NavLink className={styles.header__settings} to="/settings">
        <SettingsIcon />
      </NavLink>
    </div>
  </header>
)));

export default Header;
