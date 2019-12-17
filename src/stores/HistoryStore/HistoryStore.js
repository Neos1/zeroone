/* eslint-disable no-await-in-loop */
import { observable, action, computed } from 'mobx';
import Voting from './entities/Voting';
import DataManagerStore from '../DataManagerStore/DataManagerStore';
import { PATH_TO_DATA } from '../../constants/windowModules';
import { readDataFromFile, writeDataToFile } from '../../utils/fileUtils/data-manager';

class HistoryStore {
  @observable dataManager;

  @observable pagination;

  @observable votings = [];

  @observable rawVotings = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.getActualVotings();
    this.dataManager = new DataManagerStore({
      list: this.votingsList,
      itemsCountPerPage: 5,
    });
    this.pagination = this.dataManager.pagination;
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
      this.rawVotings.push(voting);
      this.votings.push(new Voting(voting));
    }
  }

  getVotingsFromContract = async (address) => {
    await this.fetchVotings();
    writeDataToFile({
      name: 'votings',
      data: {
        data: this.rawVotings,
      },
      basicPath: `${PATH_TO_DATA}${address}`,
    });
  }

  getVotingsFromFile = (address) => {
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
        this.rawVotings.push(voting);
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
        this.rawVotings.unshift(voting);
        this.votings.unshift(new Voting(voting));
      }
      writeDataToFile({
        name: 'votings',
        data: {
          data: this.rawVotings,
        },
        basicPath: `${PATH_TO_DATA}${address}`,
      });
    }
  }


  /**
   * Method for getting actual question
   * from the contract & file
   */
  @action getActualVotings = async () => {
    const { contractService } = this.rootStore;
    const { address } = contractService._contract.options;
    const votings = this.getVotingsFromFile(address);
    if (!votings || !votings.data) {
      await this.getVotingsFromContract(address);
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
  @action getVotingById = (id) => this.votings.filter((voting) => voting.id === id)

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
    const { address } = contractService._contract.options;
    const lastIndex = this.votingsList.length;
    const voting = await contractService.callMethod('voting', [lastIndex]);
    voting.descision = await contractService.callMethod('getVotingDescision', [lastIndex]);
    voting.userVote = await contractService.callMethod('getUserVote', [lastIndex]);
    voting.questionId = voting.id;
    voting.id = lastIndex;
    for (let j = 0; j < 7; j += 1) {
      delete voting[j];
    }
    this.rawVotings.splice(0, 1, voting);
    this.votings[0].update(voting);
    writeDataToFile({
      name: 'votings',
      data: {
        data: this.rawVotings,
      },
      basicPath: `${PATH_TO_DATA}${address}`,
    });
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

  /**
   * @function
   * @returns {bool} True if project have not ended voting
   */
  @computed get isVotingActive() {
    return this.votings[0] && this.votings[0].status === 0;
  }

  /**
   * @function
   * @returns {Array} list of votings
   */
  @computed get votingsList() {
    return this.votings;
  }
}
export default HistoryStore;
