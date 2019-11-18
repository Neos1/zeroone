import React from 'react';
import propTypes from 'prop-types';

const DropdownOption = ({
  value, label, select, subOption,
}) => (
  <button
    type="button"
    className="dropdown__option"
    data-value={value}
    onClick={() => { select(value); }}
  >
    {label}
    {subOption !== ''
      ? (
        <span className="dropdown__suboption">
          {(Number(subOption) / 1.0e18).toFixed(5)}
          {' ETH'}
        </span>
      )
      : ''}

  </button>
);

DropdownOption.propTypes = {
  value: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  select: propTypes.func.isRequired,
  subOption: propTypes.string,
};
DropdownOption.defaultProps = {
  subOption: '',
};


export default DropdownOption;
