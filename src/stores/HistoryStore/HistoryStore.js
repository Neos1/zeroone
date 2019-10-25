import { observable, action, computed } from 'mobx';

class HistoryStore {
  @observable votings = [];


  /**
   * recieving voting for local using
   * @function
   * @param {string} address project address
   */
  @action recieveVotings = (address) => {
    // this.votings.push(voting)
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
const historyStore = new HistoryStore();
export default historyStore;
