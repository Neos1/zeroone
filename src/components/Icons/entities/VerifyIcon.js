import React from 'react';
import PropTypes from 'prop-types';


const VerifyIcon = ({
  width,
  height,
  color,
  strokeWidth,
}) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.0003 29.3337C23.3641 29.3337 29.3337 23.3641 29.3337 16.0003C29.3337 8.63653 23.3641 2.66699 16.0003 2.66699C8.63653 2.66699 2.66699 8.63653 2.66699 16.0003C2.66699 23.3641 8.63653 29.3337 16.0003 29.3337Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 12L15.125 19L12 15.8182"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

VerifyIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  strokeWidth: PropTypes.number,
  color: PropTypes.string,
};

VerifyIcon.defaultProps = {
  width: 32,
  height: 32,
  strokeWidth: 2,
  color: '#000',
};
export default VerifyIcon;
