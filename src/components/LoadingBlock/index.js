import React from 'react';
import propTypes from 'prop-types';
import FormBlock from '../FormBlock';
import Loader from '../Loader';

const LoadingBlock = ({ children }) => (
  <FormBlock>
    {children}
    <Loader />
  </FormBlock>
);
LoadingBlock.propTypes = {
  children: propTypes.node.isRequired,
};

export default LoadingBlock;
