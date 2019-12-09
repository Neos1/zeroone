/* eslint-disable no-await-in-loop */
import { observable, computed, action } from 'mobx';
import MembersGroup from './MembersGroup';
import { fs, path, PATH_TO_CONTRACTS } from '../../constants/windowModules';

/**
 * Store for manage Members groups
 *
 * @param {Array} group group
 */
class MembersStore {
  /**
   * Constructor
   *
   * @param {Array} groups groups with members
   * @param {object} rootStore rootStore
   */
  constructor(groups, rootStore) {
    this.rootStore = rootStore;
    if (
      Array.isArray(groups) === false
    ) throw new Error('Incorrect groups provided');
    groups.forEach((group) => {
      this.addToGroups(group);
    });
  }

  @observable groups = [];

  fetchUserGroupsLength = () => {
    const { contractService } = this.rootStore;
    return contractService.fetchUserGroupsLength();
  }

  fetchUserGroups = () => {
    this.fetchUserGroupsLength()
      .then((length) => this.getUserGroups(length))
      .then((groups) => this.getPrimaryGroupsInfo(groups))
      .then((groups) => this.getUsersBalances(groups))
      .then((groups) => {
        groups.forEach((group) => {
          this.addToGroups(group);
        });
      });
  }

  async getUserGroups(length) {
    const { contractService } = this.rootStore;
    const groups = [];
    for (let i = 1; i < length; i += 1) {
      const group = await contractService.callMethod('getUserGroup', [i]);
      delete group['0'];
      delete group['1'];
      delete group['2'];
      delete group['3'];
      groups.push(group);
    }
    return groups;
  }

  async getPrimaryGroupsInfo(groups) {
    const { Web3Service, userStore } = this.rootStore;
    for (let i = 0; i < groups.length; i += 1) {
      const group = groups[i];
      const abi = fs.readFileSync(path.join(PATH_TO_CONTRACTS, group.groupType === 'ERC20' ? './ERC20.abi' : './MERC20.abi'));
      const contract = Web3Service.createContractInstance(JSON.parse(abi));
      contract.options.address = await group.groupAddress;
      group.contract = contract;
      group.totalSupply = await contract.methods.totalSupply().call();
      group.tokenSymbol = await contract.methods.symbol().call();
      group.users = group.groupType === 'ERC20'
        ? [userStore.address]
        : await contract.methods.getUsers().call();
      // eslint-disable-next-line no-param-reassign
      groups[i] = group;
    }
    return groups;
  }

  // eslint-disable-next-line class-methods-use-this
  async getUsersBalances(groups) {
    for (let i = 0; i < groups.length; i += 1) {
      const group = groups[i];
      const { contract } = group;
      group.members = [];
      for (let j = 0; j < group.users.length; j += 1) {
        const user = group.users[j];
        const balance = await contract.methods.balanceOf(user).call();
        group.members.push({
          wallet: user,
          balance,
          weight: (balance / Number(group.totalSupply)) * 100,
          customTokenName: group.tokenSymbol,
          isAdmin: false,
        });
      }
    }
    return groups;
  }

  @action
  /**
   * Method for adding new group
   *
   * @param {object} group data for group
   */
  addToGroups = (group) => {
    // TODO maybe fix for duplicate
    this.groups.push(new MembersGroup(group));
  }

  @computed
  get list() {
    return this.groups;
  }
}

export default MembersStore;
