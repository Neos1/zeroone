import { observable, action } from 'mobx';
import MemberItem from './MemberItem';

class MembersGroup {
  /**
   * Class constructor
   *
   * @param {object} param0 data for constructor
   * @param {string} param0.name name group (Example: Admins)
   * @param {string} param0.description description for group
   * @param {string} param0.wallet wallet for group
   * @param {number} param0.balance balance for group
   * @param {string} param0.customTokenName custom token name
   * @param {string} param0.tokenName token name
   * @param {Array} param0.list members list
   */
  constructor({
    name,
    description,
    wallet,
    balance,
    customTokenName,
    tokenName,
    list,
  }) {
    if (
      !name
      || !description
      || !customTokenName
      || !tokenName
      || Array.isArray(list) === false
    ) throw new Error('Incorrect data provided!');
    this.name = name;
    this.description = description;
    this.wallet = wallet;
    this.balance = balance;
    this.customTokenName = customTokenName;
    this.tokenName = tokenName;
    list.forEach((member) => {
      this.addToList(member);
    });
  }

  /** Name group (Example: Admins) */
  @observable name = '';

  /** Description for group */
  @observable description = '';

  /** Wallet for group */
  @observable wallet = null;

  /** Custom token name */
  @observable customTokenName = '';

  /** Basic token name */
  @observable tokenName = '';

  /** Balance group */
  // TODO fix on correct realization
  @observable balance = 0;

  /** Members list */
  @observable list = [];

  @action
  /**
   * Method for adding new member to group
   *
   * @param {object} member all data about member
   */
  addToList = (member) => {
    // TODO maybe fix for duplicate wallets
    this.list.push(new MemberItem(member));
  }
}

export default MembersGroup;
