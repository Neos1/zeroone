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
}

export default ContractService;
