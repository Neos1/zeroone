import React from 'react';
import PropTypes from 'prop-types';

const BinaryIcon = ({
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
    <rect
      x="0.5"
      y="0.5"
      width="15"
      height="15"
      stroke={color}
    />
    <path
      d="M5.646 11.162C4.932 11.162 4.374 10.901 3.972 10.379C3.576 9.851 3.378 9.023 3.378 7.895C3.378 7.331 3.432 6.842 3.54 6.428C3.648 6.014 3.801 5.672 3.999 5.402C4.203 5.132 4.446 4.934 4.728 4.808C5.01 4.676 5.328 4.61 5.682 4.61C6.036 4.61 6.351 4.676 6.627 4.808C6.909 4.934 7.146 5.132 7.338 5.402C7.536 5.672 7.686 6.014 7.788 6.428C7.89 6.842 7.941 7.331 7.941 7.895C7.941 8.459 7.89 8.948 7.788 9.362C7.686 9.77 7.536 10.109 7.338 10.379C7.14 10.643 6.897 10.841 6.609 10.973C6.327 11.099 6.006 11.162 5.646 11.162ZM5.664 10.46C5.934 10.46 6.159 10.403 6.339 10.289C6.525 10.169 6.672 10.001 6.78 9.785C6.894 9.563 6.975 9.293 7.023 8.975C7.077 8.657 7.104 8.297 7.104 7.895C7.104 7.493 7.077 7.133 7.023 6.815C6.975 6.497 6.894 6.227 6.78 6.005C6.672 5.783 6.525 5.615 6.339 5.501C6.159 5.381 5.934 5.321 5.664 5.321C5.394 5.321 5.166 5.381 4.98 5.501C4.794 5.615 4.644 5.783 4.53 6.005C4.422 6.227 4.341 6.497 4.287 6.815C4.239 7.133 4.215 7.493 4.215 7.895C4.215 8.297 4.239 8.657 4.287 8.975C4.341 9.293 4.422 9.563 4.53 9.785C4.644 10.001 4.794 10.169 4.98 10.289C5.166 10.403 5.394 10.46 5.664 10.46ZM10.9902 5.654L9.55917 6.518L9.21717 5.933L11.0712 4.781H11.8002V11H10.9902V5.654Z"
      fill={color}
    />
  </svg>
);

BinaryIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

BinaryIcon.defaultProps = {
  width: 16,
  height: 16,
  color: '#4D4D4D',
};

export default BinaryIcon;
