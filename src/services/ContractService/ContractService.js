/* eslint-disable no-loop-func */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import browserSolc from 'browser-solc';
import { BN } from 'ethereumjs-util';
import {
  fs, PATH_TO_CONTRACTS, path, SOL_IMPORT_REGEXP, SOL_PATH_REGEXP, SOL_VERSION_REGEXP,
} from '../../constants';

/**
 * Class for forming transactions
 */
class ContractService {
  constructor(rootStore) {
    this._contract = {};
    this.rootStore = rootStore;
  }

  set contract(instance) {
    this._contract = instance;
  }

  compileContract(type) {
    this.combineContract(type);
    return new Promise((resolve, reject) => {
      window.BrowserSolc.getVersions((sources, releases) => {
        const version = releases['0.4.24'];
        const questions = fs.readFileSync(path.join(PATH_TO_CONTRACTS, './sysQuestions.json'), 'utf8');
        const contract = type === 'ERC20'
          ? fs.readFileSync(path.join(PATH_TO_CONTRACTS, './output.sol'), 'utf8')
          : fs.readFileSync(path.join(PATH_TO_CONTRACTS, './Voter/output.sol'), 'utf8');
        const contractName = type === 'ERC20'
          ? ':ERC20'
          : ':Voter';
        console.info(`Компилятор ${version} загружается, подождите...`);
        window.BrowserSolc.loadVersion(version, (compiler) => {
          console.info(`Компилятор ${version} загружен, компиляция...`);
          const compiledContract = compiler.compile(contract);
          const contractData = compiledContract.contracts[contractName];
          if (contractData.interface !== '') {
            const { bytecode, metadata } = contractData;
            const { output: { abi } } = JSON.parse(metadata);
            resolve({ type, bytecode, abi });
          } else reject();
        });
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  combineContract(type) {
    let imports;
    const files = {};
    const dir = type === 'ERC20' ? './' : './Voter/';
    const compiler = 'pragma solidity ^0.4.24;';
    let mainContract = type === 'ERC20'
      ? fs.readFileSync(path.join(PATH_TO_CONTRACTS, `${dir}ERC20.sol`), 'utf8')
      : fs.readFileSync(path.join(PATH_TO_CONTRACTS, `${dir}Voter.sol`), 'utf8');

    while (mainContract.match(SOL_IMPORT_REGEXP)) {
      imports = mainContract.match(SOL_PATH_REGEXP);
      imports.forEach((name) => {
        let file = name;
        file = file.replace(new RegExp(/(\'|\")/g), '');
        const absolutePath = path.join(PATH_TO_CONTRACTS, `${dir}${file}`);

        if (!files[absolutePath]) {
          let addSol = fs.readFileSync(absolutePath, 'utf8');
          addSol = addSol.replace(addSol.match(SOL_VERSION_REGEXP), '');
          mainContract = mainContract.replace(mainContract.match(SOL_IMPORT_REGEXP)[0], addSol);
          files[absolutePath] = true;
        } else {
          mainContract = mainContract.replace(mainContract.match(SOL_IMPORT_REGEXP)[0], '');
        }
      });
    }
    mainContract = mainContract.replace(SOL_VERSION_REGEXP, compiler);
    mainContract = mainContract.replace(new RegExp(/(calldata)/g), '');
    fs.writeFileSync(path.join(PATH_TO_CONTRACTS, `${dir}output.sol`), mainContract, 'utf8');
  }

  deployContract({
    type, deployArgs, bytecode, abi,
  }) {
    const { rootStore: { Web3Service, userStore } } = this;
    const { address } = userStore;
    const maxGasPrice = 10000000000;
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

    return new Promise((resolve, reject) => {
      Web3Service.formTxData(address, tx, maxGasPrice).then((formedTx) => {
        userStore.singTransaction(formedTx, 'T3sting!').then((signedTx) => {
          Web3Service.sendSignedTransaction(`0x${signedTx}`).then((txHash) => {
            resolve(txHash);
          });
        });
      });
    });
  }

  /**
   * Creates transaction
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
   * @param params parameters for method
   */
  async callMethod(method, from, ...params) {
    const data = await this.contract.methods[method](...params).call({ from });
    return data;
  }

  /**
   * getting one question
   * @param {number} id id of question
   * @param {string} from address who calls method
   */
  async fetchQuestion(id, from) {
    const data = await this.contract.methods.getQuestion(id).call({ from });
    return data;
  }

  /**
   * getting one voting
   * @param {number} id id of voting
   * @param {string} from address who calls method
   */
  async fetchVoting(id, from) {
    const data = await this.contract.methods.getVoting(id).call({ from });
    return data;
  }

  /**
   * getting votes weights for voting
   * @param {number} id id of voting
   * @param {string} from address, who calls
   */
  async fetchVotingStats(id, from) {
    const data = await this.contract.methods.getVotingStats(id).call({ from });
    return data;
  }

  /**
   * Starting the voting
   * @param {id} id id of question
   * @param {string} from address, who starts
   * @param params parameters of voting
   */
  async startVoting(id, from, params) {
    return (this, id, from, params);
  }

  /**
   * Finishes the voting
   */
  async finishVoting() {
    return this;
  }
}

export default ContractService;
