/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
import { observable, action, computed } from 'mobx';
import Voting from './entities/Voting';
import { PATH_TO_DATA } from '../../constants/windowModules';
import { readDataFromFile, writeDataToFile } from '../../utils/fileUtils/data-manager';
import FilterStore from '../FilterStore/FilterStore';
import PaginationStore from '../PaginationStore';
import { statusStates } from '../../constants';
import AsyncInterval from '../../utils/AsyncUtils';

class HistoryStore {
  @observable pagination = null;

  /** Voting list */
  @observable _votings = [];

  /** Voting data is loading, should be true only on first load */
  @observable loading = false;

  /** User tokens is return (actual state, updated by interval) */
  @observable isUserReturnTokensActual = false;

  /** Is there an active vote */
  @observable isActiveVoting = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    const { configStore: { UPDATE_INTERVAL } } = rootStore;
    // this.loading = true;
    this.filter = new FilterStore();
    this.updateHistoryInterval = new AsyncInterval({
      cb: async () => {
        // await this.getActualState(() => {
        //   this.returnToLastPage();
        // });
        await this.setLoadingFinish();
      },
      timeoutInterval: UPDATE_INTERVAL,
    });
  }

  @action setLoadingFinish() {
    this.loading = false;
  }

  /**
   * Actual list of voting
   *
   * @returns {Array} list of voting
   */
  @computed get votings() {
    return this._votings;
  }

  /**
   * Get filtered list votings
   *
   * @returns {Array} filtered by rules
   * votings list
   */
  @computed
  get list() {
    return this.filter.filteredList(this.votings);
  }

  /**
   * Get paginated voting list
   *
   * @returns {Array} paginated voting list
   */
  @computed
  get paginatedList() {
    let range;
    if (!this.pagination || !this.pagination.paginationRange) {
      range = [0, 5];
    } else {
      range = this.pagination.paginationRange;
    }
    return this.list.slice(range[0], range[1] + 1);
  }

  /**
   * Get raw voting list
   *
   * @returns {Array} raw voting list
   */
  get rawList() {
    return this._votings.map((voting) => ({
      ...voting.raw,
    }));
  }

  /**
   * Method for check that user return token
   *
   * @returns {boolean} user return tokens or not
   */
  @action
  fetchUserReturnTokens = async () => {
    const isReturn = true; // await this.isUserReturnTokens();
    this.isUserReturnTokensActual = isReturn;
    return isReturn;
  }

  /**
   * Method for getting actual state for
   * this store. This includes: current voting list,
   * whether the user returned tokens, whether
   * there is an active voting
   *
   * @param {Function} cb callback function
   */
  @action
  async getActualState(cb) {
    await this.getActualVotings();
    this.isActiveVoting = await this.hasActiveVoting();
    await this.fetchUserReturnTokens();
    if (cb) cb();
  }

  /**
   * Method for returning on last page after votings
   * list update
   */
  @action
  returnToLastPage() {
    let currentPage = 1;
    if (this.pagination !== null) {
      currentPage = this.pagination.getCurrentPage();
    }
    this.pagination = new PaginationStore({
      totalItemsCount: this.list.length,
    });
    this.pagination.handleChange(currentPage);
  }

  /**
   * recieving voting length for fetching them from contract
   *
   * @function
   * @returns {number} count of votings
   */
  @action fetchVotingsCount = async () => {
    // eslint-disable-next-line no-unused-vars
    const { contractService: { _contract } } = this.rootStore;
    const votingsLength = await _contract.methods.getVotingsAmount().call();
    return votingsLength;
  }

  /**
   * recieving voting for local using
   *
   * @function
   */
  @action fetchVotings = async () => {
    let length = (await this.fetchVotingsCount()) - 1;
    for (length; length > 0; length -= 1) {
      const voting = await this.getVotingFromContractById(length);
      const duplicateVoting = this._votings.find((item) => item.id === voting.id);
      if (!duplicateVoting) this._votings.push(new Voting(voting));
    }
  }

  /**
   * Method for update voting with active
   * status state
   */
  @action
  async updateVotingWithActiveState() {
    const { votings } = this;
    votings.forEach(async (votingItem) => {
      if (votingItem.status === statusStates.active) {
        const { id } = votingItem;
        const voting = await this.getVotingFromContractById(id);
        votingItem.update(voting);
      }
    });
  }

  /**
   * Method for getting actual question
   * from the contract & file
   */
  @action
  getActualVotings = async () => {
    const votings = await this.getFilteredVotingsFromFile();
    this.writeVotingListToState(votings);
    if (!votings || !votings.length) {
      await this.getVotingsFromContract();
      return;
    }
    await this.getMissingVotings();
    await this.updateVotingWithActiveState();
  }

  /**
   * Getting full info about one voting, selected by id
   *
   * @function
   * @param {number} id id of voting
   * @returns {object} selected voting
   */
  @action getVotingById = (id) => this._votings.filter((voting) => voting.id === id)

  /**
   * Method for update specific data
   * for voting by id
   *
   * @param {object} param0 data
   * @param {string|number} param0.id id voting
   * @param {object} param0.newState new state for data update
   */
  @action
  updateVotingById = ({
    id,
    newState,
  }) => {
    const [voting] = this.getVotingById(id);
    voting.update(newState);
  }

  /**
   * Method for update last voting from list.
   * By default used for update voting after closed.
   */
  @action
  fetchAndUpdateLastVoting = async () => {
    const lastIndex = await this.fetchVotingsCount() - 1;
    const votingFromContract = await this.getVotingFromContractById(lastIndex);
    const [voting] = this.getVotingById(lastIndex);
    voting.update(votingFromContract);
    this.writeVotingsToFile();
  }

  /**
   * Getting stats about votes in voting, selected by id
   *
   * @function
   * @param {number} id id of voting
   * @returns {Array} stats
   */
  // TODO fix method
  @action getVotingStats = (id) => id

  @action
  reset = () => {
    this.updateHistoryInterval.cancel();
    this.pagination = null;
    this._votings = [];
    this.loading = true;
  }

  @computed get isVotingActive() {
    return this.isActiveVoting;
  }

  async getVotingsFromContract() {
    await this.fetchVotings();
    this.writeVotingsToFile();
  }

  /**
   * Method for getting list voting from file
   * without duplicated item & with correct order
   *
   * @returns {Array} correct array of voting
   */
  async getFilteredVotingsFromFile() {
    const { contractService, userStore } = this.rootStore;
    const userAddress = userStore.address;
    const projectAddress = contractService._contract.options.address;
    const votings = [];
    try {
      const votingsFromFile = await readDataFromFile({
        name: 'votings',
        basicPath: `${PATH_TO_DATA}${userAddress}\\${projectAddress}`,
      });
      const votingsFromFileLength = votingsFromFile.data && votingsFromFile.data.length
        ? votingsFromFile.data.length
        : 0;
      for (let i = 0; i < votingsFromFileLength; i += 1) {
        const voting = votingsFromFile.data[i];
        if (voting) {
          const duplicateVoting = votings.find((item) => item.id === voting.id);
          if (!duplicateVoting) votings.push(new Voting(voting));
        }
      }
    } catch (e) {
      return votings;
    }
    votings.sort((a, b) => b.id - a.id);
    return votings;
  }

  /**
   * Method for write voting list to
   * state history
   *
   * @param {Array} votingList voting list
   */
  writeVotingListToState(votingList) {
    const votingListLength = votingList.length;
    for (let i = 0; i < votingListLength; i += 1) {
      const voting = votingList[i];
      const duplicateVoting = this._votings.find((item) => item.id === voting.id);
      if (!duplicateVoting) this._votings.push(new Voting(voting));
    }
  }

  /** Method for getting missing votings from contract */
  async getMissingVotings() {
    const votingListFromFile = await this.getFilteredVotingsFromFile();
    const firstVotingIndex = 1;
    const countOfVotings = await this.fetchVotingsCount();
    const votingListFromFileLength = votingListFromFile.length;
    const countVotingFromContract = countOfVotings - firstVotingIndex;
    if (countVotingFromContract > votingListFromFileLength) {
      for (let i = votingListFromFileLength + firstVotingIndex; i < countOfVotings; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const voting = await this.getVotingFromContractById(i);
        const duplicateVoting = this._votings.find((item) => item.id === voting.id);
        if (!duplicateVoting) {
          this._votings.unshift(new Voting(voting));
        }
      }
      this.writeVotingsToFile();
    }
  }

  /**
   * Add new filter rule
   *
   * @param {object} rule object with rules
   */
  addFilterRule = (rule) => {
    this.filter.addFilterRule(rule);
    if (this.pagination) {
      this.pagination.update({
        activePage: 1,
        totalItemsCount: this.list.length,
      });
    }
  }

  /**
   * Method for remove filter rule
   * by name
   *
   * @param {string} rule name rule
   */
  removeFilterRule = (rule) => {
    this.filter.removeFilterRule(rule);
    if (this.pagination) {
      this.pagination.update({
        activePage: 1,
        totalItemsCount: this.list.length,
      });
    }
  }

  /**
   * Method for reset filter
   * & update pagination
   */
  resetFilter = () => {
    this.filter.reset();
    if (
      this.pagination
      && this.pagination.update
    ) {
      this.pagination.update({
        activePage: 1,
        totalItemsCount: this.list.length,
      });
    }
  }

  /** Write raw voting list data to file */
  writeVotingsToFile() {
    const { contractService, userStore } = this.rootStore;
    const userAddress = userStore.address;
    const projectAddress = contractService._contract.options.address;
    writeDataToFile({
      name: 'votings',
      data: {
        data: this.rawList,
      },
      basicPath: `${PATH_TO_DATA}${userAddress}\\${projectAddress}`,
    });
  }

  async getVoterList(votingId) {
    const {
      rootStore: {
        projectStore: {
          questionStore,
        },
        contractService: {
          _contract,
        },
        membersStore,
      },
    } = this;
    const [voting] = this.getVotingById(votingId);
    const { questionId } = voting;
    const [question] = questionStore.getQuestionById(questionId);
    const { groupId } = question;
    const memberGroup = membersStore.list[Number(groupId) - 1];
    if (!memberGroup || !memberGroup.list) return [];
    const { list, balance } = memberGroup;
    const result = {
      positive: [],
      negative: [],
    };
    for (let i = 0; i < list.length; i += 1) {
      let info = {};
      const { wallet } = list[i];
      const vote = await _contract.methods.getUserVote(votingId, wallet).call();
      const tokenCount = await _contract.methods.getUserVoteWeight(votingId, wallet).call();
      const weight = ((tokenCount / Number(balance)) * 100).toFixed(2);
      switch (vote) {
        case ('1'):
          info = { wallet, weight };
          result.positive.push(info);
          break;
        case ('2'):
          info = { wallet, weight };
          result.negative.push(info);
          break;
        default:
          break;
      }
    }
    return result;
  }

  /**
   * Method for getting actual voting
   * from contract by id
   *
   * @param {string|number} id id voting
   * @returns {object} actual voting form contract
   */
  async getVotingFromContractById(id) {
    const { contractService, userStore } = this.rootStore;
    const voting = await contractService.callMethod('voting', [id]);
    const userVoteFromContract = await contractService
      ._contract.methods.getUserVote(id, userStore.address).call();
    const userVote = Number(userVoteFromContract);
    voting.descision = await contractService.callMethod('getVotingDescision', [id]);
    voting.userVote = userVote;
    voting.questionId = voting.id;
    voting.id = id;
    for (let j = 0; j < 7; j += 1) {
      delete voting[j];
    }
    return voting;
  }

  /**
   * Method for check active voting state
   *
   * @returns {boolean} has active voting state
   */
  async hasActiveVoting() {
    const countOfVotings = await this.fetchVotingsCount();
    const lastVote = countOfVotings - 1;
    if (lastVote === 0) return false;
    const voting = await this.getVotingFromContractById(lastVote);
    return voting.status === statusStates.active;
  }

  async isUserReturnTokens() {
    const { contractService, userStore } = this.rootStore;
    // FIXME remove comment & console
    console.log(contractService, userStore);
    // return contractService._contract.methods.isUserReturnTokens(userStore.address).call();
    return false;
  }

  async lastUserVoting() {
    const { contractService, userStore } = this.rootStore;
    return 0;// contractService._contract.methods.findLastUserVoting(userStore.address).call();
  }

  async returnTokens() {
    const { contractService, Web3Service, userStore } = this.rootStore;
    const { _contract } = contractService;
    const { address, password } = userStore;
    const tx = {
      data: contractService._contract.methods.returnTokens().encodeABI(),
      value: '0x0',
      from: address,
      to: _contract.options.address,
    };
    return Web3Service.createTxData(address, tx)
      .then((createdTx) => userStore.singTransaction(createdTx, password))
      .then((signedTx) => Web3Service.sendSignedTransaction(`0x${signedTx}`))
      .then((txHash) => Web3Service.subscribeTxReceipt(txHash))
      .then(() => {
        userStore.getEthBalance();
      });
  }
}
export default HistoryStore;
