import React, { Component } from 'react';
import propTypes from 'prop-types';

import styles from './Button.scss';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      children,
      theme,
      size,
      type,
      disabled,
      icon,
      iconTop,
      onClick,
    } = this.props;
    return (
      // eslint-disable-next-line react/button-has-type
      <button
        type={type}
        disabled={disabled}
        className={`${styles.btn} 
                    ${styles[`btn--${theme}`]} 
                    ${size ? styles[`btn--${size}`] : ''}`}
        onClick={onClick}
      >
        <p className={styles.btn__content}>
          <span className={`${styles.btn__icon} ${iconTop ? styles['btn__icon--block'] : ''}`}>
            {icon}
          </span>
          <span className={styles.btn__text}>
            {children}
          </span>
        </p>
      </button>
    );
  }
}

Button.propTypes = {
  children: propTypes.string.isRequired,
  icon: propTypes.node,
  iconTop: propTypes.bool,
  type: propTypes.string,
  disabled: propTypes.bool.isRequired,
  onClick: propTypes.func.isRequired,
  theme: propTypes.string,
  size: propTypes.string,
};

Button.defaultProps = {
  type: 'button',
  theme: 'black',
  size: 'default',
  icon: null,
  iconTop: false,
};

export default Button;
