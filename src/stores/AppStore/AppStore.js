import { observable, action, computed } from 'mobx';
import { fs, PATH_TO_WALLETS } from '../../constants';


class AppStore {
  @observable walletList = {};

  @observable projectList = [];

  /**
   * Getting list of url's for sending this to wallet service
   * @function
   */
  @action readWalletList = () => {
    this.walletList = [];
    const files = fs.readdirSync(PATH_TO_WALLETS);
    return files;
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

  @computed get wallets() {
    const wallets = Object.keys(this.walletList);
    return wallets.map((wallet) => ({ label: `0x${wallet}`, value: `0x${wallet}` }));
  }
}

export default AppStore;
