/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as linker from 'solc/linker';
import { compile } from 'zeroone-translator';
import {
  SOL_IMPORT_REGEXP,
  SOL_VERSION_REGEXP,
} from '../../constants';
import {
  fs, PATH_TO_CONTRACTS, path,
} from '../../constants/windowModules';
import readSolFile from '../../utils/fileUtils/index';
import UserStore from '../../stores/UserStore/UserStore';

/**
 * Class for work with contracts
 */
class ContractService {
  constructor(rootStore) {
    this._contract = {};
    this.rootStore = rootStore;
    const pathToQuestions = path.join(PATH_TO_CONTRACTS, './sysQuestions.json');
    const pathToErcAbi = path.join(PATH_TO_CONTRACTS, './ERC20.abi');

    try {
      this.sysQuestions = JSON.parse(fs.readFileSync(pathToQuestions), 'utf8');
    } catch (e) {
      alert(`Error while reading file ${pathToQuestions}, please check this.`);
    }

    try {
      this.ercAbi = JSON.parse(fs.readFileSync(pathToErcAbi));
    } catch (e) {
      alert(`Error while reading file ${pathToErcAbi}, please check this.`);
    }
  }


  /**
   * sets instance of contract to this._contract
   *
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
   *
   * @param {string} type - ERC20 - if compiling ERC20 token contract, project - if project contract
   * @param {string} password password
   * @returns {object} contains type of compiled contract, his bytecode and abi for deploying
   */
  // eslint-disable-next-line class-methods-use-this
  compileContract(type, password) {
    const { rootStore: { Web3Service, userStore } } = this;
    const { address } = userStore;
    window.linker = linker;
    return new Promise((resolve, reject) => {
      let bytecode;
      let abi;

      const contract = this.combineContract(type);
      window.ipcRenderer.send('compile-request', { contract, type });
      window.ipcRenderer.once('contract-compiled', async (event, compiledContract) => {
        console.log(compiledContract);
        if (type === 'ZeroOne') {
          const { ZeroOne, ZeroOneVM } = compiledContract;
          const { evm: { bytecode: { object: libraryBytecode } } } = ZeroOneVM;
          const { evm: { bytecode: { object: ZeroOneBytecode } }, abi: ZeroOneABI } = ZeroOne;
          const libTX = { data: `0x${libraryBytecode}` };
          await Web3Service.createTxData(address, libTX)
            .then((formedTx) => userStore.singTransaction(formedTx, password))
            .then((signedTx) => Web3Service.sendSignedTransaction(`0x${signedTx}`))
            .then((txHash) => Web3Service.subscribeTxReceipt(txHash))
            .then(({ contractAddress }) => {
              console.log(`library at ${contractAddress}`);
              abi = ZeroOneABI;
              const [link] = Object.keys(linker.findLinkReferences(ZeroOneBytecode));
              bytecode = linker.linkBytecode(ZeroOneBytecode, { [link]: contractAddress });
            });
        } else if (compiledContract.abi !== '') {
          const { evm: { bytecode: { object } }, abi: contractAbi } = compiledContract;
          abi = contractAbi;
          bytecode = object;
        } else reject(new Error('Something went wrong on contract compiling'));

        fs.writeFileSync(path.join(PATH_TO_CONTRACTS, `${type}.abi`), JSON.stringify(abi, null, '\t'));
        resolve({ type, bytecode, abi });
      });
    });
  }

  /**
   * reading all imports in main contract file and importing all files in one output file
   *
   * @param {string} type type of project - ERC20 for ERC-20 tokens, Project for project contract
   * @returns {string} combined contracts
   */
  // eslint-disable-next-line class-methods-use-this
  combineContract(type) {
    let dir;
    const compiler = 'pragma solidity 0.6.1;';
    switch (type) {
      case ('ERC20'):
        dir = '../../node_modules/zeroone-contracts/contracts/__vendor__/';
        break;
      case ('CustomToken'):
        dir = '../../node_modules/zeroone-contracts/contracts/Token/';
        break;
      case ('ZeroOne'):
        dir = '../../node_modules/zeroone-contracts/contracts/ZeroOne/';
        break;
      default:
        break;
    }
    const pathToMainFile = path.join(PATH_TO_CONTRACTS, `${dir}${type}.sol`);

    const importedFiles = {};

    let output = readSolFile(pathToMainFile, importedFiles);
    output = output.replace(SOL_VERSION_REGEXP, compiler).replace((SOL_IMPORT_REGEXP), '');
    // output = output.replace(/(calldata)/g, '');

    return output;
  }

  /**
   * Sending transaction with contract to blockchain
   *
   * @param {object} params parameters for deploying
   * @param {Array} params.deployArgs ERC20 - [Name, Symbol, Count], Project - [tokenAddress]
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
    const contract = Web3Service.createContractInstance(abi);
    const data = contract.deploy({
      data: `0x${bytecode}`,
      arguments: deployArgs,
    }).encodeABI();


    const tx = {
      data,
      from: userStore.address,
      value: '0x0',
    };

    return new Promise((resolve, reject) => {
      Web3Service.createTxData(address, tx)
        .then((formedTx) => userStore.singTransaction(formedTx, password))
        .then((signedTx) => Web3Service.sendSignedTransaction(`0x${signedTx}`))
        .then((txHash) => {
          userStore.getEthBalance();
          resolve(txHash);
        })
        .catch((err) => reject(err));
    });
  }

  /**
   * checks erc20 tokens contract on totalSupply and symbol
   *
   * @param {string} address address of erc20 contract
   * @returns {object} {totalSypply, symbol}
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
   *
   * @param {string} address address of contract
   * @returns {Promise} Promise with function which resolves, if address is contract
   */
  checkProject(address) {
    const { rootStore: { Web3Service } } = this;
    return new Promise((resolve, reject) => {
      const abi = JSON.parse(fs.readFileSync(path.join(PATH_TO_CONTRACTS, './ZeroOne.abi')));
      const contract = Web3Service.createContractInstance(abi);
      contract.options.address = address;
      contract.methods.getQuestionGroupsAmount().call()
        .then((data) => resolve())
        .catch((err) => reject(err));
    });
  }

  /**
   * calling contract method
   *
   * @param {string} method method, which will be called
   * @param {any} params parameters for method
   * @returns {object} data from method
   */
  async callMethod(method, ...params) {
    const data = await this._contract.methods[method](...params).call();
    return data;
  }

  // TODO add correct js doc
  /**
   * Method create data for voting
   *
   * @returns {object} voting data
   * @param votingQuestion
   * @param votingGroupId
   * @param votingData
   */
  createVotingData(votingQuestion, votingGroupId, votingData) {
    const { rootStore: { userStore }, _contract } = this;
    const votingInfo = {
      starterGroupId: votingGroupId,
      endTime: 0,
      starterAddress: userStore.address,
      questionId: votingQuestion,
      data: votingData,
    };
    // eslint-disable-next-line max-len
    const data = {
      // eslint-disable-next-line max-len
      data: _contract.methods.startVoting(votingInfo).encodeABI(),
      from: userStore.address,
      value: '0x0',
      to: _contract.options.address,
    };
    return data;
  }

  /**
   * checks count of uploaded to contract questions and total count of system questions
   *
   * @function
   * @returns {object} {countOfUploaded, totalCount}
   */
  async checkQuestions() {
    const countOfUploaded = await this._contract.methods.getQuestionsAmount().call();
    const totalCount = Object.keys(this.sysQuestions).length;
    return ({ countOfUploaded, totalCount });
  }

  /**
   * send question to created contract
   *
   * @param {number} idx id of question;
   * @returns {Promise} Promise, which resolves on transaction hash
   */
  async sendQuestion(idx) {
    console.log(`question id = ${idx}`);
    const { _contract: contract, rootStore } = this;
    const {
      Web3Service, userStore,
    } = rootStore;
    const question = this.sysQuestions[idx];
    const owners = await contract.methods.getUserGroup(0).call();

    const { address, password } = userStore;
    const contractAddr = contract.options.address;
    question.target = contractAddr;
    question.formula = compile(question.rawFormula.replace('%s', owners.groupAddress));
    question.active = true;

    console.log(question);
    const dataTx = contract.methods.addQuestion(question).encodeABI();
    console.log(dataTx);
    const rawTx = {
      to: contractAddr,
      data: dataTx,
      value: '0x0',
    };

    return new Promise((resolve) => {
      Web3Service.createTxData(address, rawTx)
        .then((formedTx) => userStore.singTransaction(formedTx, password))
        .then((signedTx) => Web3Service.sendSignedTransaction(`0x${signedTx}`))
        .then((txHash) => Web3Service.subscribeTxReceipt(txHash))
        .then((receipt) => {
          userStore.getEthBalance();
          resolve(receipt);
        });
    });
  }

  /**
   * Fetching one question from contract
   *
   * @param {number} id id of question
   * @returns {object} Question data from contract
   */
  fetchQuestion(id) {
    return this.callMethod('getQuestion', id);
  }

  /**
   * getting one voting
   *
   * @param {number} id id of voting
   * @returns {object} Voting data
   * @deprecated
   */
  // TODO delete me after
  async fetchVoting(id) {
    return this.callMethod('getVoting', [id]);
  }


  /**
   * getting votes weights for voting
   *
   * @param {number} id id of voting
   * @returns {object} Voting stats data
   * @deprecated
   */
  // TODO delete me after
  async fetchVotingStats(id) {
    return this.callMethod('getVotingStats', [id]);
  }

  /**
   * Fetch length of usergroups in contract
   *
   * @returns {number} amount groups
   */
  fetchUserGroupsLength() {
    return this._contract.methods.getUserGroupsAmount().call();
  }

  /**
   * Starting the voting
   *
   * @param {string|number} id id of question
   * @param {string} from address, who starts
   * @param {any} params parameters of voting
   * @returns {Promise} promise
   * @deprecated
   */
  // TODO delete me after
  async sendVotingStart(id, from, params) {
    return (this, id, from, params);
  }

  /**
   * creates transaction for sending decision about voting
   *
   * @param {number} votingId  voting
   * @param {number} descision 0 - negative, 1 - positive
   * @returns {Promise} promise
   */
  // eslint-disable-next-line consistent-return
  sendVote(votingId, descision) {
    const {
      ercAbi,
      _contract,
      rootStore: {
        Web3Service,
        userStore,
        membersStore,
        projectStore: {
          historyStore,
          questionStore,
        },
      },
    } = this;
    const [voting] = historyStore.getVotingById(votingId);
    const { questionId } = voting;
    const [question] = questionStore.getQuestionById(Number(questionId));
    const { groupId } = question;
    const groupContainsUser = membersStore.isUserInGroup(Number(groupId) - 1, userStore.address);
    const data = _contract.methods.sendVote(descision).encodeABI();

    // eslint-disable-next-line consistent-return
    return new Promise((resolve, reject) => {
      if ((groupContainsUser) && (groupContainsUser.groupType === '0')) {
        this.approveErc(groupContainsUser)
          .then(() => {
            const tx = {
              from: userStore.address,
              to: _contract.options.address,
              value: '0x0',
              data,
            };
            return Web3Service.createTxData(userStore.address, tx)
              .then((formedTx) => userStore.singTransaction(formedTx, userStore.password))
              .then((signedTx) => Web3Service.sendSignedTransaction(`0x${signedTx}`))
              .then((txHash) => Web3Service.subscribeTxReceipt(txHash))
              .then((rec) => {
                historyStore.updateVotingById({
                  id: votingId,
                  newState: {
                    userVote: Number(descision),
                  },
                });
                groupContainsUser.updateUserBalance();
                userStore.getEthBalance();
                resolve(rec);
              });
          })
          .catch((err) => reject(err));
      } else if ((groupContainsUser) && (groupContainsUser.groupType !== '0')) {
        const tx = {
          from: userStore.address,
          to: _contract.options.address,
          value: '0x0',
          data,
        };
        return Web3Service.createTxData(userStore.address, tx)
          .then((formedTx) => userStore.singTransaction(formedTx, userStore.password))
          .then((signedTx) => Web3Service.sendSignedTransaction(`0x${signedTx}`))
          .then((txHash) => Web3Service.subscribeTxReceipt(txHash))
          .then((rec) => {
            historyStore.updateVotingById({
              id: votingId,
              newState: {
                userVote: Number(descision),
              },
            });
            groupContainsUser.updateUserBalance();
            userStore.getEthBalance();
            resolve(rec);
          })
          .catch((err) => reject(err));
      }
    });
  }

  closeVoting() {
    const {
      _contract,
      rootStore: {
        Web3Service,
        userStore,
      },
    } = this;

    const tx = {
      from: userStore.address,
      data: _contract.methods.closeVoting().encodeABI(),
      value: '0x0',
      to: _contract.options.address,
    };

    console.log('sending TX');

    return Web3Service.createTxData(userStore.address, tx)
      .then((formedTx) => userStore.singTransaction(formedTx, userStore.password))
      .then((signedTx) => Web3Service.sendSignedTransaction(`0x${signedTx}`))
      .then((txHash) => Web3Service.subscribeTxReceipt(txHash))
      .then(() => {
        userStore.getEthBalance();
      });
  }

  startVoting(questionId, params) {
    const {
      _contract,
      rootStore: {
        projectStore: { questionStore },
        Web3Service,
        userStore,
      },
    } = this;
    const [question] = questionStore.getQuestionById(questionId);
    const parameters = question.getParameters();
    const data = Web3Service.web3.eth.abi.encodeParameters(parameters, params);
    const votingData = (data).replace('0x', question.methodSelector);
    const tx = {
      data: _contract.methods.startNewVoting(questionId, 0, 0, votingData).encodeABI(),
      from: userStore.address,
      to: _contract.options.address,
      value: '0x0',
    };
    return Web3Service.createTxData(userStore.address, tx)
      .then((formedTx) => userStore.singTransaction(formedTx, userStore.password))
      .then((signedTx) => Web3Service.sendSignedTransaction(`0x${signedTx}`))
      .then((txHash) => Web3Service.subscribeTxReceipt(txHash))
      .then(() => {
        userStore.getEthBalance();
      });
  }

  returnTokens() {
    const {
      _contract,
      rootStore: {
        Web3Service,
        userStore,
        membersStore,
        projectStore: {
          historyStore,
          questionStore,
        },
      },
    } = this;
    const data = _contract.methods.returnTokens().encodeABI();
    const tx = {
      from: userStore.address,
      to: _contract.options.address,
      value: '0x0',
      data,
    };
    return Web3Service.createTxData(userStore.address, tx)
      .then((formedTx) => userStore.singTransaction(formedTx, userStore.password))
      .then((signedTx) => Web3Service.sendSignedTransaction(`0x${signedTx}`))
      .then((txHash) => Web3Service.subscribeTxReceipt(txHash))
      .then(async (rec) => {
        userStore.getEthBalance();
        const lastVotingId = await _contract.methods.findLastUserVoting().call();
        const [voting] = historyStore.getVotingById(Number(lastVotingId));
        const { questionId } = voting;
        const [question] = questionStore.getQuestionById(Number(questionId));
        const { groupId } = question;
        const [group] = membersStore.getMemberById(Number(groupId));
        group.updateUserBalance();
      });
  }

  /**
   * approve token transfer from user to Voter contract
   *
   * @param {object} group group instance
   */
  approveErc(group) {
    const {
      ercAbi,
      _contract,
      rootStore: {
        Web3Service,
        userStore,
      },
    } = this;
    const ercContract = Web3Service.createContractInstance(ercAbi);
    ercContract.options.address = group.wallet;
    // eslint-disable-next-line max-len
    const txData = ercContract.methods.approve(_contract.options.address, userStore.address).encodeABI();
    const tx = {
      data: txData,
      from: userStore.address,
      value: '0x0',
      to: group.wallet,
    };
    return Web3Service.createTxData(userStore.address, tx)
      .then((createdTx) => userStore.singTransaction(createdTx, userStore.password))
      .then((formedTx) => Web3Service.sendSignedTransaction(`0x${formedTx}`))
      .then((txHash) => Web3Service.subscribeTxReceipt(txHash))
      .then(() => {
        userStore.getEthBalance();
      });
  }

  /**
   * Finishes the voting
   */
  async sendVotingFinish() {
    return this;
  }
}

export default ContractService;
