/** Service for working with wallets */
class WalletService {
  /**
   * Decrypts wallet
   * @param {string} url path to wallet
   * @param {string} password password for decrypting
   */
  readWalletFromFile(url, password) {

  }

  /**
   * Write encrypted wallet to file
   * @param {string} encryptedWallet
   */
  writeWalletToFile(encryptedWallet) {

  }

  /**
   * Creates new wallet
   * @param {string} password - combination of symbols which will be allow decode wallet
   */
  createWallet(password) {

  }

  /**
   * Recover wallet from 12-word recover phrase
   * @param {string} mnemonic - 12 word recover phrase
   */
  recoverWallet(mnemonic) {

  }

  /**
   * Checking wallet for creating txDaat
   * @param {string} wallet encryptedWallet
   * @param {string} password password
   * @return {bool} is password correct
   */
  checkPassword(wallet, password) {

  }
}
const walletService = new WalletService();
export default walletService;
