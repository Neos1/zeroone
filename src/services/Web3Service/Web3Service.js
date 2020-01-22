import Web3 from 'web3';
import { BN } from 'ethereumjs-util';

/**
 * Service for working with web3 (sending signed transactions, creating transactions)
 */
class Web3Service {
  /**
   * @class
   * @param url
   * @param rootStore
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

  createTxData(address, tx) {
    const { web3: { eth }, rootStore } = this;
    const { configStore: { MIN_GAS_PRICE, MAX_GAS_PRICE, GAS_LIMIT: gasLimit } } = rootStore;
    let transaction = { ...tx };
    return eth.getTransactionCount(address, 'pending')
      .then((nonce) => {
        transaction = { ...tx, nonce, gasLimit };
        console.log(transaction, eth.estimateGas(transaction));
        return eth.estimateGas(transaction);
      })
      .then((gas) => {
        transaction = { ...transaction, gas };
        console.log(transaction);
        return this.getGasPrice()
          .then((gasPrice) => {
            console.log(gasPrice, MIN_GAS_PRICE, MAX_GAS_PRICE);
            const gp = new BN(gasPrice);
            const minGp = new BN(MIN_GAS_PRICE);
            const maxGp = new BN(MAX_GAS_PRICE);
            transaction.gasPrice = (gp.gte(minGp) && gp.lte(maxGp))
              ? gasPrice
              : MIN_GAS_PRICE;
            console.log(transaction);
            return Promise.resolve(transaction.gasPrice);
          })
          .catch(Promise.reject);
      })
      // eslint-disable-next-line no-unused-vars
      .then((gasPrice) => ({ ...transaction, gasPrice }))
      .catch((err) => Promise.reject(err));
  }

  /**
   * getting gas price
   *
   * @returns {number} gasPrice from network
   */
  getGasPrice() {
    const { web3: { eth: { getGasPrice } } } = this;
    return getGasPrice();
  }

  /**
   * Sending transaction to contract
   *
   * @param rawTx
   * @param {string} txData Raw transaction (without 0x)
   * @returns {Promise} promise with web3 transaction PromiEvent
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

  /**
   * checking transaction receipt by hash every 5 seconds
   *
   * @param {string} txHash hash of transaction
   * @returns {Promise} Promise which resolves on successful receipt fetching
   */
  subscribeTxReceipt(txHash) {
    const { web3 } = this;
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        web3.eth.getTransactionReceipt(txHash).then((receipt) => {
          if (receipt) {
            clearInterval(interval);
            resolve(receipt);
          }
        });
      }, 5000);
    });
  }
}

export default Web3Service;
