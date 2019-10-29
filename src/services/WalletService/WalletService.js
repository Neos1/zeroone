/** Service for working with wallets */
class WalletService {
  /**
   * Decrypts wallet
   * @param {string} url path to wallet
   * @param {string} password password for decrypting
   * @returns {object} Wallet instance
   */
  readWalletFromFile(url, password) {
    return (this, url, password);
  }

  /**
   * Write encrypted wallet to file
   * @param {string} encryptedWallet
   * @return {bool} write status: 1 - success, 2 - error
   */
  writeWalletToFile(encryptedWallet) {
    return (this, encryptedWallet);
  }

  /**
   * Creates new wallet
   * @param {string} password - combination of symbols which will be allow decode wallet
   * @returns {object} encryptedWallet,seed
   */
  createWallet(password) {
    return (this, password);
  }

  /**
   * Recover wallet from 12-word recover phrase
   * @param {string} mnemonic - 12 word recover phrase
   * @returns {object} wallet object
   */
  recoverWallet(mnemonic) {
    return (this, mnemonic);
  }

  /**
   * Checking wallet for creating txDaat
   * @param {string} wallet encryptedWallet
   * @param {string} password password
   * @return {bool} is password correct
   */
  checkPassword(wallet, password) {
    return (this, wallet, password);
  }
}
export default WalletService;
