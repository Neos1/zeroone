/* eslint-disable no-multi-assign */
/* eslint-disable no-multi-spaces */
import { observable, action, computed } from 'mobx';
import AppStore from '../AppStore';
import UserStore from '../UserStore';
import ProjectStore from '../ProjectStore';
import DialogStore from '../DialogStore';
import Web3Service from '../../services/Web3Service';
import WalletService from '../../services/WalletService';
import ContractService from '../../services/ContractService';
import { fs, path, ROOT_DIR } from '../../constants';

class RootStore {
  // stores
  @observable projectStore;

  @observable appStore;

  @observable userStore ;

  // services
  @observable walletService ;

  @observable contractService ;

  @observable Web3Service ;

  constructor() {
    const configRaw = fs.readFileSync(path.join(ROOT_DIR, './config.json'), 'utf8');
    const config = JSON.parse(configRaw);
    this.Web3Service = new Web3Service(config.host, this);
    this.appStore = new AppStore(this);
    this.userStore = new UserStore(this);
    this.walletService = new WalletService();
    this.contractService = new ContractService(this);
    this.dialogStore = new DialogStore();
  }

  /**
   * initiating project
   * @param {string} address adress of project
   */
  @action initProject(address) {
    this.projectStore = new ProjectStore(address);
  }


  @computed get stores() {
    const { appStore, userStore, dialogStore } = this;
    return { appStore, userStore, dialogStore };
  }
}
const rootStore = window.rootStore =  new RootStore();
export default rootStore;
