import {
  observable,
  computed,
  action,
} from 'mobx';
import DialogItem from './DialogItemModel';

class DialogStore {
    @observable open = false;

    @observable closing = false;

    @observable dialog = null;

    history = [];

    list = {};

    @computed
    get isOpen() {
      if (this.open && this.dialog) return this.dialog;
      return false;
    }

    getDialog(dialogName) {
      const { list } = this;
      return list[dialogName];
    }

    doesExist(dialog) {
      return this.getDialog(dialog) !== undefined;
    }

    add(name, options) {
      this.list[name] = new DialogItem(name, options);
    }

    remove(name) {
      delete this.list[name];
    }

    @action
    show(dialogName) {
      const { open, dialog: currentDialogName } = this;
      const dialog = this.getDialog(dialogName);
      // not found
      if (!dialog) return this.hide();
      // this dialog is opened next already
      if (dialog.name === currentDialogName) return Promise.resolve();
      // save provided dialog as next to open
      if (open) {
        this.next = dialogName;
        return this.hide(true);
      }
      document.body.classList.add('dialog-overlay');
      this.open = true;
      this.dialog = dialog.name;
      dialog.open();
      this.addToHistory(dialog);
      // this.emit(`${dialog.name}:open`);
      return Promise.resolve();
    }

    @action
    hide() {
      const { dialog: dialogName } = this;
      const dialog = this.getDialog(dialogName);
      // closing right now
      if (this.closing || !dialog) {
        return Promise.resolve();
      }
      return new Promise((resolve) => {
        this.closing = true;
        setTimeout(() => {
          const { next } = this;
          this.open = false;
          this.closing = false;
          this.dialog = false;
          if (dialog) dialog.close();
          if (!next || typeof next !== 'boolean') {
            document.body.classList.remove('dialog-overlay');
          }
          if (next) {
            this.next = false;
            this.show(next)
              .then(resolve);
          }
          // this.emit(`${dialog.name}:hidden`);
          return resolve();
        }, 400);
      });
    }

    addToHistory(dialog) {
      if (dialog.history === false) return false;
      return this.history.push(dialog.name);
    }

    toggle(dialogName) {
      const { open } = this;
      if (!open || this.dialog !== dialogName) {
        this.hide().then(() => { this.show(dialogName); });
      } else {
        this.hide();
      }
    }
}

export default DialogStore;
