/**
 * Class for forming transactions
 */
class ContractService {
  constructor(contractInstance) {
    this.contract = contractInstance;
  }

  /**
   * Creates transaction
   * @param {string} method
   * @param {array} params
   */
  createTxData(method, params) {
    return this.contract.methods[method](params).encodeABI();
  }

  /**
   * calling contract method
   * @param {string} method method, which will be called
   * @param {string} from address of caller
   * @param params parameters for method
   */
  async callMethod(method, from, ...params) {
    const data = await this.contract.methods[method](...params).call({ from });
    return data;
  }

  /**
   * getting one question
   * @param {number} id id of question
   * @param {string} from address who calls method
   */
  async fetchQuestion(id, from) {
    const data = await this.contract.methods.getQuestion(id).call({ from });
    return data;
  }

  /**
   * getting one voting
   * @param {number} id id of voting
   * @param {string} from address who calls method
   */
  async fetchVoting(id, from) {
    const data = await this.contract.methods.getVoting(...params).call({ from });
    return data;
  }

  /**
   * getting votes weights for voting
   * @param {number} id id of voting
   * @param {string} from address, who calls
   */
  async fetchVotingStats(id, from) {
    const data = await this.contract.methods.getVotingStats(...params).call({ from });
    return data;
  }

  /**
   * Starting the voting
   * @param {id} id id of question
   * @param {string} from address, who starts
   * @param params parameters of voting
   */
  async startVoting(id, from, params) {

  }

  /**
   * Finishes the voting
   */
  async finishVoting() {

  }
}

export default ContractService;
