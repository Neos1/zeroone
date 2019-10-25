/** Service for working with wallets */
class WalletService {
  /**
   * Decrypts wallet
   * @param {string} encryptedWallet JSON keystoreV3
   * @param {string} password password for decrypting
   */
  readWallet(encryptedWallet, password) {

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
   * Write encrypted wallet to file
   * @param {string} encryptedWallet
   */
  writeWalletToFile(encryptedWallet) {

  }
}
export default WalletService;
