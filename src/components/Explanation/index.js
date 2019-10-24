import React from 'react';
import propTypes from 'prop-types';
import styles from './Explanation.scss';

const Explanation = ({ children }) => (
  <p className={`${styles.explanation}`}>
    <p className={styles.explanation__string}>{children}</p>
  </p>
);

Explanation.defaultProps = {
  children: '',
};

Explanation.propTypes = {
  children: propTypes.string,
};
export default Explanation;
