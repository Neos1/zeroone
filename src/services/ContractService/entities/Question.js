import { compile } from 'zeroone-translator';

class Question {
  constructor({
    id,
    group,
    name,
    caption,
    time,
    method,
    formula,
    parameters,
    paramTypes,
    paramNames,
  }) {
    this.id = id;
    this.group = group;
    this.name = name;
    this.caption = caption;
    this.time = time;
    this.method = method;
    this.rawFormula = formula;
    this.parameters = parameters;
    this.paramTypes = paramTypes;
    this.paramNames = paramNames;
    this.formula = compile(formula);
  }

  /**
   * getting formed parameters for contract
   *
   * @param {string} contractAddr address of target contract
   * @returns {Array} formed data for encoding transaction
   */
  getUploadingParams(contractAddr) {
    const {
      name,
      caption,
      group,
      time,
      paramNames,
      paramTypes,
      method,
      rawFormula,
      formula,
    } = this;
    return [
      true,
      name,
      caption,
      group,
      time,
      paramNames,
      paramTypes,
      contractAddr,
      method,
      rawFormula,
      formula,
    ];
  }
}
export default Question;
