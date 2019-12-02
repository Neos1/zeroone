
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
    convertedFormula.push(matched[0] === 'group' ? 0 : 1);
    convertedFormula.push(matched[1] === 'Owners' ? 1 : 2);
    convertedFormula.push(matched[3] === 'quorum' ? 0 : 1);
    convertedFormula.push(matched[4] === '<=' ? 0 : 1);
    convertedFormula.push(Number(matched[5]));
    if (matched.length === 9) {
      convertedFormula.push(matched[8] === 'quorum' ? 0 : 1);
    }
    return convertedFormula;
  }

  /**
   * getting formed parameters for contract
   * @param {string} contractAddr address of target contract
   * @returns {array} formed data for encoding transaction
   */
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
