import React from 'react';
import PropTypes from 'prop-types';

const QuestionIcon = ({
  width,
  height,
  opacity,
  color,
}) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity={opacity}>
      <path
        d="M7.99992 14.6668C11.6818 14.6668 14.6666 11.6821 14.6666 8.00016C14.6666 4.31826 11.6818 1.3335 7.99992 1.3335C4.31802 1.3335 1.33325 4.31826 1.33325 8.00016C1.33325 11.6821 4.31802 14.6668 7.99992 14.6668Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.06006 5.99989C6.21679 5.55434 6.52616 5.17863 6.93336 4.93931C7.34056 4.7 7.81932 4.61252 8.28484 4.69237C8.75036 4.77222 9.1726 5.01424 9.47678 5.37558C9.78095 5.73691 9.94743 6.19424 9.94672 6.66656C9.94672 7.99989 7.94672 8.66656 7.94672 8.66656"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 11.3335H8.00667"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

QuestionIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  opacity: PropTypes.number,
  color: PropTypes.string,
};

QuestionIcon.defaultProps = {
  width: 16,
  height: 16,
  opacity: 0.7,
  color: '#000',
};

export default QuestionIcon;
