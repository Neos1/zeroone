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
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.6667 3.47314H3.33333C2.59695 3.47314 2 4.0701 2 4.80648V14.1398C2 14.8762 2.59695 15.4731 3.33333 15.4731H12.6667C13.403 15.4731 14 14.8762 14 14.1398V4.80648C14 4.0701 13.403 3.47314 12.6667 3.47314Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10.667 2.14014V4.8068" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.33301 2.14014V4.8068" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 7.47314H14" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

DateIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

DateIcon.defaultProps = {
  width: 16,
  height: 17,
  color: '#4D4D4D',
};
export default DateIcon;
