import React from 'react';
import propTypes from 'prop-types';
import Logo from '../Logo';
import LangSwitcher from '../LangSwitcher';
import User from '../User';

import styles from './Header.scss';
import HeaderNav from './HeaderNav';

const Header = ({ isMenu, isLogged }) => (
  <header className={styles.header}>
    <Logo />
    {isMenu ? <HeaderNav /> : ''}
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
