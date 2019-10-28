class Voting {
  /**
   * @constructor
   * @param {Object} data object contains info adout voting
   * @param {Number} data.votingId id of voting
   * @param {Number} data.questionId id of question which selected for voting
   * @param {Array} data.params parameters of voting
   */
  constructor({
    votingId, questionId, params,
  }) {
    this.id = votingId;
    this.questionId = questionId;
    this.params = params;
  }

  /**
   * getting stats of voting on click
   * @function
   * @return {Array} stats of voting
   */
  getVotingStats() {
    const stats = [];
    return stats;
  }
}

export default Voting;
