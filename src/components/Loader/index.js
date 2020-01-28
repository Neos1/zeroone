import React from 'react';
import PropTypes from 'prop-types';

import styles from './Loader.scss';

const Loader = ({
  theme,
}) => (
  <div
    className={`
      ${styles.loader}
      ${styles[`loader--${theme}`]}
    `}
  />
);

Loader.propTypes = {
  theme: PropTypes.oneOf(['white', 'gray']),
};

Loader.defaultProps = {
  theme: 'white',
};

export default Loader;
