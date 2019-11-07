/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { observable, action } from 'mobx';
import { Transaction as Tx } from 'ethereumjs-tx';
/**
 * Describes store with user data
 */
class UserStore {
  @observable authorized = false;

  @observable logging = false;

  @observable redirectToProjects = false;

  @observable encryptedWallet = '';

  @observable privateKey = '';

  @observable _mnemonic = ['spray', 'trap', 'flush', 'awful', 'before', 'prosper', 'gold', 'typical', 'siege', 'mule', 'great', 'bone'];

  @observable _mnemonicRepeat = [];

  @observable address = '';

  @observable balance = 0;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setEncryptedWallet(wallet) {
    this.encryptedWallet = wallet;
    this.address = `0x${wallet.address}`;
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

  @action login(password) {
    this.logging = true;
    this.readWallet(password).then((buffer) => {
      if (!(buffer instanceof Error)) {
        this.privateKey = buffer;
        this.authorized = true;
      } else {
        this.logging = false;
      }
    });
  }

  @action readWallet(password) {
    const wallet = JSON.stringify(this.encryptedWallet);
    return new Promise((resolve, reject) => {
      this.rootStore.walletService.readWallet(wallet, password).then((data) => {
        if (data.privateKey) {
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
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line consistent-return
      this.readWallet(password).then((buffer) => {
        if (buffer instanceof Error) return false;
        const privateKey = Buffer.from(
          buffer,
          'hex',
        );
        const tx = new Tx(data, { chain: 'ropsten' });
        tx.sign(privateKey);
        const serialized = tx.serialize().toString('hex');
        resolve(serialized);
      });
    });
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
