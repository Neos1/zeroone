import React, { Component } from 'react';
import styles from './Dropdown.scss';

class Dropdown extends Component {
  constructor() {
    super();
    this.state = {
      options: [],
    };
  }

  render() {
    const { options } = this.state;
    const getOptions = options.map((option) => (
      <p className="dropdown__option" data-value={option}>{option.label}</p>
    ));

    return (
      <div className={`${styles.dropdown}`}>
        <p className="dropdown__head">
          <span className="dropdown--selected">Выберите кошелек</span>
        </p>
        <div className="dropdown__options">
          {getOptions}
        </div>
      </div>
    );
  }
}

export default Dropdown;
