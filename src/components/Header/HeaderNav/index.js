import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from '../Header.scss';

const HeaderNav = () => (
  <nav className={styles.header__nav}>
    <NavLink className={styles.header__link} to="/votings">Голосования</NavLink>
    /
    <NavLink className={styles.header__link} to="/questions">Вопросы</NavLink>
    /
    <NavLink className={styles.header__link} to="/usergroups">Участники</NavLink>
  </nav>
);

export default HeaderNav;
