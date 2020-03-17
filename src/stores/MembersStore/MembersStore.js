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
import AsyncInterval from '../../utils/AsyncUtils';
import { tokenTypes } from '../../constants';

/**
 * Store for manage Members groups
 *
 * @param id
 * @param data
 * @param groupAddress
 * @param admin
 * @param group
 */
class MembersStore {
  transferSteps = {
    input: 0,
    transfering: 1,
    success: 2,
    error: 3,
  }

  /**
   * Create a member store
   *
   * @param {object} rootStore rootStore
   */
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable groups = [];

  @observable _transferStatus = 0;

  @observable loading = false;

  @action init() {
    const { rootStore: { configStore: { UPDATE_INTERVAL } } } = this;
    this.groups = [];
    this.loading = true;
    this.fetchUserGroups();
    this.asyncUpdater = new AsyncInterval({
      timeoutInterval: UPDATE_INTERVAL,
      cb: async () => {
        await this.fetchUserGroups();
      },
    });
  }

  async fetchUserGroupsLength() {
    const { contractService } = this.rootStore;
    return contractService.fetchUserGroupsLength();
  }

  async fetchUserGroups() {
    await this.fetchUserGroupsLength()
      .then((length) => this.getActualUserGroups(length))
      .then((groups) => this.getPrimaryGroupsInfo(groups))
      .then((groups) => this.getUsersBalances(groups))
      .then((groups) => {
        groups.forEach((group) => {
          this.addToGroups(group);
        });
        this.loading = false;
      })
      .catch((err) => {
        console.error(err);
        this.loading = false;
      });
  }

  async getUserGroups(length) {
    const { contractService } = this.rootStore;
    const groups = [];
    for (let i = 0; i < length; i += 1) {
      const group = await contractService.callMethod('getUserGroup', i);
      groups.push(group);
    }
    return groups;
  }

  /**
   * Method for getting groups from file
   * without duplicated item
   *
   * @returns {Array} correct array of groups
   */
  async getGroupsFromFile() {
    const { contractService, userStore } = this.rootStore;
    const userAddress = userStore.address;
    const projectAddress = contractService._contract.options.address;
    const groups = [];
    try {
      const groupsFromFile = await readDataFromFile({
        name: 'groups',
        basicPath: `${PATH_TO_DATA}${userAddress}\\${projectAddress}`,
      });
      const groupsFromFileLength = groupsFromFile.data && groupsFromFile.data.length
        ? groupsFromFile.data.length
        : 0;
      for (let i = 0; i < groupsFromFileLength; i += 1) {
        const group = groupsFromFile.data[i];
        if (group) {
          const duplicateGroup = groups.find((item) => item.name === group.name);
          if (!duplicateGroup) groups.push(group);
        }
      }
    } catch {
      return groups;
    }
    return groups;
  }

  /**
   * Method for write groups to file
   *
   * @param {Array} groups array of groups
   */
  writeGroupsToFile(groups) {
    const { contractService, userStore } = this.rootStore;
    const userAddress = userStore.address;
    const projectAddress = contractService._contract.options.address;
    writeDataToFile({
      name: 'groups',
      data: {
        data: groups,
      },
      basicPath: `${PATH_TO_DATA}${userAddress}\\${projectAddress}`,
    });
  }

  /**
   * Method for getting groups from file
   * or from contract
   *
   * @param {number} length length groups
   * @returns {Array} actual groups data
   */
  async getActualUserGroups(length) {
    // Groups FROM FILE
    let groups = await this.getGroupsFromFile();
    // Groups FROM CONTRACT
    if (
      !groups
      || !groups.length
      || !groups.length < length
    ) {
      groups = await this.getUserGroups(length);
      this.writeGroupsToFile(groups);
      return groups;
    }
    return groups;
  }

  async getPrimaryGroupsInfo(groups) {
    const { Web3Service, userStore } = this.rootStore;
    for (let i = 0; i < groups.length; i += 1) {
      const group = groups[i];
      const abi = fs.readFileSync(path.join(PATH_TO_CONTRACTS, group.groupType === 0 ? './ERC20.abi' : './CustomToken.abi'));
      const contract = Web3Service.createContractInstance(JSON.parse(abi));
      contract.options.address = await group.groupAddress;
      group.contract = contract;
      group.totalSupply = await contract.methods.totalSupply().call();
      group.tokenSymbol = await contract.methods.symbol().call();
      group.users = group.groupType === tokenTypes.ERC20
        ? [userStore.address]
        : [userStore.address];// await contract.methods.getUsers().call();
      group.groupId = i + 1;
      // eslint-disable-next-line no-param-reassign
      groups[i] = group;
    }
    return groups;
  }

  // eslint-disable-next-line class-methods-use-this
  async getUsersBalances(groups) {
    for (let i = 0; i < groups.length; i += 1) {
      const group = groups[i];
      const { contract, groupType } = group;
      group.members = [];
      const admin = groupType === tokenTypes.Custom
        ? await contract.methods.owner().call()
        : null;

      for (let j = 0; j < group.users.length; j += 1) {
        const user = group.users[j];
        const balance = await contract.methods.balanceOf(user).call();
        group.members.push({
          wallet: user,
          balance,
          weight: (balance / Number(group.totalSupply)) * 100,
          customTokenName: group.tokenSymbol,
          isAdmin: admin !== null
            ? user === admin
            : false,
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
    const { userStore, configStore: { UPDATE_INTERVAL } } = this.rootStore;
    const duplicateMembersGroup = this.groups.find((item) => item.name === group.name);
    if (!duplicateMembersGroup) {
      this.groups.push(new MembersGroup({
        ...group,
        interval: UPDATE_INTERVAL,
        userAddress: userStore.address,
      }));
    }
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
    const { contract, groupType } = this.list[groupId];
    window.contract = contract;
    console.log('contract', contract);
    // eslint-disable-next-line no-unused-vars
    const { Web3Service, userStore: { address, password }, userStore } = this.rootStore;
    const data = groupType === tokenTypes.ERC20
      ? contract.methods.transfer(to, Number(count)).encodeABI()
      : contract.methods.transferFrom(from, to, Number(count)).encodeABI();
    const txData = {
      data,
      from: userStore.address,
      to: contract.options.address,
      value: '0x0',
    };
    return new Promise((resolve, reject) => {
      Web3Service.createTxData(address, txData)
        .then((formedTx) => userStore.singTransaction(formedTx, password))
        .then((signedTx) => Web3Service.sendSignedTransaction(`0x${signedTx}`))
        .then((txHash) => Web3Service.subscribeTxReceipt(txHash))
        .then(() => {
          userStore.getEthBalance();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  @action getMemberById = (id) => {
    if (!this.list) return {};
    const [group] = this.list.filter((groupItem) => groupItem.groupId === Number(id));
    return group;
  }

  getAddressesForAdminDesignate = (data) => new Promise((resolve) => {
    const { Web3Service: { web3: { eth } } } = this.rootStore;
    const parameters = ['address', 'address'];
    const input = `0x${data.substring(10)}`;
    resolve(Object.values(eth.abi.decodeParameters(parameters, input)));
  });

  @action
  updateAdmin = (groupAddress) => {
    const groups = this.groups.filter((group) => group.wallet === groupAddress);
    groups.forEach((group) => { group.setNewAdmin(); });
  }

  @action
  reset = () => {
    this.asyncUpdater.cancel();
    this.groups.forEach((group) => { group.stopInterval(); });
    this.groups = [];
    this._transferStatus = 0;
    this.loading = true;
  }

  @computed
  get transferStatus() {
    return this._transferStatus;
  }

  @computed
  get nonERC() {
    return this.groups.filter((group) => group.groupType !== '0')
      .map((group) => ({ label: group.name, value: group.wallet }));
  }

  @computed
  get list() {
    return this.groups;
  }
}

export default MembersStore;
