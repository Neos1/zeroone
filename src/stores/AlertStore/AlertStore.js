import { observable, action } from 'mobx';

class AlertStore {
  @observable text = '';

  @observable visible = false;

  @action showAlert = (text, interval = 3000) => {
    this.text = text;
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, interval);
  }

  @action closeAlert = () => {
    this.visible = false;
  }
}

export default AlertStore;
