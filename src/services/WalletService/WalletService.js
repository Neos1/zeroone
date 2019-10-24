/** Service for working with wallets */
class WalletService {
  /**
   * Constructor
   * @constructor
   * @param {string} encryptedWallet - JSON String with Keystore V3
   */
  constructor() {
    this.encryptedWallet = '';
  }


  /**
   * Encrypts wallet
   * @param {string} encryptedWallet
   */
  readWallet(encryptedWallet) {

  }

  /**
   * Creates new wallet
   * @param {string} password - combination of symbols which will be allow decode wallet
   */
  createWallet(password) {

  }

  /**
   * Recover wallet from 12-word recover phrase
   * @param {string} seedPhrase  - 12 word recover phrase
   */
  recoverWallet(seedPhrase) {

  }
}
export default WalletService;
