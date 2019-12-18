import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '../Icons';

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
    status: PropTypes.oneOf([
      'info',
      'important',
    ]).isRequired,
    handleRemove: PropTypes.func.isRequired,
  };

  render() {
    const { props } = this;
    const {
      isOpen,
      content,
      status,
      handleRemove,
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
                <button
                  className={styles['notification__item-close']}
                  onClick={handleRemove}
                  type="button"
                >
                  <CloseIcon
                    width={16}
                    height={16}
                    fill="currentColor"
                  />
                </button>
              </div>
            )
            : null
        }
      </>
    );
  }
}

export default NotificationItem;
