import { action, observable, computed } from 'mobx';
import { statusStates } from '../../../constants';

class Voting {
  raw;

  @observable _userVote;

  @observable status;

  @observable descision;

  @observable closeVoteInProgress;

  /**
   * Voting is new for user. Used to highlight a new vote.
   * It differs only for active voting. For closed, this is
   * always false
   */
  @observable newForUser = false;

  /**
   * @class
   * @param {object} data object contains info adout voting
   * @param {number} data.id id of voting
   * @param {number} data.questionId id of question which selected for voting
   * @param {Array} data.params parameters of voting
   */
  constructor({
    id, descision, questionId,
    data, status, startTime,
    endTime, caption, text,
    userVote, newForUser,
    allowedGroups,
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
    this._userVote = Number(userVote);
    this.closeVoteInProgress = false;
    this.allowedGroups = allowedGroups;
    if (status === statusStates.active) {
      this.newForUser = newForUser !== undefined ? newForUser : true;
    }
  }

  @computed
  get userVote() {
    return Number(this._userVote);
  }

  /**
   * Method for update state voting
   *
   * @param {object} newState new state for voting
   */
  @action
  update = (newState) => {
    Object.keys(newState).forEach((key) => {
      if (key === 'userVote') {
        this._userVote = newState.userVote;
        this.raw.userVote = newState.userVote;
      } else {
        this[key] = newState[key];
        this.raw[key] = newState[key];
      }
    });
  }
}

export default Voting;
