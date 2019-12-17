import { computed, action, observable } from 'mobx';

class MemberItem {
  /**
   * Class constructor
   *
   * @param {object} param0 data for constructor
   * @param {string} param0.wallet wallet
   * @param {number} param0.weight weight
   * @param {number} param0.balance balance
   * @param {string} param0.customTokenName custom token name
   * @param {boolean} param0.isAdmin wallet is admin
   */
  constructor({
    wallet,
    weight,
    balance,
    customTokenName,
    isAdmin,
  }) {
    if (
      !wallet
      || !weight
      || !customTokenName
      || !balance
    ) throw new Error('Incorrect data provided for MemberItem!');
    this.wallet = wallet;
    this._weight = parseInt(weight, 10);
    this.balance = parseInt(balance, 10);
    this.customTokenName = customTokenName;
    if (typeof isAdmin === 'boolean') this.isAdmin = isAdmin;
  }

  /** Wallet address member */
  wallet = '';

  /** Weight member in vote */
  @observable _weight = 0;

  /** Balance member */
  @observable balance = 0;

  /** Custom token name */
  customTokenName = '';

  /** Wallet is admin */
  isAdmin = false;

  @computed
  /** Method for getting full balance text */
  get fullBalance() {
    return `${this.balance} ${this.customTokenName}`;
  }

  @computed
  get weight() {
    return this._weight.toFixed(2);
  }

  @action
  setWeight(weight) {
    this._weight = weight;
  }

  @action
  setTokenBalance(balance) {
    this.balance = balance;
  }
}

export default MemberItem;
