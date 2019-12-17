import { action, observable } from 'mobx';

class Voting {
  raw;

  @observable userVote;

  @observable status;

  @observable descision;

  @observable closeVoteInProgress;

  /**
   * @class
   * @param {object} data object contains info adout voting
   * @param {number} data.id id of voting
   * @param {number} data.questionId id of question which selected for voting
   * @param {Array} data.params parameters of voting
   */
  constructor({
    id, descision, questionId, data, status, startTime, endTime, caption, text, userVote,
  }) {
    this.raw = {
      id, descision, questionId, data, status, startTime, endTime, caption, text, userVote,
    };
    this.id = id;
    this.questionId = questionId;
    this.descision = descision;
    this.data = data;
    this.startTime = startTime;
    this.endTime = endTime;
    this.status = status;
    this.caption = caption;
    this.text = text;
    this.userVote = Number(userVote);
    this.closeVoteInProgress = false;
  }

  /**
   * Method for update state voting
   *
   * @param {object} newState new state for voting
   */
  @action
  update = (newState) => {
    Object.keys(newState).forEach((key) => {
      this[key] = newState[key];
      this.raw[key] = newState[key];
    });
  }
}

export default Voting;
