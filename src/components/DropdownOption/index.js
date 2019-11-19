import React from 'react';
import propTypes from 'prop-types';

import styles from '../Dropdown/Dropdown.scss';

const DropdownOption = ({
  value, label, select, subOption,
}) => (
  <button
    type="button"
    className={styles.dropdown__option}
    data-value={value}
    onClick={() => { select(value); }}
  >
    {label}
    {subOption !== ''
      ? (
        <span className={styles.dropdown__suboption}>
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
  subOption: propTypes.string.isRequired,
};
DropdownOption.defaultProps = {
};


export default DropdownOption;
