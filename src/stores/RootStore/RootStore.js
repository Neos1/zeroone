import { action, computed } from 'mobx';
import AppStore from '../AppStore';
import UserStore from '../UserStore';
import ProjectStore from '../ProjectStore';
import DialogStore from '../DialogStore';
import Web3Service from '../../services/Web3Service';
import WalletService from '../../services/WalletService';
import ContractService from '../../services/ContractService';
import { MembersStore } from '../MembersStore';
import { fs, path, ROOT_DIR } from '../../constants';

class RootStore {
  constructor() {
    const configRaw = fs.readFileSync(path.join(ROOT_DIR, './config.json'), 'utf8');
    const config = JSON.parse(configRaw);
    this.Web3Service = new Web3Service(config.host, this);
    this.appStore = new AppStore(this);
    this.userStore = new UserStore(this);
    this.walletService = new WalletService();
    this.contractService = new ContractService(this);
    this.dialogStore = new DialogStore();
    this.membersStore = new MembersStore([]);
  }

  /**
   * initiating project
   *
   * @param {string} address adress of project
   */
  @action initProject(address) {
    this.projectStore = new ProjectStore(address);
  }

  @computed get stores() {
    const {
      appStore,
      userStore,
      dialogStore,
      membersStore,
    } = this;
    return {
      appStore,
      userStore,
      dialogStore,
      membersStore,
    };
  }
}

const rootStore = new RootStore();
window.rootStore = rootStore;

export default rootStore;
