import Web3 from 'web3';
import { BN } from 'ethereumjs-util';

/**
 * Service for working with web3 (sending signed transactions, creating transactions)
 */
class Web3Service {
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
            const minGasPrice = 10000000000;
            const gp = new BN(gasPrice);
            const minGp = new BN(minGasPrice);
            const maxGp = new BN(maxGasPrice);
            transaction.gasPrice = (gp.gte(minGp) && gp.lte(maxGp))
              ? gasPrice
              : minGasPrice;
            return Promise.resolve(transaction.gasPrice);
          })
          .catch(Promise.reject);
      })
      // eslint-disable-next-line no-unused-vars
      .then((gasPrice) => (transaction))
      .catch((err) => Promise.reject(err));
  }

  /**
   * getting gas price
   * @returns {number} gasPrice from network
   */
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

  /**
   * checking transaction receipt by hash every 5 seconds
   * @param {string} txHash hash of transaction
   * @return {Promise} Promise which resolves on successful receipt fetching
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
