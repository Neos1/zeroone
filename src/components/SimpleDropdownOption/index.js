import React from 'react';
import propTypes from 'prop-types';

import styles from '../Dropdown/Dropdown.scss';

const DropdownOption = ({
  value, label, select,
}) => (
  <button
    type="button"
    className={styles.dropdown__option}
    onClick={() => { select({ value, label }); }}
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
