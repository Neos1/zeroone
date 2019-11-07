import React from 'react';
import propTypes from 'prop-types';
import styles from './User.scss';

const User = ({ children }) => (
  <div className={`${styles.user}`}>
    <img className="user__image" src={`http://tinygraphs.com/spaceinvaders/${children}?theme=base&numcolors=2&size=22&fmt=svg`} alt="avatar" />
    <span className="user__wallet user__wallet--full">{children}</span>
    <span className="user__wallet user__wallet--half">0x295856...5d511f</span>
  </div>
);

User.propTypes = {
  children: propTypes.string.isRequired,
};
export default User;
