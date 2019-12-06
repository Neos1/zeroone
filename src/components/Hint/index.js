import React from 'react';
import propTypes from 'prop-types';

import styles from './Hint.scss';

const Hint = ({ children }) => (
  <div className={`${styles.hint}`}>
    <span className={styles.hint__icon} />
    <span className={styles.hint__text}>
      {children}
    </span>
  </div>
);

Hint.propTypes = {
  children: propTypes.string.isRequired,
};

export default Hint;
