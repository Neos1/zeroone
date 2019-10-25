import { observable, action, computed } from 'mobx';

class UserStore {
  @observable userInfo = {
    address: '',
    balance: 0,
  };

  /**
   * Signing transactions with private key
   * @param {string} password password which was used to encode Keystore V3
   */
  @action singTransaction = (password) => {

  }

  /**
   * @param {string} txData Raw transaction
   */
  @action sendTransaction = (txData) => {

  };
}

const userStore = new UserStore();

export default userStore;
