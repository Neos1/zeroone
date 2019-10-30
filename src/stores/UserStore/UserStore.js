import { observable, action } from 'mobx';
/**
 * Describes store with user data
 */
class UserStore {
  @observable authorized = false;

  @observable encryptedWallet = '';

  @observable privateKey = '';

  @observable _mnemonic = ['spray', 'trap', 'flush', 'awful', 'before', 'prosper', 'gold', 'typical', 'siege', 'mule', 'great', 'bone'];

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
    this.rootStore.walletService.checkPassword(this.encryptedWallet, password);
  }

  @action createWallet(password) {
    this.rootStore.walletService.createWallet(password).then((data) => {
      const { v3wallet, mnemonic, privateKey } = data;
      this.setEncryptedWallet(v3wallet);
      this._mnemonic = mnemonic;
      this.privateKey = privateKey;
    });
  }

  @action readWallet(password) {
    this.rootStore.walletService.readWallet(this.encryptedWallet, password).then((data) => {
      this.privateKey = data.privateKey;
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
