import React from 'react';
import propTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Logo from '../Logo';
import HeaderNav from './HeaderNav';
import LangSwitcher from '../LangSwitcher';
import User from '../User';

import styles from './Header.scss';

const Header = inject('userStore')(observer(({ userStore: { authorized, address }, isMenu }) => (
  <header className={styles.header}>
    <Logo />
    {isMenu ? <HeaderNav /> : ''}
    <hr className={`${styles.header__line}`} />
    <div>
      <LangSwitcher />
      {authorized ? <User>{address}</User> : ''}
    </div>
  </header>
)));
Header.propTypes = {
  isMenu: propTypes.bool,
};
Header.defaultProps = {
  isMenu: false,
};
export default Header;
