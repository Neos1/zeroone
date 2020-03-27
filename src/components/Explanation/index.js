import React from 'react';
import propTypes from 'prop-types';
import styles from './Explanation.scss';

const Explanation = ({ children, bold }) => (
  <div className={`${styles.explanation} ${bold ? styles['explanation--bold'] : ''}`}>
    <div className={`${styles.explanation__string}`}>{children}</div>
  </div>
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
