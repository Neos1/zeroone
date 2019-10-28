import { observable, action, computed } from 'mobx';
import UserStore from '../UserStore';

export default class AppStore {
  @observable walletList = [];

  @observable projectList = [];

  @observable userStore = new UserStore()

  /**
   * Getting list of url's for sending this to wallet service
   * @function
   */
  @action readWalletList = () => {
    const wallet = '';
    this.walletList.push(wallet);
  }

  /**
   * Reading list of projects for displaing them in project list
   * @function
   */
  @action readProjectList = () => {
    const project = {};
    this.projectList.push(project);
  }

  @action setUserWallet = (encryptedWallet) => {
    this.userStore.setEncryptedWallet(encryptedWallet);
  }
}
