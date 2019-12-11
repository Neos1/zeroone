class Voting {
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
    this.id = id;
    this.questionId = questionId;
    this.descision = descision;
    this.data = data;
    this.startTime = startTime;
    this.endTime = endTime;
    this.status = status;
    this.caption = caption;
    this.text = text;
    this.userVote = userVote;
  }
}

export default Voting;
