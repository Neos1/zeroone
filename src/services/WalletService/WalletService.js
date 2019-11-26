/* eslint-disable class-methods-use-this */
import WorkerWrapper from './entities/WorkerWrapper';
import WalletWorker from '../../workers/wallet.worker';
import { fs, path, PATH_TO_WALLETS } from '../../constants';

const bip39 = require('bip39');

const worker = new WorkerWrapper(new WalletWorker());

/** Service for working with wallets */
class WalletService {
  /**
   * Decrypts wallet
   * @param {string} url path to wallet
   * @param {string} password password for decrypting
   * @returns {Promise}
   */
  readWallet(input, password) {
    const data = {
      action: 'read',
      input,
      password,
    };
    return worker.send(data);
  }

  /**
   * Write encrypted wallet to file
   * @param {string} encryptedWallet
   * @param {string} name name of the wallet, generated by ethereumjs-wallet
   */
  writeWalletToFile(encryptedWallet, name) {
    fs.writeFileSync(path.join(PATH_TO_WALLETS, `${name}.json`), JSON.stringify(encryptedWallet, null, '\t'), 'utf8');
  }

  /**
   * Creates new wallet
   * @param {string} password - combination of symbols which will be allow decode wallet
   * @returns {Promise}
   */
  createWallet(password, seed = '') {
    const mnemonic = seed === '' ? bip39.generateMnemonic() : seed;
    const data = {
      action: 'create',
      password,
      mnemonic,
    };
    return worker.send(data);
  }

  /**
   * Recover wallet from 12-word recover phrase
   * @param {string} mnemonic - 12 word recover phrase
   * @returns {Promise}
   */
  recoverWallet(mnemonic) {
    if (bip39.validateMnemonic) {
      const data = {
        action: 'recover',
        mnemonic,
      };
      return Promise.resolve(worker.send(data));
    } return Promise.reject();
  }

  /**
   * validates mnemonic
   * @param {string} mnemonic mnemonic
   * @returns {boolean} is mnemonic valid
   */
  validateMnemonic(mnemonic) {
    return bip39.validateMnemonic(mnemonic);
  }
}
export default WalletService;
