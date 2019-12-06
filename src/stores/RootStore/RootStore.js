import { action } from 'mobx';
import AppStore from '../AppStore';
import UserStore from '../UserStore';
import ProjectStore from '../ProjectStore';
import DialogStore from '../DialogStore';
import Web3Service from '../../services/Web3Service';
import WalletService from '../../services/WalletService';
import ContractService from '../../services/ContractService';
import { MembersStore } from '../MembersStore';
import EventEmitterService from '../../services/EventEmitterService';
import { fs, path, ROOT_DIR } from '../../constants/windowModules';

class RootStore {
  // stores
  projectStore;

  appStore;

  userStore;

  dialogStore;

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
    this.projectStore = new ProjectStore(this);
    this.walletService = new WalletService();
    this.eventEmitterService = new EventEmitterService();
    this.contractService = new ContractService(this);
    this.dialogStore = new DialogStore();
    this.membersStore = new MembersStore([], this);
  }

  /**
   * initiating project
   *
   * @param {string} address adress of project
   */
  @action async initProject(address) {
    this.projectStore.init(address);
  }
}

// eslint-disable-next-line no-multi-assign
const rootStore = window.rootStore = new RootStore();
export default rootStore;
