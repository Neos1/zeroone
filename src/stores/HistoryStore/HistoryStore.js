/* eslint-disable no-await-in-loop */
import { observable, action, computed } from 'mobx';
import Voting from './entities/Voting';
import { PATH_TO_DATA } from '../../constants/windowModules';
import { readDataFromFile, writeDataToFile } from '../../utils/fileUtils/data-manager';
import FilterStore from '../FilterStore/FilterStore';
import PaginationStore from '../PaginationStore';
import { statusStates, GAS_LIMIT } from '../../constants';

class HistoryStore {
  votingIntervalId = null;

  /**
   * Interval for update missing &
   * active voting (in ms)
   */
  intervalUpdate = 60000;

  @observable pagination = null;

  @observable _votings = [];

  @observable loading = true;

  @observable isUserReturnTokensActual = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.getActualVotings();
    this.filter = new FilterStore();
    this.pagination = new PaginationStore({
      totalItemsCount: this.list.length,
    });
    this.votingIntervalId = setInterval(async () => {
      this.getActualVotings();
      const isReturn = await this.isUserReturnTokens();
      this.isUserReturnTokensActual = isReturn;
    }, this.intervalUpdate);
  }

  /**
   * @function
   * @returns {bool} True if project have not ended voting
   */
  @computed get isVotingActive() {
    return this._votings[0] && this._votings[0].status === 0;
  }

  /**
   * @returns {Array} list of votings
   */
  @computed get votings() {
    return this._votings;
  }

  /**
   * Get list votings
   *
   * @returns {Array} filtered by rules
   * votings list
   */
  @computed
  get list() {
    return this.filter.filteredList(this.votings);
  }

  /**
   * Get paginated list votings
   *
   * @returns {Array} paginated votings list
   */
  @computed
  get paginatedList() {
    const range = this.pagination.paginationRange;
    return this.list.slice(range[0], range[1] + 1);
  }

  get rawList() {
    return this._votings.map((voting) => ({
      ...voting.raw,
    }));
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
    const votingsLength = await _contract.methods.getVotingsCount().call();
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
      this._votings.push(new Voting(voting));
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
  @action getActualVotings = async () => {
    this.loading = true;
    const votings = this.getVotingsFromFile();
    if (!votings || !votings.data) {
      await this.getVotingsFromContract();
      this.loading = false;
      return;
    }
    await this.getMissingVotings();
    await this.updateVotingWithActiveState();
    this.loading = false;
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
    clearInterval(this.votingIntervalId);
    this.pagination = null;
    this._votings = [];
    this.loading = true;
  }

  getVotingsFromContract = async () => {
    await this.fetchVotings();
    this.writeVotingsToFile();
  }

  getVotingsFromFile = () => {
    const { contractService, userStore } = this.rootStore;
    const userAddress = userStore.address;
    const projectAddress = contractService._contract.options.address;
    const votings = readDataFromFile({
      name: 'votings',
      basicPath: `${PATH_TO_DATA}${userAddress}\\${projectAddress}`,
    });
    const votingsFromFileLength = votings.data && votings.data.length
      ? votings.data.length
      : 0;
    for (let i = 0; i < votingsFromFileLength; i += 1) {
      const voting = votings.data[i];
      if (voting) {
        // For correct work {getMissingVotings} method
        const duplicateVoting = this._votings.find((item) => item.id === voting.id);
        if (!duplicateVoting) this.votings.push(new Voting(voting));
      }
    }
    return votings;
  }

  getMissingVotings = async () => {
    const firstVotingIndex = 1;
    const { contractService, userStore } = this.rootStore;
    const countOfVotings = await this.fetchVotingsCount();
    const userAddress = userStore.address;
    const projectAddress = contractService._contract.options.address;
    const votings = readDataFromFile({
      name: 'votings',
      basicPath: `${PATH_TO_DATA}${userAddress}\\${projectAddress}`,
    });
    const votingsFromFileLength = votings.data.length;
    const countVotingFromContract = countOfVotings - firstVotingIndex;
    if (countVotingFromContract > votingsFromFileLength) {
      for (let i = votingsFromFileLength + firstVotingIndex; i < countOfVotings; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const duplicateVoting = this._votings.find((item) => item.id === i);
        if (!duplicateVoting) {
          const voting = await this.getVotingFromContractById(i);
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
    this.pagination.update({
      activePage: 1,
      totalItemsCount: this.list.length,
    });
  }

  /**
   * Method for remove filter rule
   * by name
   *
   * @param {string} rule name rule
   */
  removeFilterRule = (rule) => {
    this.filter.removeFilterRule(rule);
    this.pagination.update({
      activePage: 1,
      totalItemsCount: this.list.length,
    });
  }

  /**
   * Method for reset filter
   * & update pagination
   */
  resetFilter = () => {
    this.filter.reset();
    this.pagination.update({
      activePage: 1,
      totalItemsCount: this.list.length,
    });
  }

  writeVotingsToFile = () => {
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
    const { list, balance } = membersStore.list[Number(groupId) - 1];
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
    console.log(result);
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
    return contractService._contract.methods.isUserReturnTokens(userStore.address).call();
  }

  async lastUserVoting() {
    const { contractService, userStore } = this.rootStore;
    return contractService._contract.methods.findLastUserVoting(userStore.address).call();
  }

  async returnTokens() {
    const { contractService, Web3Service, userStore } = this.rootStore;
    const { _contract } = contractService;
    const { address, password } = userStore;
    const tx = {
      data: contractService._contract.methods.returnTokens().encodeABI(),
      gasLimit: GAS_LIMIT,
      value: '0x0',
      from: address,
      to: _contract.options.address,
    };

    const maxGasPrice = 30000000000;
    return Web3Service.createTxData(address, tx, maxGasPrice)
      .then((createdTx) => userStore.singTransaction(createdTx, password))
      .then((signedTx) => Web3Service.sendSignedTransaction(`0x${signedTx}`))
      .then((txHash) => Web3Service.subscribeTxReceipt(txHash));
  }
}
export default HistoryStore;
