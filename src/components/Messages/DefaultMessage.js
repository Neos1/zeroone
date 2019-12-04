import React from 'react';
import PropTypes from 'prop-types';

import styles from './Message.scss';

class DefaultMessage extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const { props } = this;
    const { title, children } = props;
    return (
      <div
        className={styles.message__container}
      >
        {
          title
            ? (
              <h2 className={styles.message__title}>{title}</h2>
            )
            : null
        }
        {children}
      </div>
    );
  }
}

export default DefaultMessage;
