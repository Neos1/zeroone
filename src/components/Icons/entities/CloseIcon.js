import React from 'react';
import PropTypes from 'prop-types';

const CloseIcon = ({
  width,
  height,
  fill,
}) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.247314" y="9.22632" width="12.9376" height="1.11751" transform="rotate(-45 0.247314 9.22632)" fill={fill} />
    <rect x="1.26392" y="0.078083" width="12.9376" height="1.11751" transform="rotate(45 1.26392 0.078083)" fill={fill} />
  </svg>
);

CloseIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
};

CloseIcon.defaultProps = {
  width: 11,
  height: 11,
  fill: '#E1E4E8',
};

export default CloseIcon;
