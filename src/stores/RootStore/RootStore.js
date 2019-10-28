import { observable, action } from 'mobx';
import AppStore from '../AppStore';
import UserStore from '../UserStore';
import ProjectStore from '../ProjectStore';
import Web3Service from '../../services/Web3Service';
import WalletService from '../../services/WalletService';
import ContractService from '../../services/ContractService';

class RootStore {
  @observable projectStore;

  @observable AppStore = new AppStore();

  @observable userStore = new UserStore()

  // services
  @observable walletService = new WalletService();

  @observable contractService = new ContractService();

  @observable Web3Service = new Web3Service();

  /**
   * initiating project
   * @param {string} address adress of project
   */
  @action initProject(address) {
    this.projectStore = new ProjectStore(address);
  }
}
export default RootStore;
