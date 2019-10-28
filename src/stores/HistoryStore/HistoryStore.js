import { observable, action, computed } from 'mobx';
import Voting from './entities/Voting';

class HistoryStore {
  @observable votings = [];

  /**
   * recieving voting length for fetching them from contract
   * @function
   * @param {string} address user address
   * @returns {number} count of votings
   */
  @action fetchVotingsCount = (address) => {

  }

  /**
   * recieving voting for local using
   * @function
   * @param {string} address user address
   */
  @action fetchVotings = (address) => {
    const data = {};
    this.votings.push(new Voting(data));
  }

  /**
   * Getting full info about one voting, selected by id
   * @function
   * @param {number} id id of voting
   */
  @action getVotingsById = (id) => this.votings.filter((voting) => voting.id === id)

  /**
   * Getting stats about votes in voting, selected by id
   * @function
   * @param {number} id id of voting
   */
  @action getVotingStats = (id) => {}

  /**
   * filtering voting by given parameters
   * @function
   * @param {object} params parameters for filtering
   * @param {number} params.questionId filter votings by questionId
   * @param {number} params.descision filter voting by descision
   * @param {string} params.dateFrom filter voting by startTime
   * @param {string} params.dateTo  filter voting by endTime
   */
  @action filterVotings = (params) => {}

  /**
   * @function
   * @return {bool} True if project have not ended voting
   */
  @computed get isVotingActive() {
    return false;
  }

  /**
   * @function
   * @return {array} list of votings
   */
  @computed get votingsList() {
    return false;
  }
}
export default HistoryStore;
