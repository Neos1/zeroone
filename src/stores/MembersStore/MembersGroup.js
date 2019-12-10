import { observable, action, computed } from 'mobx';
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
   * @param {string} param0.textForEmptyState text for state when list is empty
   * @param {Array} param0.list members list
   */
  constructor({
    name,
    groupAddress,
    contract,
    totalSupply,
    tokenSymbol,
    members,
    textForEmptyState,
  }) {
    if (
      !name
      || !contract
      || !tokenSymbol
      || !groupAddress
      || Array.isArray(members) === false
    ) throw new Error('Incorrect data provided!');
    this.name = name;
    this.wallet = groupAddress;
    this.balance = totalSupply;
    this.contract = contract;
    this.customTokenName = tokenSymbol;
    if (textForEmptyState && textForEmptyState.length) {
      this.textForEmptyState = textForEmptyState;
    }
    this.addToList(members);
  }

  /** Name group (Example: Admins) */
  name = '';

  /** Description for group */
  description = '';

  /** Wallet for group */
  wallet = null;

  /** Custom token name */
  customTokenName = '';

  /** Basic token name */
  tokenName = '';

  /** Balance group */
  // TODO fix on correct realization
  balance = 0;

  /** Text for state when list is empty */
  textForEmptyState = 'other:noData';

  @computed
  get fullBalance() {
    return `${this.balance} ${this.customTokenName}`;
  }

  /** Members list */
  @observable list = [];

  @action
  /**
   * Method for adding new member to group
   *
   * @param {object} member all data about member
   */
  addToList = (members) => {
    // TODO maybe fix for duplicate wallets
    members.forEach((member) => {
      this.list.push(new MemberItem(member));
    });
  }
}

export default MembersGroup;
