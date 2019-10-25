import Web3 from 'web3';
/**
 * Class for working with this.web3 (sending transactions)
 */
class web3Service {
  /**
   * @constructor
   * @param {string} provider - provider for this.web3
   */
  constructor(providerUrl) {
    this.web3 = new Web3();
    this.gasPrice = this.web3.utils.toHex(1000000000);
    this.gasLimit = this.web3.utils.toHex(21000);
    this.provider = '';
    this.address2nonce = {};
    this.createProvider(providerUrl)
      .then((provider) => {
        this.setProvider(provider);
      }).catch((e) => new Error('this.web3 error: createProvider', e));
  }

  /**
   * creates and stores this.web3 provider instance
   * @param {string} url this.web3 socket connection url
   * @return {Promise<object>} this.web3 provider instance
   */
  createProvider(url) {
    return new Promise((resolve, reject) => {
      if (!url) reject(new Error('No provider specified'));
      const provider = new WebsocketProvider(url);
      resolve(provider);
    });
  }

  /**
   * sets this.web3 provider instance
   * inits connection
   * @param {string} url this.web3 socket connection url
   */
  setProvider(provider) {
    this.provider = provider;
    this.web3.setProvider(provider);
  }

  /**
   * Sending transaction to contract
   * @param {string} txData Raw transaction (without 0x)
   * @param {string} from User, who send transaction
   */
  sendTransaction(txData, from) {
    this.address2nonce[from] += 1;
    return this.web3.sendSignedTransaction(`0x${txData}`, from);
  }

  /**
   * Getting nonce of address
   * @param {string} address address, for which we getting nonce
   */
  getNonce(address) {
    return new Promise((resolve, reject) => {
      if (!this.address2nonce[address]) {
        this.web3.eth.getTransactionCount(address, 'pending').then((nonce) => {
          this.address2nonce[address] += nonce;
          resolve(nonce);
        }).catch((e) => reject(e));
      } else {
        resolve(this.address2nonce[address]);
      }
    });
  }
}
export default web3Service;