import React from 'react';
import PropTypes from 'prop-types';

const ThinArrow = ({
  width,
  height,
  color,
  reverse,
}) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 5 9"
    transform={`${reverse ? 'rotate(180)' : ''}`}
  >
    <path
      d="M3.91967 8.80084L4.70264 7.861L2.13002 4.77295L4.70264 1.6849L3.91967 0.745055L0.564077 4.77295L3.91967 8.80084Z"
      stroke={color}
    />
  </svg>
);

ThinArrow.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  reverse: PropTypes.bool,
};

ThinArrow.defaultProps = {
  width: 5,
  height: 9,
  color: 'currentColor',
  reverse: false,
};

export default ThinArrow;
