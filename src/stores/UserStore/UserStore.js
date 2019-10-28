import { observable, action, computed } from 'mobx';
/**
 * Describes store with user data
 */
class UserStore {
  @observable encryptedWallet = ''

  @observable address = '';

  @observable balance = 0;

  /**
   * Signing transactions with private key
   * @function
   * @param {string} password password which was used to encode Keystore V3
   */
  @action singTransaction = (password) => {

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
   */
  @action getEthBalance = () => {
    this.balance = 0;
    return false;
  }
}

export default UserStore;
