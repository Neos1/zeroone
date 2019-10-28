/**
 * Class for forming transactions
 */
class ContractService {
  constructor(contractInstance) {
    this.contract = contractInstance;
  }

  /**
   * Creates transs
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
   */
  async callMethod(method, from, params) {
    const data = await this.contract.methods[method](params).call({ from });
    return data;
  }
}

export default ContractService;
