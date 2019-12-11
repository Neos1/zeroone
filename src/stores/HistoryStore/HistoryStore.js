/* eslint-disable no-await-in-loop */
import { observable, action, computed } from 'mobx';
import Voting from './entities/Voting';

class HistoryStore {
  @observable votings = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.fetchVotings();
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
      this.votings.push(new Voting(voting));
    }
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
