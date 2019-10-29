import React from 'react';
import propTypes from 'prop-types';
import Logo from '../Logo';
import HeaderNav from './HeaderNav';
import LangSwitcher from '../LangSwitcher';
import User from '../User';

import styles from './Header.scss';

const Header = ({ isMenu, isLogged }) => (
  <header className={styles.header}>
    <Logo />
    {isMenu ? <HeaderNav /> : ''}
    <hr className={styles.header__line} />
    <div>
      <LangSwitcher />
      {isLogged ? <User /> : ''}
    </div>
  </header>
);
Header.propTypes = {
  isMenu: propTypes.bool.isRequired,
  isLogged: propTypes.bool.isRequired,
};
export default Header;
