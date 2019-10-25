import { observable, action, computed } from 'mobx';
/**
 * Describes store with user data
 */
class UserStore {
  @observable userInfo = {
    address: '',
    balance: 0,
  };

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
}

const userStore = new UserStore();

export default userStore;
