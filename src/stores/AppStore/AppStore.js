import { observable, action, computed } from 'mobx';
import {
  fs, path, PATH_TO_WALLETS, ROOT_DIR, PATH_TO_CONTRACTS,
} from '../../constants/windowModules';
import Alert from './entities/Alert';

class AppStore {
  @observable walletList = {};

  @observable balances = {};

  @observable projectList = [];

  @observable ERC = {

  };

  @observable deployArgs = [];

  @observable name = '';

  @observable alert = new Alert()

  @observable uploadedQuestion = 0;

  @observable countOfQuestions = 0;

  @observable userInProject = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.readWalletList();
  }

  /**
   * Getting list of url's for sending this to wallet service
   * @function
   */
  @action readWalletList() {
    const { Web3Service: { web3: { eth, utils } } } = this.rootStore;
    this.walletList = {};

    const files = fs.readdirSync(PATH_TO_WALLETS);
    files.forEach((file) => {
      const wallet = JSON.parse(fs.readFileSync(path.join(PATH_TO_WALLETS, file), 'utf8'));
      const walletObject = {};
      eth.getBalance(wallet.address)
        .then((balance) => { this.balances[wallet.address] = utils.fromWei(balance); });
      walletObject[wallet.address] = wallet;
      this.walletList = Object.assign(this.walletList, walletObject);
    });
  }

  /**
   * selecting encrypted wallet and pushing this to userStore
   * @param {string} address address of wallet
   */
  selectWallet = (address) => {
    const { userStore } = this.rootStore;
    const key = address.replace('0x', '');
    userStore.setEncryptedWallet(this.walletList[key]);
  }

  /**
   * Reading list of projects for displaing them in project list
   * @function
   */
  @action readProjectList() {
    const config = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, './config.json')));
    this.projectList = config.projects;
  }

  /**
   * compile contract by given type and arguments
   * @param {string} type type of contract - ERC20 for erc tokens, project - for project contract
   * @returns {Promise} Function which compiles contract and deploy contract to network on success
   */
  @action deployContract(type, deployArgs, password) {
    const { contractService } = this.rootStore;
    return new Promise(() => {
      contractService.compileContract(type)
        .then(({ bytecode, abi }) => contractService.deployContract({
          type, deployArgs, bytecode, abi, password,
        }));
    });
  }

  /**
   * checks given address on ERC20 tokens
   * @param {string} address address of ERC20 contract
   * @returns {Promise} resolves on success checking and set information about ERC token
   */
  @action checkErc(address) {
    const { contractService } = this.rootStore;
    return new Promise((resolve, reject) => {
      contractService.checkTokens(address).then((data) => {
        if (data.totalSupply) {
          this.ERC = { ...data };
          resolve(data);
        } else {
          reject();
        }
      });
    });
  }

  /**
   * checks if given address is contract in network
   * @param {string} address address, which will be ckecked on contract instance
   */
  @action checkProject(address) {
    const { contractService } = this.rootStore;
    return contractService.checkProject(address)
      .then((data) => {
        Promise.resolve(data);
      })
      .catch(() => { Promise.reject(); });
  }

  /**
   * Upload questions to created project
   * @param {string} address address of smart contract, where will be uploaded questions
   * @return Promise.resolve()
   */
  @action async deployQuestions(address) {
    const { Web3Service, contractService } = this.rootStore;
    const abi = JSON.parse(fs.readFileSync(path.join(PATH_TO_CONTRACTS, './Voter.abi'), 'utf8'));
    const contract = Web3Service.createContractInstance(abi);
    contract.options.address = address;
    contractService.setContract(contract);
    const { countOfUploaded, totalCount } = await contractService.checkQuestions();
    this.countOfQuestions = Number(totalCount);
    this.uploadedQuestion = Number(countOfUploaded);
    let idx = Number(countOfUploaded) === 0 ? 1 : Number(countOfUploaded);
    for (idx; idx <= totalCount; idx += 1) {
      // eslint-disable-next-line no-await-in-loop
      await contractService.sendQuestion(idx);
      this.uploadedQuestion += 1;
    }
    return Promise.resolve();
  }

  /**
   * add project to config and update config saved in file
   * @param {object} data data about project {name, address}
   */
  // eslint-disable-next-line class-methods-use-this
  @action addProjectToList(data) {
    const config = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, './config.json'), 'utf8'));
    config.projects.push(data);
    fs.writeFileSync(path.join(ROOT_DIR, './config.json'), JSON.stringify(config, null, '\t'));
  }

  /**
   * Check transaction receipt
   * @param {string} hash Transaction hash
   * @return {Promise} Promise with interval, which resolves on succesfull receipt recieving
   */
  @action checkReceipt(hash) {
    const { Web3Service } = this.rootStore;
    return Web3Service.subscribeTxReceipt(hash);
  }

  /**
   *
   * @param {string} text error text
   * @param {number} [timeOut=3000]  timeout when alert disappear
   */
  @action displayAlert(text, timeOut) {
    const { alert } = this;
    alert.showAlert(text, timeOut);
  }

  @action closeAlert() {
    const { alert } = this;
    alert.closeAlert();
  }


  @computed get wallets() {
    const wallets = Object.keys(this.walletList);
    return wallets.map((wallet) => ({ label: `0x${wallet}`, value: `0x${wallet}` }));
  }

  @computed get inProject() {
    return this.userInProject;
  }

  @action setProjectName(value) {
    this.name = value;
  }

  @action setDeployArgs(value) {
    this.deployArgs = value;
  }
}

export default AppStore;
