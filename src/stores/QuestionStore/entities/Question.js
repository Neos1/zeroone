class Question {
  raw;

  id;

  name;

  groupId;

  description;

  methodSelector;

  status;

  target;

  paramNames;

  paramTypes;

  formula;

  /**
   * @class
   * @param {string} id id question
   * @param {object} question data about question
   * @param {number} question.groupId id of group, which can start voting for this question
   * @param {string} question.name question name
   * @param {string} question.description description of the question
   * @param {Array} question.paramNames array contains parameters names which
   * will be used after voting
   * @param {Array} question.paramNames array contains parameters types which
   * will be used after voting
   * @param {string} question.rawFormula formula string
   * @param {string} question.target address, which method will be called after end of the voting
   * @param {string} question.methodSelector hex (4 bytes) - function signature of target contract
   * @param {number} question.status status of question: 0 - can't start voting,
   * 1 - can start voting
   */
  constructor(id, question) {
    const {
      groupId,
      name,
      description,
      target,
      timeLimit: time,
      active: status,
      methodSelector,
      rawFormula,
      paramNames,
      paramTypes,
    } = question;

    this.raw = question;

    this.id = id;
    this.name = name;
    this.groupId = Number(groupId);
    this.description = description;
    this.time = time;
    this.methodSelector = methodSelector;
    this.status = status;
    this.target = target;
    this.paramNames = paramNames;
    this.paramTypes = paramTypes;
    this.formula = rawFormula;
  }

  getParameters() {
    return this.params.map((param) => param[1]);
  }

  getFormula() {
    return this.formula;
  }
}

export default Question;
