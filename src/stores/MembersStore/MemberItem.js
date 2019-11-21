import { observable } from 'mobx';
import EMPTY_DATA_STRING from '../../constants';

class MemberItem {
  /**
   * Class constructor
   *
   * @param {object} param0 data for constructor
   * @param {string} param0.wallet wallet
   * @param {number} param0.weight weight
   * @param {number} param0.balance balance
   * @param {string} param0.customTokenName custom token name
   */
  constructor({
    wallet,
    weight,
    balance,
    customTokenName,
  }) {
    if (
      !wallet
      || !weight
      || !customTokenName
      || !balance
    ) throw new Error('Incorrect data provided for MemberItem!');
    this.wallet = wallet;
    this.weight = weight;
    this.balance = balance;
    this.customTokenName = customTokenName;
  }

  /** Wallet address member */
  @observable wallet = EMPTY_DATA_STRING;

  /** Weight member in vote */
  // TODO fix calculating weight on correct
  @observable weight = 0;

  /** Balance member */
  @observable balance = 0;

  /** Custom token name */
  @observable customTokenName = EMPTY_DATA_STRING;
}

export default MemberItem;
