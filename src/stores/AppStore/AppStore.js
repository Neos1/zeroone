import { observable, action, computed } from 'mobx';
import {
  fs, path, PATH_TO_WALLETS, ROOT_DIR,
} from '../../constants';


class AppStore {
  @observable walletList = {};

  @observable projectList = [];

  @observable masterState = 0;

  @observable masterSubState = null;

  @observable masterStates = {
    login: 0,
    createWallet: 1,
    selectProject: 2,
    createProject: 3,
    projectWithTokens: 4,
    projectWithoutTokens: 5,
    connectProject: 6,
    uploadProject: 7,
  }

  @observable masterSubStates = {
    createWallet: {
      passwordInput: 0,
      creating: 1,
      showSeed: 2,
      checkSeed: 3,
      checking: 4,
      finish: 5,
    },
    createProject: {
      withTokens: 0,
      withoutTokens: 1,
    },
    projectWithTokens: {
      inputAddress: 0,
      checkingAddress: 1,
      tokenInfo: 2,
      inputData: 3,
    },
    projectWithoutTokens: {
      createToken: 0,
      uploadToken: 1,
      alert: 2,
      inputData: 3,
    },
    connectProject: {
      inputData: 0,
      checkingProject: 1,
      alert: 2,
    },
    uploadProject: {
      compiling: 0,
      sending: 1,
      hash: 2,
      reciept: 3,
      uploadQuestions: 4,
      success: 5,
    },
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.readWalletList();
  }

  /**
   * Getting list of url's for sending this to wallet service
   * @function
   */
  @action readWalletList = () => {
    this.walletList = {};
    const files = fs.readdirSync(PATH_TO_WALLETS);
    files.forEach((file) => {
      const wallet = JSON.parse(fs.readFileSync(path.join(PATH_TO_WALLETS, file), 'utf8'));
      const walletObject = {};
      walletObject[wallet.address] = wallet;
      this.walletList = Object.assign(this.walletList, walletObject);
    });
  }

  /**
   * selecting encrypted wallet and pushing this to userStore
   * @param {string} address address of wallet
   */
  @action selectWallet = (address) => {
    const { userStore } = this.rootStore;
    const key = address.replace('0x', '');
    userStore.setEncryptedWallet(this.walletList[key]);
  }

  /**
   * Reading list of projects for displaing them in project list
   * @function
   */
  @action readProjectList = () => {
    const config = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, './config.json')));
    this.projectList = config.projects;
  }

  /**
   * Adding encrypted Wallet to userStore
   * @param {string} encryptedWallet encrypted keystore v3
   */
  @action setUserWallet = (encryptedWallet) => {
    this.userStore.setEncryptedWallet(encryptedWallet);
  }

  @action setMasterState(state, subState) {
    this.masterState = this.masterStates[state];
    this.masterSubState = subState !== undefined ? this.masterSubStates[state][subState] : 0;
  }


  @computed get wallets() {
    const wallets = Object.keys(this.walletList);
    return wallets.map((wallet) => ({ label: `0x${wallet}`, value: `0x${wallet}` }));
  }
}

export default AppStore;
