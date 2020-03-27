import React from 'react';
import PropTypes from 'prop-types';
import styles from './Heading.scss';

const Heading = ({ children }) => (
  <div className={styles.heading}>
    <h2 className={styles['heading--main']}>{children[0]}</h2>
    {children[1] ? <p className={styles['heading--sub']}>{children[1]}</p> : ''}
  </div>
);

Heading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

export default Heading;
