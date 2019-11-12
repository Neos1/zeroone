import React from 'react';
import propTypes from 'prop-types';

const ProgressBlock = ({
  children, text, index, state, noline,
}) => (
  <div className={`progress-block ${state === index ? 'active' : ''} ${state > index ? 'success' : ''}`}>
    <svg width="80" height="80" viewBox="0 0 80 80">
      <polyline className="line-cornered stroke-still" points="0,0 80,0 80,80" strokeWidth="10" fill="none" />
      <polyline className="line-cornered stroke-still" points="0,0 0,80 80,80" strokeWidth="10" fill="none" />
      <polyline className="line-cornered stroke-animation" points="0,40 0,0 80,0 80,40" strokeWidth="10" fill="none" />
      <polyline className="line-cornered stroke-animation" points="0,40 0,80 80,80 80,40" strokeWidth="10" fill="none" />
    </svg>
    <div className="progress-block__icon">
      {children}
    </div>
    <p>{text}</p>
    {!noline ? <div className="progress-line" /> : ''}
  </div>
);
ProgressBlock.propTypes = {
  children: propTypes.element.isRequired,
  text: propTypes.string.isRequired,
  index: propTypes.number.isRequired,
  state: propTypes.number.isRequired,
  noline: propTypes.bool,
};
ProgressBlock.defaultProps = {
  noline: false,
};
export default ProgressBlock;
