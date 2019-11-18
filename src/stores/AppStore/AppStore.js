import { observable, action, computed } from 'mobx';
import {
  fs, path, PATH_TO_WALLETS, ROOT_DIR, PATH_TO_CONTRACTS,
} from '../../constants';


class AppStore {
  @observable walletList = {};

  @observable balances = {};

  @observable projectList = [];

  @observable ERC = {

  };

  @observable deployArgs = [];

  @observable name = '';

  @observable password='';

  @observable alertVisible = false;

  @observable alertText = '';

  @observable alertTimeout = '';

  @observable uploadedQuestion = 0;

  @observable countOfQuestions = 0;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.readWalletList();
  }

  /**
   * Getting list of url's for sending this to wallet service
   * @function
   */
  @action readWalletList() {
    const { Web3Service: { web3: { eth } } } = this.rootStore;
    this.walletList = {};

    const files = fs.readdirSync(PATH_TO_WALLETS);
    files.forEach((file) => {
      const wallet = JSON.parse(fs.readFileSync(path.join(PATH_TO_WALLETS, file), 'utf8'));
      const walletObject = {};
      eth.getBalance(wallet.address)
        .then((balance) => { this.balances[wallet.address] = balance; });
      walletObject[wallet.address] = wallet;
      this.walletList = Object.assign(this.walletList, walletObject);
    });
  }

  /**
   * selecting encrypted wallet and pushing this to userStore
   * @param {string} address address of wallet
   */
  @action selectWallet(address) {
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
   * Adding encrypted Wallet to userStore
   * @param {string} encryptedWallet encrypted keystore v3
   */
  @action setUserWallet(encryptedWallet) {
    this.userStore.setEncryptedWallet(encryptedWallet);
  }

  @action deployContract(type, deployArgs, password) {
    const { contractService } = this.rootStore;
    return new Promise((resolve) => {
      contractService.compileContract(type).then(({ bytecode, abi }) => {
        resolve(contractService.deployContract({
          type, deployArgs, bytecode, abi, password,
        }));
      });
    });
  }

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

  @action checkProject(address) {
    const { contractService } = this.rootStore;
    return new Promise((resolve, reject) => {
      contractService.checkProject(address)
        .then((data) => {
          resolve(data);
        })
        .catch(() => { reject(); });
    });
  }

  @action async deployQuestions(address) {
    const { Web3Service, contractService } = this.rootStore;
    const abi = JSON.parse(fs.readFileSync(path.join(PATH_TO_CONTRACTS, './Voter.abi'), 'utf8'));
    const contract = Web3Service.createContractInstance(abi);
    contract.options.address = address;
    contractService.setContract(contract);
    const { countOfUploaded, totalCount } = await contractService.checkQuestions();
    this.countOfQuestions = Number(totalCount);
    this.uploadedQuestion = Number(countOfUploaded);
    // eslint-disable-next-line no-console
    let idx = Number(countOfUploaded) === 0 ? 1 : Number(countOfUploaded);
    // eslint-disable-next-line no-async-promise-executor
    for (idx; idx <= totalCount; idx += 1) {
      // eslint-disable-next-line no-await-in-loop
      await contractService.sendQuestion(idx);
      this.uploadedQuestion += 1;
    }
    Promise.resolve();
  }

  // eslint-disable-next-line class-methods-use-this
  @action addProjectToList(data) {
    const config = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, './config.json'), 'utf8'));
    config.projects.push(data);
    fs.writeFileSync(path.join(ROOT_DIR, './config.json'), JSON.stringify(config, null, '\t'));
  }

  @action checkReceipt(hash) {
    const { Web3Service: { web3 } } = this.rootStore;
    return web3.eth.getTransactionReceipt(hash);
  }

  @action displayAlert(text, timeOut) {
    this.alertVisible = true;
    this.alertText = text;
    if (typeof this.alertTimeout === 'number') {
      clearTimeout(this.alertTimeout);
    }
    this.alertTimeout = setTimeout(() => {
      this.alertVisible = false;
    }, timeOut);
  }

  @action closeAlert() {
    this.alertVisible = false;
  }

  @computed get wallets() {
    const wallets = Object.keys(this.walletList);
    return wallets.map((wallet) => ({ label: `0x${wallet}`, value: `0x${wallet}` }));
  }
}

export default AppStore;
