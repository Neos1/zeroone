import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import NotificationStore from '../../stores/NotificationStore';
import NotificationItem from './NotificationItem';

import styles from './Notification.scss';

/**
 * Class for render notification
 */
@inject('notificationStore')
@observer
class Notification extends React.Component {
  static propTypes = {
    notificationStore: PropTypes.instanceOf(NotificationStore).isRequired,
  };

  /**
   * Method for remove notification
   *
   * @param {string} id id notification
   */
  removeNotification = (id) => {
    const { props } = this;
    const {
      notificationStore,
    } = props;
    notificationStore.remove(id);
  }

  render() {
    const { props } = this;
    const {
      notificationStore: {
        list,
      },
    } = props;
    return (
      <div className={styles.notification__container}>
        {
          list && list.length
            ? (
              list.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  isOpen={notification.isOpen}
                  content={notification.content}
                  status={notification.status}
                  handleRemove={() => this.removeNotification(notification.id)}
                />
              ))
            )
            : null
        }
      </div>
    );
  }
}

export default Notification;
