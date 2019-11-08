/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import WorkerWrapper from './entities/WorkerWrapper';
import WalletWorker from '../../workers/wallet.worker';
import { fs, path, PATH_TO_WALLETS } from '../../constants';


const bip39 = require('bip39');
/** Service for working with wallets */

const worker = new WorkerWrapper(new WalletWorker());
class WalletService {
  /**
   * Decrypts wallet
   * @param {string} url path to wallet
   * @param {string} password password for decrypting
   * @returns {object} Wallet instance
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
   * @return {bool} write status: 1 - success, 2 - error
   */
  writeWalletToFile(encryptedWallet) {
    let date = new Date();
    date = `${date.getUTCFullYear()}-${date.getUTCDate()}-${date.getUTCDay()}T${date.getUTCHours()}-${date.getUTCMinutes()}-${date.getUTCSeconds()}.${date.getMilliseconds() * 1000000}Z`;
    const walletName = encryptedWallet.address;
    const name = `UTC--${date}--${walletName}`;
    fs.writeFileSync(path.join(PATH_TO_WALLETS, `${name}.json`), JSON.stringify(encryptedWallet, null, '\t'), 'utf8');
  }

  /**
   * Creates new wallet
   * @param {string} password - combination of symbols which will be allow decode wallet
   * @returns {object} encryptedWallet,seed
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
   * @returns {object} wallet object
   */
  recoverWallet(mnemonic) {
    return new Promise((resolve, reject) => {
      if (bip39.validateMnemonic) {
        const data = {
          action: 'recover',
          mnemonic,
        };
        resolve(worker.send(data));
      } else reject();
    });
  }

  /**
   * Checking wallet for creating txDaat
   * @param {string} wallet encryptedWallet
   * @param {string} password password
   * @return {bool} is password correct
   */
  validateMnemonic(mnemonic) {
    return bip39.validateMnemonic(mnemonic);
  }
}
export default WalletService;
