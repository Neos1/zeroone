const defaults = {
  onOpen: null,
  onClose: null,
  history: true,
};

class DialogItem {
  constructor(name, options) {
    this._name = name;
    this.options = { ...defaults, ...options };
  }

  get name() {
    return this._name;
  }

  get id() {
    return `dialog-${this.name}`;
  }

  get history() {
    return this.options.history;
  }

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

  close() {
    const { options: { onClose } } = this;
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  }
}

export default DialogItem;
