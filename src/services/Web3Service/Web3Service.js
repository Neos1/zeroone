/* eslint-disable no-console */
import Web3 from 'web3';
import { BN } from 'ethereumjs-util';
/**
 * Class for working with this.web3 (sending transactions)
 */
class web3Service {
  /**
   * @constructor
   * @param {string} provider - provider for this.web3
   */
  constructor(url) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(url));
    this.address2nonce = {};
  }

  createContractInstance(abi) {
    const { web3: { eth: { Contract } } } = this;
    return new Contract(abi);
  }

  formTxData(address, tx, maxGasPrice) {
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
      .then((gas) => (
        { ...transaction }
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
