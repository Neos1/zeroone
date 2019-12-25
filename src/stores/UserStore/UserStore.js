import { observable, action, computed } from 'mobx';
import { Transaction as Tx } from 'ethereumjs-tx';
import i18n from 'i18next';
/**
 * Describes store with user data
 */
class UserStore {
  @observable authorized = false;

  @observable redirectToProjects = false;

  @observable encryptedWallet = '';

  @observable walletName = '';

  @observable privateKey = '';

  @observable _mnemonic = Array(12);

  @observable _mnemonicRepeat = Array(12);

  @observable balance = 0;

  @observable password = '';

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  /**
   * saves password to store for decoding wallet and transaction signing
   *@param {string} value password from form
  */
  @action setPassword(value) {
    this.password = value;
  }

  /**
   * saves v3 keystore and wallet address to store
   * @param {object} wallet JSON Keystore V3
   */
  @action setEncryptedWallet(wallet) {
    this.encryptedWallet = wallet;
  }

  /**
   * checking Ethereum balance for given address
   * @param {string} address wallet adddress
   * @returns {Promise} resolves with balance rounded to 5 decimal places
   */
  @action checkBalance(address) {
    const { Web3Service: { web3 } } = this.rootStore;
    return new Promise((resolve, reject) => {
      web3.eth.getBalance(address).then((balance) => {
        resolve(Number(web3.utils.fromWei(balance)).toFixed(5));
      }).catch(() => { reject(); });
    });
  }

  /**
   * create wallet by given password
   * @param {string} password password which will be used for wallet decrypting
   * @return {Promise} resolves on success with {v3wallet, mnemonic, privateKey, walletName}
   */
  @action createWallet(password) {
    return new Promise((resolve, reject) => {
      this.rootStore.walletService.createWallet(password).then((data) => {
        if (data.v3wallet) {
          const {
            v3wallet, mnemonic, privateKey, walletName,
          } = data;
          this.setEncryptedWallet(v3wallet);
          this.setWalletName(walletName);
          this.setMnemonic(mnemonic);
          this.privateKey = privateKey;
          resolve(true);
        } else {
          reject(new Error('Error on creating wallet'));
        }
      });
    });
  }

  /**
   * recovering wallet by mnemonic
   * @param {string} password
   * @returns {Promise} resolves with {v3wallet, privateKey}
   */
  @action recoverWallet(password = undefined) {
    const seed = this._mnemonicRepeat.join(' ');
    return new Promise((resolve, reject) => {
      this.rootStore.walletService.createWallet(password, seed).then((data) => {
        if (data.v3wallet) {
          const {
            v3wallet, mnemonic, privateKey, walletName,
          } = data;
          this.setEncryptedWallet(v3wallet);
          this.setWalletName(walletName);
          this.setMnemonic(mnemonic);
          this.privateKey = privateKey;
          resolve(data);
        } else {
          reject(new Error('Error on creating wallet'));
        }
      });
    });
  }

  /**
   * method for authorize wallet for working with projects
   * @param {string} password password for wallet
   * @returns {Promise} resolve on success authorization
   */
  @action login(password) {
    const { appStore } = this.rootStore;
    return this.readWallet(password)
      .then((data) => {
        this.privateKey = data.privateKey;
        this.setEncryptedWallet(JSON.parse(data.wallet));
        this.authorized = true;
        this.setPassword(password);
        Promise.resolve();
      }).catch(() => {
        appStore.displayAlert(i18n.t('errors:wrongPassword'), 3000);
        Promise.reject();
      });
  }

  /**
   * read wallet for any operations with it
   * @param {string} password password for wallet
   * @returns {Promise} resolves with object {v3wallet, privateKey}
   */

  @action readWallet(password) {
    const wallet = JSON.stringify(this.encryptedWallet);
    return new Promise((resolve, reject) => {
      this.rootStore.walletService.readWallet(wallet, password).then((data) => {
        if (data.privateKey !== null) {
          resolve(data);
        } else {
          reject();
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
   * saves wallet to file by generated name
   */
  @action saveWalletToFile() {
    const { walletService, appStore } = this.rootStore;
    walletService.writeWalletToFile(this.encryptedWallet, this.walletName);
    appStore.readWalletList();
  }

  /**
   * checks is seed valid with walletService
   * @param {string} mnemonic mnemonic
   * @returns {bool} is valid
   */
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
      })
        .catch((err) => {
          reject(err);
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

  @action setMnemonic(value) {
    this._mnemonic = value.split(' ');
  }

  @action setMnemonicRepeat(value) {
    this._mnemonicRepeat = value;
  }

  @action setWalletName(name) {
    this.walletName = name;
  }

  @computed get address() {
    const { encryptedWallet } = this;
    return `0x${encryptedWallet.address}`;
  }

  @computed get mnemonic() {
    return this._mnemonic;
  }
}

export default UserStore;
