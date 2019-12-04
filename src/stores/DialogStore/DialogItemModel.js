const defaults = {
  onOpen: null,
  onClose: null,
  history: true,
};

/**
 * Single modal dialog model
 */
class DialogItem {
  constructor(name, options) {
    this._name = name;
    this.options = { ...defaults, ...options };
  }

  /**
   * Method for getting name dialog
   *
   * @returns {string} name
   */
  get name() {
    return this._name;
  }

  /**
   * Method for getting id dialog
   *
   * @returns {string} id
   */
  get id() {
    return `dialog-${this.name}`;
  }

  /**
   * Method for getting history dialogs
   *
   * @returns {Array} history
   */
  get history() {
    return this.options.history;
  }

  /**
   * Method for call onOpen method with
   * all necessary actions
   */
  open() {
    const { options: { onOpen } } = this;
    const input = document.querySelector(`#${this.id} [open-focus]`);
    if (input) {
      const inputEvent = new Event('input', { bubbles: true });
      if (!input.value) {
        input.focus();
        input.dispatchEvent(inputEvent);
      }
    } else {
      const button = document.querySelector(`#${this.id} button`);
      if (button) button.focus();
    }
    if (onOpen && typeof onOpen === 'function') {
      onOpen();
    }
  }

  /**
   * Method for call onClose method with
   * all necessary actions
   */
  close() {
    const { options: { onClose } } = this;
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  }
}

export default DialogItem;
