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
    groupType,
    tokenSymbol,
    members,
    textForEmptyState,
    userAddress,
    groupId,
  }) {
    if (
      !name
      || !contract
      || !groupType
      || !tokenSymbol
      || !groupAddress
      || Array.isArray(members) === false
    ) throw new Error('Incorrect data provided!');
    this.name = name;
    this.wallet = groupAddress;
    this.groupType = groupType;
    this.balance = totalSupply;
    this.contract = contract;
    this.customTokenName = tokenSymbol;
    this.userAddress = userAddress;
    this.groupId = groupId;
    if (textForEmptyState && textForEmptyState.length) {
      this.textForEmptyState = textForEmptyState;
    }
    this.addToList(members);
    this.getUserBalanceInGroup();
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
  balance;

  /** User balance in group */
  @observable userBalance;

  /** Text for state when list is empty */
  textForEmptyState = 'other:noData';

  @computed
  get fullBalance() {
    return `${this.balance} ${this.customTokenName}`;
  }

  @computed
  get fullUserBalance() {
    return `${this.userBalance} ${this.customTokenName}`;
  }

  /**
   * Method for getting balance in group
   */
  getUserBalanceInGroup = async () => {
    const balance = await this.contract.methods.balanceOf(this.userAddress).call();
    this.userBalance = balance;
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
    members.forEach((member) => {
      if (!this.list.find((item) => item.wallet === member.wallet)) {
        this.list.push(
          new MemberItem({
            ...member,
            weight: member.weight.toString(),
          }),
        );
      }
    });
  }

  /**
   * Method for updating a member’s balance
   *
   * @param {number} address address wallet member
   */
  @action
  updateMemberBalanceAndWeight = async (address) => {
    const userBalance = await this.contract.methods.balanceOf(address).call();
    this.getUserBalanceInGroup();
    const user = this.list.find((member) => member.wallet === address);
    if (!user || !user.setTokenBalance || !user.setWeight) {
      const admin = this.groupType === 'Custom'
        ? await this.contract.methods.getAdmin().call()
        : null;
      this.list.push(new MemberItem({
        wallet: address,
        balance: userBalance,
        weight: (userBalance / Number(this.balance)) * 100,
        customTokenName: this.customTokenName,
        isAdmin: admin !== null
          ? address === admin
          : false,
      }));
    } else {
      const weight = (userBalance / Number(this.balance)) * 100;
      user.setTokenBalance(userBalance);
      user.setWeight(weight);
    }
  }

  @action
  setNewAdmin = async () => {
    const admin = this.list.find((member) => member.isAdmin === true);
    const newAdmin = this.groupType === 'Custom'
      ? await this.contract.methods.getAdmin().call()
      : null;
    const user = this.list.find((member) => member.wallet === newAdmin);
    admin.removeAdminPrivileges();
    user.addAdminPrivileges();
  }
}

export default MembersGroup;
