import React from 'react';
import propTypes from 'prop-types';

import styles from './Container.scss';

const Container = ({ children, className }) => (
  <div className={`${styles.container} ${className}`}>
    {children}
  </div>
);

Container.propTypes = {
  children: propTypes.node.isRequired,
  className: propTypes.string,
};
Container.defaultProps = {
  className: '',
};
export default Container;
