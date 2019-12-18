import React from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import NotificationStore from '../../stores/NotificationStore';
import NotificationItem from '../../stores/NotificationStore/NotificationItem';

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
        list,
      },
    } = props;
    return (
      <>
        {
          list && list.length
            ? (
              list.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  isOpen={notification.isOpen}
                  content={notification.content}
                />
              ))
            )
            : null
        }
      </>
    );
  }
}

export default Notification;
