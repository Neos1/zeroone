import { observable, action } from 'mobx';

/** Class for manage notifications */
class NotificationStore {
  /** Notification is open state */
  @observable isOpen = false;

  /** Notification content */
  @observable content = null;

  /**
   * Set new is open state
   *
   * @param {boolean} newState new is open state
   */
  @action
  setIsOpen(newState) {
    this.isOpen = Boolean(newState);
  }

  /**
   * Method for setting new content
   *
   * @param {string|Node} newContent content
   */
  @action
  setContent(newContent) {
    this.content = newContent;
  }
}

export default NotificationStore;
