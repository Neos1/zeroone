class Question {
  /**
   * @constructor
   * @param {object} data data about question
   * @param {number} data.id question id
   * @param {number} data.groupId id of group, which can start voting for this question
   * @param {string} data.caption question caption
   * @param {string} data.text description of the question
   * @param {Array} data.params parameters which will be used after voting
   */
  constructor({
    id, groupId, caption, text, params,
  }) {
    this.id = id;
    this.caption = caption;
    this.groupId = groupId;
    this.text = text;
    this.params = params;
  }

  /**
   * select question for voting initialization
   * @return {object} data about question
   */
  selectQuestionForVoting() {
    const {
      id, groupId, caption, text, params,
    } = this;
    return {
      id, groupId, caption, text, params,
    };
  }
}

export default Question;
