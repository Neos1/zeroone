import React from 'react';
import propTypes from 'prop-types';

const DropdownOption = ({ value, label, select }) => (
  <button
    type="button"
    className="dropdown__option"
    data-value={value}
    onClick={() => { select(value); }}
  >
    {label}
  </button>
);

DropdownOption.propTypes = {
  value: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  select: propTypes.func.isRequired,
};


export default DropdownOption;
