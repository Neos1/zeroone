import { observable, action, computed } from 'mobx';

export default class AppStore {
  @observable walletList = [];

  @observable projectList = [];
}
