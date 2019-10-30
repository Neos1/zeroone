import { observable, action, computed } from 'mobx';
import { fs, path, PATH_TO_WALLETS } from '../../constants';


class AppStore {
  @observable walletList = {};

  @observable projectList = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.readWalletList();
  }

  /**
   * Getting list of url's for sending this to wallet service
   * @function
   */
  @action readWalletList = () => {
    this.walletList = {};
    const files = fs.readdirSync(PATH_TO_WALLETS);
    files.forEach((file) => {
      const wallet = JSON.parse(fs.readFileSync(path.join(PATH_TO_WALLETS, file), 'utf8'));
      const walletObject = {};
      walletObject[wallet.address] = wallet;
      this.walletList = Object.assign(this.walletList, walletObject);
    });
    // eslint-disable-next-line no-console
    console.log(files);
  }

  /**
   * selecting encrypted wallet and pushing this to userStore
   * @param {string} address address of wallet
   */
  @action selectWallet = (address) => {
    const { userStore } = this.rootStore;
    const key = address.replace('0x', '');
    userStore.setEncryptedWallet(this.walletList[key]);
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
   * @param {string} encryptedWallet encrypted keystore v3
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
