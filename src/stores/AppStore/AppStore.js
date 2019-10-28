import { observable, action, computed } from 'mobx';
import UserStore from '../UserStore';
import ProjectStore from '../ProjectStore';

export default class AppStore {
  @observable walletList = [];

  @observable projectList = [];

  @observable userStore = new UserStore()

  @observable projectStore;


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

  /**
   * Adding encrypted Wallet to userStore
   */
  @action setUserWallet = (encryptedWallet) => {
    this.userStore.setEncryptedWallet(encryptedWallet);
  }

  /**
   * initiating project
   * @param {string} address adress of project
   */
  @action initProject(address) {
    this.projectStore = new ProjectStore(address);
  }
}
