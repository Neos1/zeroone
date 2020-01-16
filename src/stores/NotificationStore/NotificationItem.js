import { observable, action } from 'mobx';

const defaultOpenState = false;
const defaultStatus = 'info';

/** Class for manage notifications */
class NotificationItem {
  constructor(props) {
    const {
      isOpen,
      content,
      id,
      status,
    } = props;
    if (!id && id !== 0) throw Error('Incorrect NotificationItem "id" provided');
    this.id = id;
    if (!content) throw Error('Incorrect NotificationItem "content" provided');
    this.content = content;
    this.status = status || defaultStatus;
    this.setIsOpen(isOpen || defaultOpenState);
  }

  /**
   * Id notification
   */
  @observable id;

  /** Notification is open state */
  @observable isOpen = defaultOpenState;

  /** Notification content */
  @observable content;

  /** Notification status. [info, important] */
  @observable status;

  // TODO add notification name for simple manage notification

  /**
   * Set new is open state
   *
   * @param {boolean} newState new is open state
   */
  @action
  setIsOpen(newState) {
    this.isOpen = Boolean(newState);
  }
}

export default NotificationItem;
