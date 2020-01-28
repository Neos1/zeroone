import React from 'react';
import propTypes from 'prop-types';

import styles from '../Dropdown/Dropdown.scss';

const DropdownOption = ({
  value, label, select, subOption,
}) => (
  <button
    type="button"
    className={styles.dropdown__option}
    onClick={() => { select(value); }}
  >
    <span className={styles['dropdown__option-label']}>
      {label}
    </span>
    {subOption !== ''
      ? (
        <span className={styles.dropdown__suboption}>
          {Number(subOption).toFixed(5)}
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
