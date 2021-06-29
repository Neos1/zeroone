import React from 'react';
import propTypes from 'prop-types';
import styles from './User.scss';

const User = ({ children }) => (
  <div className={`${styles.user}`}>
    <img className={styles.user__image} src={`http://tinygraphs.com/spaceinvaders/${children}?theme=base&numcolors=2&size=22&fmt=svg`} alt="avatar" />
    <span className={`${styles.user__wallet} ${styles['user__wallet--full']}`}>{children}</span>
    <span className={`${styles.user__wallet} ${styles['user__wallet--half']}`}>{`${children.substr(0, 8)}...${children.substr(35, 41)}`}</span>
  </div>
);

User.propTypes = {
  children: propTypes.string.isRequired,
};

export default User;
