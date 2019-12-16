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

  getVotingsFromFile = async (address) => {
    const votings = readDataFromFile({
      name: 'votings',
      basicPath: `${PATH_TO_DATA}${address}`,
    });
    const votingsFromFileLength = votings.data && votings.data.length
      ? votings.data.length
      : 0;
    for (let i = votingsFromFileLength; i > 0; i -= 1) {
      const voting = votings.data[i];
      // For correct work {getMissingQuestions} method
      this.rawVotings.push(voting);
      this.votings.push(new Voting(voting));
    }
    return votings;
  }

  getMissingVotings = async ({
    votings,
    address,
  }) => {
    const firstVotingIndex = 1;
    const { contractService } = this.rootStore;
    const countOfVotings = await this.fetchVotingsCount();
    const votingsFromFileLength = votings.data.length;
    const countVotingFromContract = countOfVotings - firstVotingIndex;
    console.log(countVotingFromContract, votingsFromFileLength);
    if (countVotingFromContract > votingsFromFileLength) {
      for (let i = votingsFromFileLength + firstVotingIndex; i < countOfVotings; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        console.log(`index=${i}`);
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
    this.getMissingVotings({
      votings,
      address,
    });
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
   * Getting stats about votes in voting, selected by id
   *
   * @function
   * @param {number} id id of voting
   * @returns {Array} stats
   */
  @action getVotingStats = (id) => id

  /**
   * filtering voting by given parameters
   *
   * @function
   * @param {object} params parameters for filtering
   * @param {number} params.questionId filter votings by questionId
   * @param {number} params.descision filter voting by descision
   * @param {string} params.dateFrom filter voting by startTime
   * @param {string} params.dateTo  filter voting by endTime
   * @returns {Array} Filtered question
   */
  @action filterVotings = (params) => params

  /**
   * @function
   * @returns {bool} True if project have not ended voting
   */
  @computed get isVotingActive() {
    return this.votings;
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
