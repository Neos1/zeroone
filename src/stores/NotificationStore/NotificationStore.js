import { observable, action } from 'mobx';
import uniqKey from 'react-id-generator';
import NotificationItem from './NotificationItem';

/** Class for manage notifications */
class NotificationStore {
  /** Notification list */
  @observable list = [];

  /**
   * Method for adding new notification
   *
   * @param {object} newNotification new notification data
   * @param {boolean} newNotification.isOpen open state notification
   * @param {string|Node} newNotification.content content notification
   */
  @action
  add(newNotification) {
    this.list.push(
      new NotificationItem({
        ...newNotification,
        id: uniqKey(),
      }),
    );
  }

  getNotification(id) {
    return [this.list.filter((notification) => (
      notification.id === id
    ))];
  }

  // TODO add manage notification by name after refactor NotificationItem

  /**
   * Method fore removing notification from list
   *
   * @param {string} id id notification
   */
  @action
  remove(id) {
    const filtered = this.list.filter((value) => (
      value.id !== id
    ));
    this.list = filtered;
  }

  @action
  reset = () => {
    this.list = [];
  }
}

export default NotificationStore;
