import { observable, action } from 'mobx';
import UsergroupStore from '../UsergroupStore';
import QuestionStore from '../QuestionStore';
import HistoryStore from '../HistoryStore';
import { votingStates } from '../../constants';

/**
 * Class implements whole project
 */
class ProjectStore {
  @observable projectAddress = ''

  @observable prepared = 0;

  @observable userGrops = [];

  @observable questionStore;

  @observable historyStore;

  constructor(projectAddress) {
    this.projectAddress = projectAddress;
    this.questionStore = new QuestionStore(projectAddress);
    this.historyStore = new HistoryStore(projectAddress);
    this.userGrops = this.fetchUserGroups(projectAddress);
  }

  /**
   * Starting of voting
   */
  @action startVoting() {
    this.prepared = votingStates.active;
  }

  /**
   * Preparing app for start voting
   * @param {number} questionId
   * @param {array} parameters
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
   * @param {number} projectAddress address of project
   * @return {array} list of usergroups
   */
  @action fetchUserGroups = (projectAddress) => {
    this.fetchUserGroupsLength(projectAddress);
    const data = {};
    this.userGrops.push(new UsergroupStore(data));
  }
}

export default ProjectStore;
