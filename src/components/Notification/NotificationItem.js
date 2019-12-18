import React from 'react';
import PropTypes from 'prop-types';

import styles from './Notification.scss';

/**
 * Class for render notification item
 */
class NotificationItem extends React.PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]).isRequired,
    status: PropTypes.string.isRequired,
  };

  render() {
    const { props } = this;
    const {
      isOpen,
      content,
      status,
    } = props;
    return (
      <>
        {
          isOpen
            ? (
              <div
                className={`
                  ${styles.notification__item}
                  ${styles[`notification__item--${status}`]}
                `}
              >
                {content}
              </div>
            )
            : null
        }
      </>
    );
  }
}

export default NotificationItem;
