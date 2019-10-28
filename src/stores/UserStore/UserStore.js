import { observable, action, computed } from 'mobx';
import walletService from '../../services/WalletService';
/**
 * Describes store with user data
 */
class UserStore {
  @observable encryptedWallet = ''

  @observable address = '';

  @observable balance = 0;


  @action setEncryptedWallet = (wallet) => {
    this.encryptedWallet = wallet;
  }

  /**
   * checking password by wallet service
   * @param password password for decoding
   * @return {bool} is password correct
   */
  @action checkPassword = (password) => {
    walletService.checkPassword(this.encryptedWallet, password);
  }

  /**
   * Signing transactions with private key
   * @function
   * @param {string} data rawTx
   * @param {string} password password which was used to encode Keystore V3
   * @return Signed TX data
   */
  @action singTransaction = (data, password) => {

  }

  /**
   * Sending transaction from user
   * @function
   * @param {string} txData Raw transaction
   */
  @action sendTransaction = (txData) => {

  };

  /**
   * Getting user Ethereum balance
   * @return {number} balance in ETH
   */
  @action getEthBalance = () => {
    this.balance = 0;
    return false;
  }
}

export default UserStore;
