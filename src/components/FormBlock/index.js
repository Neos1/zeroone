import React from 'react';
import propTypes from 'prop-types';

const FormBlock = ({ children }) => (
  <div className="form__block">
    {children}
  </div>
);
FormBlock.propTypes = {
  children: propTypes.node.isRequired,
};

export default FormBlock;
