import React from 'react';
import PropTypes from 'prop-types';

const BorderArrowIcon = ({
  width,
  height,
  color,
}) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="12.0205"
      y="0.707107"
      width="16"
      height="16"
      transform="rotate(45 12.0205 0.707107)"
      fill="white"
      stroke={color}
    />
    <path
      d="M16.3536 12.536C16.5488 12.1583 16.5488 11.8417 16.3536 11.6464L13.1716 8.46447C12.9763 8.2692 12.6597 8.2692 12.4645 8.46447C12.2692 8.65973 12.2692 8.97631 12.4645 9.17157L15.2929 12L12.4645 14.8284C12.2692 15.0237 12.2692 15.3403 12.4645 15.5355C12.6597 15.7308 12.9763 15.7308 13.1716 15.5355L16.3536 12.3536ZM8 12.5L16 12.5L16 11.5L8 11.5L8 12.5Z"
      fill={color}
    />
  </svg>
);

BorderArrowIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

BorderArrowIcon.defaultProps = {
  width: 25,
  height: 25,
  color: '#000',
};

export default BorderArrowIcon;
