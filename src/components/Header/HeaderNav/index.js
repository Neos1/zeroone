import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderNav = () => (
  <nav className="header__nav">
    <NavLink className="header__link" to="/votings">Голосования</NavLink>
    /
    <NavLink className="header__link" to="/questions">Вопросы</NavLink>
    /
    <NavLink className="header__link" to="/usergroups">Участники</NavLink>
  </nav>
);

export default HeaderNav;
