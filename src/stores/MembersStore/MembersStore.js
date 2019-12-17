/* eslint-disable no-await-in-loop */
import { observable, computed, action } from 'mobx';
import MembersGroup from './MembersGroup';
import {
  fs,
  path,
  PATH_TO_CONTRACTS,
  PATH_TO_DATA,
} from '../../constants/windowModules';
import { readDataFromFile, writeDataToFile } from '../../utils/fileUtils/data-manager';

/**
 * Store for manage Members groups
 *
 * @param id
 * @param group
 */
class MembersStore {
  /**
   * Constructor
   *
   * @param {Array} groups groups with members
   * @param {object} rootStore rootStore
   */

  transferSteps = {
    input: 0,
    transfering: 1,
    success: 2,
    error: 3,
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable groups = [];

  @observable _transferStatus = 0;

  @action init() {
    this.groups = [];
    this.fetchUserGroups();
  }

  fetchUserGroupsLength = () => {
    const { contractService } = this.rootStore;
    return contractService.fetchUserGroupsLength();
  }

  fetchUserGroups = () => {
    this.fetchUserGroupsLength()
      .then((length) => this.getActualUserGroups(length))
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

  /**
   * Method for getting groups from file
   * or from contract
   *
   * @param {number} length length groups
   * @returns {Array} actual groups data
   */
  async getActualUserGroups(length) {
    const { contractService } = this.rootStore;
    const { address } = contractService._contract.options;
    // Groups FROM FILE
    let groups = readDataFromFile({
      name: 'groups',
      basicPath: `${PATH_TO_DATA}${address}`,
    });
    // Groups FROM CONTRACT
    if (
      !groups
      || !groups.data
      || !groups.data.length
      || groups.data.length < length
    ) {
      groups = await this.getUserGroups(length);
      writeDataToFile({
        name: 'groups',
        data: {
          data: groups,
        },
        basicPath: `${PATH_TO_DATA}${address}`,
      });
      return groups;
    }
    return groups.data;
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

  @action
  isUserInGroup(groupId, address) {
    // eslint-disable-next-line max-len
    const memberItem = this.groups[groupId].list.filter((user) => (user.wallet).toUpperCase() === address.toUpperCase());
    return memberItem.length > 0 ? this.groups[groupId] : null;
  }

  @action setTransferStatus(status) {
    this._transferStatus = this.transferSteps[status];
  }

  @action
  transferTokens(groupId, from, to, count) {
    const { contract } = this.list[groupId];
    window.contract = contract;
    // eslint-disable-next-line no-unused-vars
    const { Web3Service, userStore: { address, password }, userStore } = this.rootStore;
    const maxGasPrice = 30000000000;
    const txData = {
      from,
      to: contract.options.address,
      data: contract.methods.transferFrom(from, to, Number(count)).encodeABI(),
      gasLimit: 8000000,
      gasPrice: maxGasPrice,
      value: '0x0',
    };

    return Web3Service.createTxData(address, txData, maxGasPrice)
      .then((formedTx) => userStore.singTransaction(formedTx, password))
      .then((signedTx) => Web3Service.sendSignedTransaction(`0x${signedTx}`))
      .then((txHash) => Web3Service.subscribeTxReceipt(txHash));
  }

  @action getMemberById = (id) => this.list[Number(id)];

  @computed
  get transferStatus() {
    return this._transferStatus;
  }

  @computed
  get list() {
    return this.groups;
  }
}

export default MembersStore;
