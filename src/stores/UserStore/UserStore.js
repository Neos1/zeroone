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

  @observable _mnemonic = Array(12);

  @observable _mnemonicRepeat = Array(12);

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

  @action checkBalance(address) {
    const { Web3Service: { web3 } } = this.rootStore;
    return new Promise((resolve, reject) => {
      web3.eth.getBalance(address).then((balance) => {
        resolve((balance / 1.0e18).toFixed(5));
      }).catch(() => { reject(); });
    });
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

  @action recoverWallet(password) {
    const seed = this._mnemonic.join(' ');
    return new Promise((resolve, reject) => {
      this.rootStore.walletService.createWallet(password, seed).then((data) => {
        if (data.v3wallet) {
          const { v3wallet, mnemonic, privateKey } = data;
          this.setEncryptedWallet(v3wallet);
          this._mnemonic = mnemonic.split(' ');
          this.privateKey = privateKey;
          // eslint-disable-next-line no-console
          resolve(data);
        } else {
          reject(new Error('Error on creating wallet'));
        }
      });
    });
  }

  @action login(password) {
    const { appStore } = this.rootStore;
    this.logging = true;
    this.readWallet(password).then((data) => {
      if (!(data.privateKey instanceof Error)) {
        this.privateKey = data.privateKey;
        this.setEncryptedWallet(JSON.parse(data.wallet));
        this.authorized = true;
      }
    }).catch(() => {
      this.logging = false;
      appStore.displayAlert('Неверный пароль', 3000);
    });
  }

  @action readWallet(password) {
    const wallet = JSON.stringify(this.encryptedWallet);
    return new Promise((resolve, reject) => {
      this.rootStore.walletService.readWallet(wallet, password).then((data) => {
        if (data.privateKey !== null) {
          resolve(data);
        } else {
          reject();
        }
      }).catch(() => {
        reject();
      });
    });
  }

  @action saveWalletToFile() {
    const { walletService, appStore } = this.rootStore;
    walletService.writeWalletToFile(this.encryptedWallet);
    appStore.readWalletList();
  }

  @action isSeedValid(mnemonic) {
    const { walletService } = this.rootStore;
    return walletService.validateMnemonic(mnemonic);
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
      this.readWallet(password).then((info) => {
        if (info instanceof Error) return false;
        const privateKey = Buffer.from(
          info.privateKey,
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
  @action async getEthBalance() {
    const { Web3Service: { web3 } } = this.rootStore;
    this.balance = await web3.eth.getBalance(this.address);
  }

  set mnemonic(mnemonic) {
    this._mnemonic = mnemonic.split('');
  }
}

export default UserStore;
