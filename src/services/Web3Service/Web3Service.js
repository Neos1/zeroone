import { reject } from 'q';

/**
 * Class for working with web3 (sending transactions)
 */
class Web3Service {
  /**
   * @constructor
   * @param {string} provider - provider for web3
   */
  constructor(providerUrl) {
    this.provider = '';
    this.createProvider(providerUrl)
      .then((provider) => {
        this.setProvider(provider);
      }).catch((e) => new Error('web3 error: createProvider', e));
  }

  /**
   * creates and stores web3 provider instance
   * @param {string} url web3 socket connection url
   * @return {Promise<object>} web3 provider instance
   */
  createProvider(url) {
    return new Promise((resolve, reject) => {
      if (!url) reject(new Error('No provider specified'));
      const provider = new WebsocketProvider(url);
      resolve(provider);
    });
  }

  /**
   * sets web3 provider instance
   * inits connection
   * @param {string} url web3 socket connection url
   */
  setProvider(provider) {
    this.provider = provider;
    this.web3.setProvider(provider);
  }
}
export default Web3Service;
