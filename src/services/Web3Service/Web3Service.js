import Web3 from 'web3';
import { BN } from 'ethereumjs-util';

/**
 * Service for working with web3 (sending signed transactions, creating transactions)
 */
class web3Service {
  /**
   * @constructor
   * @param {string} provider - provider for this.web3
   */
  constructor(url, rootStore) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(url));
    this.rootStore = rootStore;
  }

  createContractInstance(abi) {
    const { web3: { eth: { Contract } } } = this;
    return new Contract(abi);
  }

  createTxData(address, tx, maxGasPrice) {
    const { web3: { eth } } = this;
    let transaction = { ...tx };
    return eth.getTransactionCount(address, 'pending')
      .then((nonce) => {
        transaction = { ...tx, nonce };
        return eth.estimateGas(tx);
      })
      .then((gas) => {
        if (!maxGasPrice) return (Promise.resolve(gas));
        return this.getGasPrice()
          .then((gasPrice) => {
            transaction.gasPrice = new BN(gasPrice).lte(new BN(maxGasPrice))
              ? gasPrice
              : maxGasPrice;
            return Promise.resolve(gas);
          })
          .catch(Promise.reject);
      })
      // eslint-disable-next-line no-unused-vars
      .then((gasPrice) => (
        { ...transaction, gasPrice }
      ))
      .catch((err) => Promise.reject(err));
  }

  getGasPrice() {
    const { web3: { eth: { getGasPrice } } } = this;
    return getGasPrice();
  }

  /**
   * Sending transaction to contract
   * @param {string} txData Raw transaction (without 0x)
   * @return {Promise} promise with web3 transaction PromiEvent
   */
  sendSignedTransaction(rawTx) {
    const { web3: { eth: { sendSignedTransaction } } } = this;
    return new Promise((resolve, reject) => {
      sendSignedTransaction(rawTx)
        .on('transactionHash', (txHash) => {
          resolve(txHash);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
export default web3Service;
