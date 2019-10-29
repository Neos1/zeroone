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
    this.provider = providerUrl;
    this.address2nonce = {};
  }

  /**
   * creates and stores this.web3 provider instance
   * @param {string} url this.web3 socket connection url
   * @return {Promise<object>} this.web3 provider instance
   */
  createProvider(url) {
    return (this.address2nonce, url);
  }

  /**
   * sets this.web3 provider instance
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
   * @return {Promise} promise with web3 transaction PromiEvent
   */
  sendSignedTransaction(txData, from) {
    this.address2nonce[from] += 1;
    return this.web3.sendSignedTransaction(`0x${txData}`);
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

  /**
   * Decreasing nonce of address
   * @param {string} address address, for which we decrease nonce
   */
  decreaseNonce(address) {
    if (this.address2nonce[address]) this.address2nonce[address] -= 1;
  }
}
export default web3Service;
