/* eslint-disable no-unused-expressions */
import web3 from 'web3';

class Question {
  constructor({
    id, group, name, caption, time, method, formula, parameters,
  }) {
    this.id = id;
    this.group = group;
    this.name = name;
    this.caption = caption;
    this.time = time;
    this.method = method;
    this.formula = formula;
    this.parameters = parameters;
  }

  /**
   * convert simple formula of system question for contract
   * @param {string} formula text implimentation of formula
   * @returns {array} numeric implimentation of formula for smart contract
   */
  getFormulaForContract() {
    const FORMULA_REGEXP = new RegExp(/(group)|((?:[a-zA-Z0-9]{1,}))|((quorum|positive))|(>=|<=)|([0-9%]{1,})|(quorum|all)/g);
    const matched = this.formula.match(FORMULA_REGEXP);
    const convertedFormula = [];
    matched[0] === 'group' ? convertedFormula.push(0) : convertedFormula.push(1);
    matched[1] === 'Owners' ? convertedFormula.push(1) : convertedFormula.push(2);
    matched[3] === 'quorum' ? convertedFormula.push(0) : convertedFormula.push(1);
    matched[4] === '<=' ? convertedFormula.push(0) : convertedFormula.push(1);
    convertedFormula.push(Number(matched[5]));
    if (matched.length === 9) {
      matched[8] === 'quorum' ? convertedFormula.push(0) : convertedFormula.push(1);
    }
    return convertedFormula;
  }

  getUploadingParams(contractAddr) {
    const {
      id, group, name, caption, time, method, parameters,
    } = this;
    const convertedFormula = this.getFormulaForContract();
    const params = parameters.map((param) => web3.utils.utf8ToHex(param));
    return [[id, group, time], 0, name, caption, contractAddr, method, convertedFormula, params];
  }
}
export default Question;
