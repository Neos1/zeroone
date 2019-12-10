import React from 'react';
import PropTypes from 'prop-types';

const DateIcon = ({
  width,
  height,
  color,
}) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.6667 2.6665H3.33333C2.59695 2.6665 2 3.26346 2 3.99984V13.3332C2 14.0696 2.59695 14.6665 3.33333 14.6665H12.6667C13.403 14.6665 14 14.0696 14 13.3332V3.99984C14 3.26346 13.403 2.6665 12.6667 2.6665Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10.6667 1.3335V4.00016" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.33325 1.3335V4.00016" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 6.6665H14" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

DateIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

DateIcon.defaultProps = {
  width: 16,
  height: 16,
  color: '#4d4d4d',
};

export default DateIcon;
