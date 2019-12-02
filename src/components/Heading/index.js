import React from 'react';
import propTypes from 'prop-types';
import styles from './Heading.scss';

const Heading = ({ children }) => (
  <div className={styles.heading}>
    <h2 className={styles['heading--main']}>{children[0]}</h2>
    {children[1] ? <p className={styles['heading--sub']}>{children[1]}</p> : ''}
  </div>
);

Heading.propTypes = {
  children: propTypes.arrayOf(propTypes.string).isRequired,
};

export default Heading;
