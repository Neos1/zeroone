import React from 'react';
import PropTypes from 'prop-types';

const QuestionIcon = ({
  width,
  height,
  color,
  opacity,
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
        d="M7.99967 14.6668C11.6816 14.6668 14.6663 11.6821 14.6663 8.00016C14.6663 4.31826 11.6816 1.3335 7.99967 1.3335C4.31778 1.3335 1.33301 4.31826 1.33301 8.00016C1.33301 11.6821 4.31778 14.6668 7.99967 14.6668Z"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.05957 5.99989C6.21631 5.55434 6.52567 5.17863 6.93287 4.93931C7.34007 4.7 7.81883 4.61252 8.28435 4.69237C8.74987 4.77222 9.17211 5.01424 9.47629 5.37558C9.78046 5.73691 9.94694 6.19424 9.94624 6.66656C9.94624 7.99989 7.94624 8.66656 7.94624 8.66656"
        stroke="black"
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
  color: PropTypes.string,
  opacity: PropTypes.number,
};

QuestionIcon.defaultProps = {
  width: 16,
  height: 16,
  color: '#000',
  opacity: 0.7,
};

export default QuestionIcon;
