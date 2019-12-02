import React from 'react';
import PropTypes from 'prop-types';

const PlayCircleIcon = ({
  width,
  height,
  color,
  opacity,
}) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity={opacity}>
      <path
        d="M16.0003 29.3332C23.3641 29.3332 29.3337 23.3636 29.3337 15.9998C29.3337 8.63604 23.3641 2.6665 16.0003 2.6665C8.63653 2.6665 2.66699 8.63604 2.66699 15.9998C2.66699 23.3636 8.63653 29.3332 16.0003 29.3332Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.333 10.6665L21.333 15.9998L13.333 21.3332V10.6665Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

PlayCircleIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  opacity: PropTypes.number,
  color: PropTypes.string,
};

PlayCircleIcon.defaultProps = {
  width: 32,
  height: 32,
  opacity: 0.7,
  color: '#000',
};

export default PlayCircleIcon;
