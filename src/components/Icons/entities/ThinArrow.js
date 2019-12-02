import React from 'react';
import PropTypes from 'prop-types';

const ThinArrow = ({
  width,
  height,
  color,
}) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 5 9"
    fill={color}
  >
    <path
      d="M3.91967 8.80084L4.70264 7.861L2.13002 4.77295L4.70264 1.6849L3.91967 0.745055L0.564077 4.77295L3.91967 8.80084Z"
    />
  </svg>
);

ThinArrow.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

ThinArrow.defaultProps = {
  width: 5,
  height: 9,
  color: 'currentColor',
};

export default ThinArrow;
