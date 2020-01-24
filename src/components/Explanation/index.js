import React from 'react';
import propTypes from 'prop-types';
import styles from './Explanation.scss';

const Explanation = ({ children, bold }) => (
  <p className={`${styles.explanation} ${bold ? styles['explanation--bold'] : ''}`}>
    <p className={`${styles.explanation__string}`}>{children}</p>
  </p>
);

Explanation.defaultProps = {
  children: '',
  bold: false,
};

Explanation.propTypes = {
  children: propTypes.node,
  bold: propTypes.bool,
};
export default Explanation;
