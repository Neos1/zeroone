import React from 'react';
import propTypes from 'prop-types';

const FormBlock = ({ children, className }) => (
  <div className={`form__block ${className}`}>
    {children}
  </div>
);
FormBlock.propTypes = {
  children: propTypes.node.isRequired,
  className: propTypes.string,
};
FormBlock.defaultProps = {
  className: '',
};

export default FormBlock;
