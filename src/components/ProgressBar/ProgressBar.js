import React from 'react';
import PropTypes from 'prop-types';

import styles from './ProgressBar.scss';

class ProgressBar extends React.PureComponent {
  static propTypes = {
    progress: PropTypes.number.isRequired,
    countIndicator: PropTypes.number,
  };

  static defaultProps = {
    countIndicator: 10,
  };

  /**
   * Method for getting dimension scale
   * for indicator
   *
   * @returns {number} dimension value
   */
  getDimensionIndicator = () => {
    const { props } = this;
    const { countIndicator } = props;
    return 100 / countIndicator;
  }

  /**
   * Method for detect filling indicator
   *
   * @param {number} index index indicator
   * @returns {boolean} indicator filled state
   */
  indicatorIsFilled = (index) => {
    const { props } = this;
    const { progress } = props;
    const dimension = this.getDimensionIndicator();
    return (dimension * (index + 1)) <= progress;
  }

  render() {
    const { props } = this;
    const { countIndicator } = props;
    const arrIndicator = new Array(countIndicator).fill('');
    return (
      <div>
        {
          arrIndicator.map((item, index) => (
            <div
              className={`
                ${styles['progress-bar__indicator']}
                ${this.indicatorIsFilled(index) ? styles['progress-bar__indicator--filled'] : ''}
              `}
              key={`progress-bar__indicator--${index + 1}`}
            />
          ))
        }
      </div>
    );
  }
}

export default ProgressBar;
