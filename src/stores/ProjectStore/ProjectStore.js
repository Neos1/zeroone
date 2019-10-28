import { observable, action, computed } from 'mobx';
import UsergroupStore from '../UsergroupStore';
import QuestionStore from '../QuestionStore';
import UserStore from '../UserStore';
import HistoryStore from '../HistoryStore';

/**
 * Class implements whole project
 */
class ProjectStore {
  @observable prepared = false;

  @observable userGrops = [];

  @observable questionStore = new QuestionStore();

  @observable historyStore = new HistoryStore();

  @observable userStore = new UserStore();

  /**
   * Starting of voting
   */
  @action startVoting() {
    this.prepared = false;
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
    this.prepared = true;
  }

  /**
   * getting usergroups from contract
   */
  @action getuserGroups = () => {
    const data = {};
    this.userGrops.push(new UsergroupStore(data));
  }
}

export default ProjectStore;
