import React from 'react';
import propTypes from 'prop-types';
import styles from '../../Login/Login.scss';

const ProgressBlock = ({
  children, text, index, state, noline,
}) => (
  <div className={`${styles['progress-block']} 
    ${state === index ? 'active' : ''} 
    ${state > index ? 'success' : ''}`}
  >
    <svg width="80" height="80" viewBox="0 0 80 80">
      <polyline className={`${styles['line-cornered']} ${styles['stroke-still']}`} points="0,0 80,0 80,80" strokeWidth="10" fill="none" />
      <polyline className={`${styles['line-cornered']} ${styles['stroke-still']}`} points="0,0 0,80 80,80" strokeWidth="10" fill="none" />
      <polyline className={`${styles['line-cornered']} ${styles['stroke-animation']}`} points="0,40 0,0 80,0 80,40" strokeWidth="10" fill="none" />
      <polyline className={`${styles['line-cornered']} ${styles['stroke-animation']}`} points="0,40 0,80 80,80 80,40" strokeWidth="10" fill="none" />
    </svg>
    <div className={styles['progress-block__icon']}>
      {children[0] ? children[0] : children}
    </div>
    <p>
      <span>{text}</span>
      <span>{children[1] ? children[1] : ''}</span>
    </p>

    {!noline ? <div className={styles['progress-line']} /> : ''}
  </div>
);
ProgressBlock.propTypes = {
  children: propTypes.arrayOf(propTypes.node).isRequired,
  text: propTypes.string.isRequired,
  index: propTypes.number.isRequired,
  state: propTypes.number.isRequired,
  noline: propTypes.bool,
};
ProgressBlock.defaultProps = {
  noline: false,
};
export default ProgressBlock;
