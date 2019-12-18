import React from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import NotificationStore from '../../stores/NotificationStore';

import styles from './Notification.scss';

/**
 * Class for render notification
 */
@inject('notificationStore')
class Notification extends React.Component {
  static propTypes = {
    notificationStore: PropTypes.instanceOf(NotificationStore).isRequired,
  };

  render() {
    const { props } = this;
    const {
      notificationStore: {
        isOpen,
        content,
      },
    } = props;
    return (
      <>
        {
          isOpen
            ? (
              <div className={styles.notification}>
                {content}
              </div>
            )
            : null
        }
      </>
    );
  }
}

export default Notification;
