class Question {
  id;

  caption;

  groupId;

  text;

  methodSelector;

  status;

  target;

  params;

  formula;

  /**
   * @constructor
   * @param {object} data data about question
   * @param {number} data.id question id
   * @param {number} data.groupId id of group, which can start voting for this question
   * @param {string} data.caption question caption
   * @param {string} data.text description of the question
   * @param {Array} data.params parameters which will be used after voting
   */
  constructor(id, question) {
    const {
      groupId, caption, text, target, status, methodSelector, _formula, _parameters,
    } = question;
    this.id = id;
    this.caption = caption;
    this.groupId = groupId;
    this.text = text;
    this.methodSelector = methodSelector;
    this.status = status;
    this.target = target;
    this.params = _parameters;
    this.formula = _formula;
  }
}

export default Question;
