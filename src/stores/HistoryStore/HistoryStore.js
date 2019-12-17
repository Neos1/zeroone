/* eslint-disable no-await-in-loop */
import { observable, action, computed } from 'mobx';
import Voting from './entities/Voting';
import { PATH_TO_DATA } from '../../constants/windowModules';
import { readDataFromFile, writeDataToFile } from '../../utils/fileUtils/data-manager';
import FilterStore from '../FilterStore/FilterStore';
import PaginationStore from '../PaginationStore';

class HistoryStore {
  @observable pagination;

  @observable _votings = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.getActualVotings();
    this.filter = new FilterStore();
    this.pagination = new PaginationStore({
      totalItemsCount: this.list.length,
      itemsCountPerPage: 5,
    });
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
    const { contractService } = this.rootStore;
    let length = (await this.fetchVotingsCount()) - 1;
    for (length; length > 0; length -= 1) {
      const voting = await contractService.callMethod('voting', [length]);
      voting.descision = await contractService.callMethod('getVotingDescision', [length]);
      voting.userVote = await contractService.callMethod('getUserVote', [length]);
      voting.questionId = voting.id;
      voting.id = length;
      for (let j = 0; j < 7; j += 1) {
        delete voting[j];
      }
      this._votings.push(new Voting(voting));
    }
  }

  /**
   * Method for getting actual question
   * from the contract & file
   */
  @action getActualVotings = async () => {
    const votings = this.getVotingsFromFile();
    if (!votings || !votings.data) {
      await this.getVotingsFromContract();
      return;
    }
    this.getMissingVotings();
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
    const { contractService } = this.rootStore;
    const lastIndex = this._votings.length;
    const voting = await contractService.callMethod('voting', [lastIndex]);
    voting.descision = await contractService.callMethod('getVotingDescision', [lastIndex]);
    voting.userVote = await contractService.callMethod('getUserVote', [lastIndex]);
    voting.questionId = voting.id;
    voting.id = lastIndex;
    for (let j = 0; j < 7; j += 1) {
      delete voting[j];
    }
    this._votings[0].update(voting);
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

  getVotingsFromContract = async () => {
    await this.fetchVotings();
    this.writeVotingsToFile();
  }

  getVotingsFromFile = () => {
    const { contractService } = this.rootStore;
    const { address } = contractService._contract.options;
    const votings = readDataFromFile({
      name: 'votings',
      basicPath: `${PATH_TO_DATA}${address}`,
    });
    const votingsFromFileLength = votings.data && votings.data.length
      ? votings.data.length
      : 0;
    for (let i = 0; i < votingsFromFileLength; i += 1) {
      const voting = votings.data[i];
      if (voting) {
        // For correct work {getMissingVotings} method
        this.votings.push(new Voting(voting));
      }
    }
    return votings;
  }

  getMissingVotings = async () => {
    const firstVotingIndex = 1;
    const { contractService } = this.rootStore;
    const { address } = contractService._contract.options;
    const countOfVotings = await this.fetchVotingsCount();
    const votings = readDataFromFile({
      name: 'votings',
      basicPath: `${PATH_TO_DATA}${address}`,
    });
    const votingsFromFileLength = votings.data.length;
    const countVotingFromContract = countOfVotings - firstVotingIndex;
    if (countVotingFromContract > votingsFromFileLength) {
      for (let i = votingsFromFileLength + firstVotingIndex; i < countOfVotings; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const voting = await contractService.callMethod('voting', [i]);
        voting.descision = await contractService.callMethod('getVotingDescision', [i]);
        voting.userVote = await contractService.callMethod('getUserVote', [i]);
        voting.questionId = voting.id;
        voting.id = i;
        for (let j = 0; j < 7; j += 1) {
          delete voting[j];
        }
        this._votings.unshift(new Voting(voting));
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
    const { contractService } = this.rootStore;
    const { address } = contractService._contract.options;
    writeDataToFile({
      name: 'votings',
      data: {
        data: this.rawList,
      },
      basicPath: `${PATH_TO_DATA}${address}`,
    });
  }
}
export default HistoryStore;
