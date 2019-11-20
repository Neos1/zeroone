import React from 'react';
import propTypes from 'prop-types';

import styles from './Indicator.scss';

const Indicator = ({ checked }) => (
  <span className={`${styles.indicator} ${checked ? styles['indicator--checked'] : ''}`} />
);

Indicator.propTypes = {
  checked: propTypes.bool.isRequired,
};
export default Indicator;
