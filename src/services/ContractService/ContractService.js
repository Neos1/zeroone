/* eslint-disable no-useless-escape */
/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
import browserSolc from 'browser-solc';
import { BN } from 'ethereumjs-util';
import { SOL_IMPORT_REGEXP, SOL_PATH_REGEXP, SOL_VERSION_REGEXP } from '../../constants';
import {
  fs, PATH_TO_CONTRACTS, path,
} from '../../constants/windowModules';
import Question from './entities/Question';
import readSolFile from '../../utils/fileUtils/index';

/**
 * Class for work with contracts
 */
class ContractService {
  constructor(rootStore) {
    this._contract = {};
    this.rootStore = rootStore;
    this.sysQuestions = JSON.parse(fs.readFileSync(path.join(PATH_TO_CONTRACTS, './sysQuestions.json'), 'utf8'));
    this.ercAbi = JSON.parse(fs.readFileSync(path.join(PATH_TO_CONTRACTS, './ERC20.abi')));
  }

  /**
   * sets instance of contract to this._contract
   * @param {object} instance instance of contract created by Web3Service
   */
  // eslint-disable-next-line consistent-return
  setContract(instance) {
    const { Web3Service: { web3 } } = this.rootStore;
    if (!(instance instanceof web3.eth.Contract)) return new Error('this is not contract');
    this._contract = instance;
  }

  /**
   * compiles contracts and returning type of compiled contract, bytecode & abi
   * @param {string} type - ERC20 - if compiling ERC20 token contract, project - if project contract
   * @returns {object} contains type of compiled contract, his bytecode and abi for deploying
   */
  compileContract(type) {
    return new Promise((resolve, reject) => {
      window.BrowserSolc.getVersions((sources, releases) => {
        const version = releases['0.4.24'];
        const contract = this.combineContract(type);
        const contractName = type === 'ERC20'
          ? ':ERC20'
          : ':Voter';
        window.BrowserSolc.loadVersion(version, (compiler) => {
          const compiledContract = compiler.compile(contract);
          const contractData = compiledContract.contracts[contractName];
          if (contractData.interface !== '') {
            const { bytecode, metadata } = contractData;
            const { output: { abi } } = JSON.parse(metadata);
            resolve({ type, bytecode, abi });
          } else reject(new Error('Something went wrong on contract compiling'));
        });
      });
    });
  }

  /**
   * reading all imports in main contract file and importing all files in one output file
   * @param {string} type type of project - ERC20 for ERC-20 tokens, Project for project contract
   * @returns {string} combined contracts
   */
  // eslint-disable-next-line class-methods-use-this
  combineContract(type) {
    const dir = type === 'ERC20' ? './' : './Voter/';
    const compiler = 'pragma solidity ^0.4.24;';
    const pathToMainFile = type === 'ERC20'
      ? path.join(PATH_TO_CONTRACTS, `${dir}ERC20.sol`)
      : path.join(PATH_TO_CONTRACTS, `${dir}Voter.sol`);

    let output = readSolFile(pathToMainFile);
    output = output.replace(SOL_VERSION_REGEXP, compiler);
    output = output.replace(/(calldata)/g, '');

    return output;
  }

  /**
   * Sendind transaction with contract to blockchain
   * @param {object} params parameters for deploying
   * @param {array} params.deployArgs ERC20 - [Name, Symbol, Count], Project - [tokenAddress]
   * @param {string} params.bytecode bytecode of contract
   * @param {JSON} params.abi JSON interface of contract
   * @param {string} params.password password of user wallet
   * @returns {Promise} Promise of web3.sendSignedTransaction which resolves on txHash
   */
  deployContract({
    deployArgs, bytecode, abi, password,
  }) {
    const { rootStore: { Web3Service, userStore } } = this;
    const { address } = userStore;
    const maxGasPrice = 30000000000;
    const contract = Web3Service.createContractInstance(abi);
    const txData = contract.deploy({
      data: `0x${bytecode}`,
      arguments: deployArgs,
    }).encodeABI();

    const tx = {
      data: txData,
      gasLimit: 8000000,
      gasPrice: maxGasPrice,
    };

    return new Promise((resolve) => {
      Web3Service.createTxData(address, tx, maxGasPrice)
        .then((formedTx) => userStore.singTransaction(formedTx, password))
        .then((signedTx) => Web3Service.sendSignedTransaction(`0x${signedTx}`))
        .then((txHash) => resolve(txHash));
    });
  }

  /**
   * checks erc20 tokens contract on totalSupply and symbol
   * @param {string} address address of erc20 contract
   * @return {object} {totalSypply, symbol}
   */
  async checkTokens(address) {
    const { rootStore: { Web3Service }, ercAbi } = this;
    const contract = Web3Service.createContractInstance(ercAbi);
    contract.options.address = address;
    const totalSupply = await contract.methods.totalSupply().call();
    const symbol = await contract.methods.symbol().call();
    return { totalSupply, symbol };
  }

  /**
   * checks is the address of contract
   * @param {string} address address of contract
   * @return {Promise} Promise with function which resolves, if address is contract
   */
  // eslint-disable-next-line class-methods-use-this
  checkProject(address) {
    const { rootStore: { Web3Service } } = this;
    return new Promise((resolve, reject) => {
      Web3Service.web3.eth.getCode(address).then((bytecode) => {
        if (bytecode === '0x') reject();
        resolve(bytecode);
      });
    });
  }

  /**
   * calling contract method
   * @param {string} method method, which will be called
   * @param {string} from address of caller
   * @param params parameters for method
   */
  async callMethod(method, ...params) {
    const data = await this._contract.methods[method](...params).call();
    return data;
  }

  /**
   * checks count of uploaded to contract questions and total count of system questions
   * @function
   * @returns {object} {countOfUploaded, totalCount}
   */
  async checkQuestions() {
    const countOfUploaded = await this._contract.methods.getCount().call();
    const totalCount = Object.keys(this.sysQuestions).length;
    return ({ countOfUploaded, totalCount });
  }

  /**
   * send question to created contract
   * @param {number} idx id of question;
   * @return {Promise} Promise, which resolves on transaction hash
   */
  async sendQuestion(idx) {
    const {
      Web3Service, userStore,
    } = this.rootStore;
    const sysQuestion = this.sysQuestions[idx];
    // eslint-disable-next-line consistent-return
    await this.fetchQuestion(idx).then((result) => {
      if (result.caption === '') {
        const { address, password } = userStore;
        const question = new Question(sysQuestion);
        const contractAddr = this._contract.options.address;
        const params = question.getUploadingParams(contractAddr);

        const dataTx = this._contract.methods.saveNewQuestion(...params).encodeABI();

        const maxGasPrice = 30000000000;
        const rawTx = {
          to: contractAddr,
          data: dataTx,
          gasLimit: 8000000,
          value: '0x0',
        };

        return new Promise((resolve) => {
          Web3Service.createTxData(address, rawTx, maxGasPrice)
            .then((formedTx) => userStore.singTransaction(formedTx, password))
            .then((signedTx) => Web3Service.sendSignedTransaction(`0x${signedTx}`))
            .then((txHash) => resolve(txHash));
        });
      }
    });
  }

  /**
   * Fetching one question from contract
   * @param {number} id id of question
   * @returns {Object} Question data from contract
   */
  fetchQuestion(id) {
    return this.callMethod('question', [id]);
  }

  /**
   * getting one voting
   * @param {number} id id of voting
   * @param {string} from address who calls method
   */
  async fetchVoting(id) {
    return this.callMethod('getVoting', [id]);
  }

  /**
   * getting votes weights for voting
   * @param {number} id id of voting
   * @param {string} from address, who calls
   */
  async fetchVotingStats(id) {
    return this.callMethod('getVotingStats', [id]);
  }

  /**
   * Starting the voting
   * @param {id} id id of question
   * @param {string} from address, who starts
   * @param params parameters of voting
   */
  async sendVotingStart(id, from, params) {
    return (this, id, from, params);
  }

  /**
   * Finishes the voting
   */
  async sendVotingFinish() {
    return this;
  }
}

export default ContractService;
