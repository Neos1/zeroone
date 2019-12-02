import React from 'react';
import propTypes from 'prop-types';

import styles from './Container.scss';

const Container = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
);

Container.propTypes = {
  children: propTypes.node.isRequired,
};
export default Container;
