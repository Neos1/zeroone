import { observable, action } from 'mobx';
import AppStore from '../AppStore';
import UserStore from '../UserStore';
import ProjectStore from '../ProjectStore';
import Web3Service from '../../services/Web3Service';
import WalletService from '../../services/WalletService';
import ContractService from '../../services/ContractService';
import EventEmitterService from '../../services/EventEmitterService';
import { fs, path, ROOT_DIR } from '../../constants/windowModules';

class RootStore {
  // stores
  @observable projectStore;

  @observable appStore;

  @observable userStore;

  @observable alertStore;

  // services
  walletService;

  contractService;

  Web3Service;

  eventEmitterService;

  constructor() {
    const configRaw = fs.readFileSync(path.join(ROOT_DIR, './config.json'), 'utf8');
    const config = JSON.parse(configRaw);
    this.Web3Service = new Web3Service(config.host, this);
    this.appStore = new AppStore(this);
    this.userStore = new UserStore(this);
    this.walletService = new WalletService();
    this.eventEmitterService = new EventEmitterService();
    this.contractService = new ContractService(this);
  }

  /**
   * initiating project
   * @param {string} address adress of project
   */
  @action initProject(address) {
    this.projectStore = new ProjectStore(address);
  }
}
// eslint-disable-next-line no-multi-assign
const rootStore = window.rootStore = new RootStore();
export default rootStore;
