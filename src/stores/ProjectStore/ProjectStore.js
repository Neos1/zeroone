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
  @observable projectAddress = ''

  @observable prepared = 0;

  @observable votingData = '';

  @observable votingQuestion = '';

  @observable votingGroupId = '';


  @observable userGrops = [];

  @observable questionStore;

  @observable historyStore;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.projectAbi = JSON.parse(fs.readFileSync(path.join(PATH_TO_CONTRACTS, './Voter.abi')));
  }

  @action init(projectAddress) {
    const { contractService, Web3Service } = this.rootStore;
    const contract = Web3Service.createContractInstance(this.projectAbi);
    contract.options.address = projectAddress;
    contractService.setContract(contract);
    this.questionStore = new QuestionStore(this.rootStore);
    this.historyStore = new HistoryStore(this.rootStore);
    // this.userGrops = this.fetchUserGroups(projectAddress);
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
}

export default ProjectStore;
