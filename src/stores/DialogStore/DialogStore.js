import {
  observable,
  computed,
  action,
} from 'mobx';
import DialogItem from './DialogItemModel';

/**
 * Class for manage all dialogs in app
 */
class DialogStore {
    /** actual open state */
    @observable open = false;

    /** closing in progress state */
    @observable closing = false;

    /** current active name dialog */
    @observable dialog = null;

    /** history dialogs */
    history = [];

    /** list of all dialogs */
    list = {};

    @computed
    /**
     * Actual open state
     *
     * @returns {string, boolean} name dialog or boolean state
     */
    get isOpen() {
      if (this.open && this.dialog) return this.dialog;
      return false;
    }

    /**
     * Method for getting dialog by name in list
     *
     * @param {string} dialogName name dialog
     * @return {object} dialog item model
     */
    getDialog(dialogName) {
      const { list } = this;
      return list[dialogName];
    }

    /**
     * Method for checking the existence of a dialog
     *
     * @param {string} dialog dialog name
     * @returns {boolean} dialog exists or does not exist
     */
    doesExist(dialog) {
      return this.getDialog(dialog) !== undefined;
    }

    /**
     * Method for adding new dialog in list
     *
     * @param {string} name name new dialog
     * @param {object} options options for new dialog
     */
    add(name, options) {
      this.list[name] = new DialogItem(name, options);
    }

    /**
     * Method for removing dialog from list dialogs
     *
     * @param {string} name name dialog
     */
    remove(name) {
      delete this.list[name];
    }

    @action
    /**
     * Method for showing dialog by name
     *
     * @param {string} dialogName dialog name
     */
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
    /**
     * Method for hiding dialog
     */
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

    /**
     * Method for adding dialog in history dialogs
     *
     * @param {object} dialog dialog item model
     */
    addToHistory(dialog) {
      if (dialog.history === false) return false;
      return this.history.push(dialog.name);
    }

    /**
     * Method for toggle dialogs
     *
     * @param {string} dialogName dialog name for opening
     */
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
