import { observable, action } from 'mobx';
import UsergroupStore from '../UsergroupStore';
import QuestionStore from '../QuestionStore';
import HistoryStore from '../HistoryStore';
import { votingStates } from '../../constants';
import { fs, path, PATH_TO_CONTRACTS } from '../../constants/windowModules';

/**
 * Class implements whole project
 */
class ProjectStore {
  @observable projectAddress = '';

  @observable name = '';

  @observable prepared = 0;

  @observable votingData = '';

  @observable votingQuestion = '';

  @observable votingGroupId = '';

  @observable userGrops = [];

  @observable questionStore;

  @observable historyStore;

  @observable isInitiated = true;

  timer = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
    try {
      this.projectAbi = JSON.parse(fs.readFileSync(path.join(PATH_TO_CONTRACTS, './Voter.abi')));
    } catch {
      alert(`Error occuried when trying to read ${path.join(PATH_TO_CONTRACTS, './Voter.abi')}. Please check it.`);
    }
  }

  @action init({ address, name }) {
    const { contractService, Web3Service, membersStore } = this.rootStore;
    const contract = Web3Service.createContractInstance(this.projectAbi);
    this.name = name;
    this.isInitiated = false;
    contract.options.address = address;
    contractService.setContract(contract);
    this.questionStore = new QuestionStore(this.rootStore);
    this.historyStore = new HistoryStore(this.rootStore);
    membersStore.init();
    this.timer = setInterval(() => {
      this.getInitStatus();
    }, 1000);
  }

  @action getInitStatus() {
    const { rootStore } = this;
    if (this.questionStore && this.historyStore && rootStore.membersStore) {
      const { membersStore } = rootStore;
      const { questionStore, historyStore } = this;
      this.isInitiated = !(questionStore.loading || historyStore.loading || membersStore.loading);
      if (this.isInitiated) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  }

  /**
   * Starting of voting
   */
  @action startVoting() {
    this.prepared = votingStates.active;
  }

  @action setVotingData(questionId, groupId, data) {
    this.votingQuestion = questionId;
    this.votingGroupId = groupId;
    this.votingData = data;
  }

  /**
   * Preparing app for start voting
   *
   * @param {number} questionId
   * @param {Array} parameters
   */
  @action prepareVoting(questionId, parameters) {
    /**
     * Bunch of code
     */
    this.prepared = votingStates.prepared;
    return (questionId, parameters);
  }

  /**
   * getting usergroups lentgh from contract
   */
  @action fetchUserGroupsLength = () => {
    /**
     *  get usergroups length, then
     * for 1 to length
     * this.fetchUserGroups(id)
     */
  }

  /**
   * getting usergroups from contract
   *
   * @param {number} projectAddress address of project
   */
  @action fetchUserGroups = (projectAddress) => {
    this.fetchUserGroupsLength(projectAddress);
    const data = {};
    this.userGrops.push(new UsergroupStore(data));
  }

  @action
  reset = () => {
    clearInterval(this.timer);
    this.timer = null;
    this.projectAddress = '';
    this.name = '';
    this.prepared = 0;
    this.votingData = '';
    this.votingQuestion = '';
    this.votingGroupId = '';
    this.userGrops = [];
    this.questionStore = null;
    this.historyStore = null;
  }
}

export default ProjectStore;
