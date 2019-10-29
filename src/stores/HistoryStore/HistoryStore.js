import { observable, action, computed } from 'mobx';
import Voting from './entities/Voting';

class HistoryStore {
  @observable votings = [];

  constructor(projectAddress) {
    this.fetchVotings(projectAddress);
  }

  /**
   * recieving voting length for fetching them from contract
   * @function
   * @param {string} address user address
   * @returns {number} count of votings
   */
  @action fetchVotingsCount = (address) => address

  /**
   * recieving voting for local using
   * @function
   * @param {string} address user address
   */
  @action fetchVotings = (address) => {
    this.fetchVotingsCount(address);
    this.votings.push(new Voting());
  }

  /**
   * Getting full info about one voting, selected by id
   * @function
   * @param {number} id id of voting
   * @return {object} selected voting
   */
  @action getVotingsById = (id) => this.votings.filter((voting) => voting.id === id)

  /**
   * Getting stats about votes in voting, selected by id
   * @function
   * @param {number} id id of voting
   * @return {array} stats
   */
  @action getVotingStats = (id) => id

  /**
   * filtering voting by given parameters
   * @function
   * @param {object} params parameters for filtering
   * @param {number} params.questionId filter votings by questionId
   * @param {number} params.descision filter voting by descision
   * @param {string} params.dateFrom filter voting by startTime
   * @param {string} params.dateTo  filter voting by endTime
   * @return {array} Filtered question
   */
  @action filterVotings = (params) => params

  /**
   * @function
   * @return {bool} True if project have not ended voting
   */
  @computed get isVotingActive() {
    return this.votings;
  }

  /**
   * @function
   * @return {array} list of votings
   */
  @computed get votingsList() {
    return this.votings;
  }
}
export default HistoryStore;
