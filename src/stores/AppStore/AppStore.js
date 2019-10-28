import { observable, action } from 'mobx';


class AppStore {
  @observable walletList = [];

  @observable projectList = [];

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
}

export default AppStore;
