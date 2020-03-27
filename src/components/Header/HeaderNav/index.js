import React from 'react';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import styles from '../Header.scss';

const HeaderNav = ({
  t,
}) => (
  <nav className={styles.header__nav}>
    <NavLink className={styles.header__link} to="/votings">{t('other:voting')}</NavLink>
    /
    <NavLink className={styles.header__link} to="/questions">{t('other:questions')}</NavLink>
    /
    <NavLink className={styles.header__link} to="/members">{t('other:members')}</NavLink>
  </nav>
);

HeaderNav.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(HeaderNav);
