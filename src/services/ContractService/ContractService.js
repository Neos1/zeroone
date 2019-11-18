/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-loop-func */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import browserSolc from 'browser-solc';
import { BN } from 'ethereumjs-util';
import {
  fs, PATH_TO_CONTRACTS, path, SOL_IMPORT_REGEXP, SOL_PATH_REGEXP, SOL_VERSION_REGEXP, ROOT_DIR,
} from '../../constants';

/**
 * Class for forming transactions
 */
class ContractService {
  constructor(rootStore) {
    this._contract = {};
    this.rootStore = rootStore;
  }

  setContract(instance) {
    this._contract = instance;
  }

  /**
   * compiling contracts and returning type of compiled contract, bytecode & abi
   * @param {string} type - ERC20 - if compiling ERC20 token contract, project - if project contract
   * @returns {object} contains type of compiled contract, his bytecode and abi for deploying
   */
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

  /**
   * reading all imports in main contract file and importing all files in one output file
   * @param {string} type type of project - ERC20 for ERC-20 tokens, Project for project contract
   */
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

  /**
   * Sendind transaction with contract to blockchain
   * @param {object} params parameters for deploying
   * @param {string} params.type ERC20 if deploying ERC20 token, Project - if project contract
   * @param {array} params.deployArgs ERC20 - [Name, Symbol, Count], Project - [tokenAddress]
   * @param {string} params.bytecode bytecode of contract
   * @param {JSON} params.abi JSON interface of contract
   * @returns {Promise} Promise of web3.sendSignedTransaction which resolves on txHash
   */
  deployContract({
    type, deployArgs, bytecode, abi, password,
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

    return new Promise((resolve, reject) => {
      Web3Service.formTxData(address, tx, maxGasPrice).then((formedTx) => {
        userStore.singTransaction(formedTx, password).then((signedTx) => {
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


  async checkTokens(address) {
    const { rootStore: { Web3Service, userStore } } = this;
    const abi = JSON.parse(fs.readFileSync(path.join(PATH_TO_CONTRACTS, './ERC20.abi')));
    const contract = Web3Service.createContractInstance(abi);
    contract.options.address = address;
    const totalSupply = await contract.methods.totalSupply().call();
    const symbol = await contract.methods.symbol().call();
    return { totalSupply, symbol };
  }

  // eslint-disable-next-line class-methods-use-this
  checkProject(address) {
    const { rootStore: { Web3Service, userStore } } = this;
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

  getSystemQuestions() {
    this.sysQuestions = JSON.parse(fs.readFileSync(path.join(PATH_TO_CONTRACTS, './sysQuestions.json'), 'utf8'));
  }

  async checkQuestions() {
    this.getSystemQuestions();
    const countOfUploaded = await this._contract.methods.getCount().call();
    const totalCount = Object.keys(this.sysQuestions).length;
    return ({ countOfUploaded, totalCount });
  }

  async sendQuestion(idx) {
    const {
      Web3Service, Web3Service: { web3 }, userStore, appStore: { password },
    } = this.rootStore;
    const sysQuestion = this.sysQuestions[idx];

    // eslint-disable-next-line consistent-return
    await this.getQuestion(idx).then((result) => {
      if (result.caption === '') {
        const { address } = userStore;
        const {
          id, group, name, caption, time, method, formula, parameters,
        } = sysQuestion;

        const preparedFormula = this.convertFormula(formula);
        const params = parameters.map((param) => web3.utils.utf8ToHex(param));
        const contractAddr = this._contract.options.address;

        // eslint-disable-next-line max-len
        const dataTx = this._contract.methods.saveNewQuestion([id, group, time], 0, name, caption, contractAddr, method, preparedFormula, params).encodeABI();
        const maxGasPrice = 30000000000;
        const rawTx = {
          to: contractAddr,
          data: dataTx,
          gasLimit: 8000000,
          value: '0x0',
        };


        return new Promise((resolve, reject) => {
          Web3Service.formTxData(address, rawTx, maxGasPrice)
            .then((formedTx) => {
              userStore.singTransaction(formedTx, password)
                .then((signedTx) => {
                  Web3Service.sendSignedTransaction(`0x${signedTx}`)
                    .then((txHash) => {
                      const interval = setInterval(() => {
                        web3.eth.getTransactionReceipt(txHash).then((receipt) => {
                          // eslint-disable-next-line valid-typeof
                          if (receipt) {
                            clearInterval(interval);
                            resolve();
                          }
                        });
                      }, 5000);
                    });
                });
            });
        });
      }
    });
  }

  convertFormula(formula) {
    const FORMULA_REGEXP = new RegExp(/(group)|((?:[a-zA-Z0-9]{1,}))|((quorum|positive))|(>=|<=)|([0-9%]{1,})|(quorum|all)/g);
    const matched = formula.match(FORMULA_REGEXP);

    const convertedFormula = [];

    matched[0] === 'group' ? convertedFormula.push(0) : convertedFormula.push(1);
    matched[1] === 'Owners' ? convertedFormula.push(1) : convertedFormula.push(2);
    matched[3] === 'quorum' ? convertedFormula.push(0) : convertedFormula.push(1);
    matched[4] === '<=' ? convertedFormula.push(0) : convertedFormula.push(1);
    convertedFormula.push(Number(matched[5]));

    if (matched.length === 9) {
      matched[8] === 'quorum' ? convertedFormula.push(0) : convertedFormula.push(1);
    }
    return convertedFormula;
  }

  getQuestion(id) {
    return this._contract.methods.question(id).call();
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
