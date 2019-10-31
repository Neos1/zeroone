import { observable, action } from 'mobx';
/**
 * Describes store with user data
 */
class UserStore {
  @observable authorized = false;

  @observable logging = false;

  @observable redirectToProjects = false;

  @observable encryptedWallet = '';

  @observable privateKey = '';

  @observable _mnemonic = [];

  @observable _mnemonicRepeat = [];

  @observable address = '';

  @observable balance = 0;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setEncryptedWallet(wallet) {
    this.encryptedWallet = wallet;
  }

  /**
   * checking password by wallet service
   * @param password password for decoding
   * @return {bool} is password correct
   */
  @action checkPassword(password) {
    const wallet = JSON.stringify(this.encryptedWallet);
    this.rootStore.walletService.readWallet(wallet, password);
  }

  @action createWallet(password) {
    return new Promise((resolve, reject) => {
      this.rootStore.walletService.createWallet(password).then((data) => {
        if (data.v3wallet) {
          const { v3wallet, mnemonic, privateKey } = data;
          this.setEncryptedWallet(v3wallet);
          this._mnemonic = mnemonic.split(' ');
          this.privateKey = privateKey;
          // eslint-disable-next-line no-console
          resolve(true);
        } else {
          reject(new Error('Error on creating wallet'));
        }
      });
    });
  }

  @action readWallet(password) {
    this.logging = true;
    const wallet = JSON.stringify(this.encryptedWallet);
    return new Promise((resolve, reject) => {
      this.rootStore.walletService.readWallet(wallet, password).then((data) => {
        if (data.privateKey) {
          this.privateKey = data.privateKey;
          this.authorized = true;
          this.redirectToProjects = true;
          resolve(data.privateKey);
        } else {
          reject();
        }
      });
    });
  }

  @action recoverWallet() {
    const seed = this._mnemonic.join(' ');
    this.rootStore.walletService.recoverWallet(seed);
  }

  /**
   * Signing transactions with private key
   * @function
   * @param {string} data rawTx
   * @param {string} password password which was used to encode Keystore V3
   * @return Signed TX data
   */
  @action singTransaction(data, password) {
    return (this.balance, data, password);
  }

  /**
   * Sending transaction from user
   * @function
   * @param {string} txData Raw transaction
   */
  @action sendTransaction(txData) {
    return (this.balance, txData);
  }

  /**
   * Getting user Ethereum balance
   * @return {number} balance in ETH
   */
  @action getEthBalance() {
    this.balance = 0;
    return false;
  }

  set mnemonic(mnemonic) {
    this._mnemonic = mnemonic.split('');
  }
}

export default UserStore;
