import { observable, action, computed } from 'mobx';
import Question from './entities/Question';
import { readDataFromFile, writeDataToFile } from '../../utils/fileUtils/data-manager';
import { PATH_TO_DATA } from '../../constants/windowModules';
import FilterStore from '../FilterStore/FilterStore';
import PaginationStore from '../PaginationStore';
import AsyncInterval from '../../utils/AsyncUtils';

/**
 * Contains methods for working
 */
class QuestionStore {
  @observable pagination;

  /** List models Question */
  @observable _questions;

  @observable _questionGroups;

  @observable loading = true;

  @observable filter;

  constructor(rootStore) {
    this._questions = [];
    this._questionGroups = [];
    this.rootStore = rootStore;
    const { configStore: { UPDATE_INTERVAL } } = rootStore;
    this.loading = true;
    this.filter = new FilterStore();
    this.interval = new AsyncInterval({
      cb: async () => {
        await this.getActualState(() => {
          this.pagination = new PaginationStore({
            totalItemsCount: this.list.length,
          });
        });
      },
      timeoutInterval: UPDATE_INTERVAL,
    });
  }

  /**
   * Getting list of questions for displaying
   *
   * @function
   * @returns {Array} list of all questions
   */
  @computed get questions() {
    return this._questions;
  }

  /**
   * Get raw questions list
   *
   * @returns {Array} raw questions list
   */
  get rawList() {
    return this._questions.map((question) => ({
      ...question.raw,
    }));
  }

  /**
   * Get list questions
   *
   * @returns {Array} filtered by rules
   * questions list
   */
  @computed
  get list() {
    return this.filter.filteredList(this._questions);
  }

  /**
   * Get paginated list questions
   *
   * @returns {Array} paginated questions list
   */
  @computed
  get paginatedList() {
    let range;
    if (!this.pagination || !this.pagination.paginationRange) {
      range = [0, 5];
    } else {
      range = this.pagination.paginationRange;
    }
    return this.list.slice(range[0], range[1] + 1);
  }

  @computed get options() {
    return this._questions.reduce((acc, question) => ([
      ...acc,
      {
        value: question.id,
        label: question.caption,
      },
    ]), [{
      value: '*',
      label: 'All',
    }]);
  }

  @computed get newVotingOptions() {
    return this._questions.map((question) => (
      {
        value: question.id,
        label: question.caption,
      }
    ));
  }

  @computed get questionGroups() {
    return this._questionGroups.reduce((acc, group) => ([
      ...acc,
      {
        value: group.groupId,
        label: group.name,
      },
    ]), [{
      value: '*',
      label: 'All',
    }]);
  }

  @computed get questionGroupsForVoting() {
    return this._questionGroups.map((group) => (
      {
        value: group.groupId,
        label: group.name,
      }));
  }

  /**
   * Method for getting actual state for
   * this store.
   *
   * @param {Function} cb callback function
   */
  @action
  async getActualState(cb) {
    await this.getActualQuestions();
    await this.fetchActualQuestionGroups();
    this.loading = false;
    console.log('only after questions');
    if (cb) cb();
  }

  @action
  async fetchActualQuestionGroups() {
    const { contractService } = this.rootStore;
    const localGroupsLength = this._questionGroups.length;
    const contractGroupsLength = await contractService.callMethod('getQuestionGroupsLength');
    if (localGroupsLength < contractGroupsLength) {
      for (let i = localGroupsLength + 1; i < contractGroupsLength; i += 1) {
      // eslint-disable-next-line no-await-in-loop
        const element = await contractService.callMethod('getQuestionGroup', i);
        element.groupId = i;
        this._questionGroups[i - 1] = element;
      }
    }
  }

  /**
   * fetching questions from smart contract
   *
   * @function
   */
  @action
  async fetchQuestions() {
    const { contractService } = this.rootStore;
    const { countOfUploaded } = await contractService.checkQuestions();
    for (let i = 1; i < countOfUploaded; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const question = await contractService.fetchQuestion(i);
      question.groupId = Number(question.groupId);
      this.addQuestion(i, question);
    }
  }

  /**
   * Method for getting questions from contract
   * & save then to json file
   */
  async getQuestionsFromContract() {
    await this.fetchQuestions();
    this.writeQuestionsToFile();
  }

  /**
   * Method for getting & adding questions from file
   * without duplicated item
   *
   * @returns {Array} correct array of questions
   */
  async getQuestionsFromFile() {
    const { contractService, userStore } = this.rootStore;
    const userAddress = userStore.address;
    const projectAddress = contractService._contract.options.address;
    const questions = [];
    try {
      const questionsFromFile = await readDataFromFile({
        name: 'questions',
        basicPath: `${PATH_TO_DATA}${userAddress}\\${projectAddress}`,
      });
      const questionsFromFileLength = questionsFromFile.data && questionsFromFile.data.length
        ? questionsFromFile.data.length
        : 0;
      for (let i = 0; i < questionsFromFileLength; i += 1) {
        const question = questionsFromFile.data[i];
        if (question) {
          const duplicateVoting = questions.find((item) => item.caption === question.caption);
          if (!duplicateVoting) questions.push(question);
        }
      }
    } catch {
      return questions;
    }
    return questions;
  }

  /**
   * Get & add questions that are not in the file,
   * but are in the contract
   *
   * @param {Array} questions array of questions
   */
  async getMissingQuestions(questions) {
    const firstQuestionIndex = 1;
    const { contractService } = this.rootStore;
    const { countOfUploaded } = await contractService.checkQuestions();
    const questionsFromFileLength = questions.length;
    const countQuestionFromContract = countOfUploaded - firstQuestionIndex;
    if (countQuestionFromContract > questionsFromFileLength) {
      this.getQuestionsFromContract();
    }
  }

  /** Write raw voting list data to file */
  writeQuestionsToFile() {
    const { contractService, userStore } = this.rootStore;
    const userAddress = userStore.address;
    const projectAddress = contractService._contract.options.address;
    writeDataToFile({
      name: 'questions',
      data: {
        data: this.rawList,
      },
      basicPath: `${PATH_TO_DATA}${userAddress}\\${projectAddress}`,
    });
  }

  /**
   * Method for getting actual question
   * from the contract & file
   */
  async getActualQuestions() {
    const questions = await this.getQuestionsFromFile();
    this.writeQuestionsListToState(questions);
    if (!questions || !questions.length) {
      await this.getQuestionsFromContract();
      return;
    }
    await this.getMissingQuestions(questions);
  }

  /**
   * Method for write questions list to
   * this state
   *
   * @param {Array} questionsList questions list
   */
  writeQuestionsListToState(questionsList) {
    const questionsListLength = questionsList.length;
    for (let i = 0; i < questionsListLength; i += 1) {
      const question = questionsList[i];
      this.addQuestion(i + 1, question);
    }
  }

  /**
   * Add new filter rule
   *
   * @param {object} rule object with rules
   */
  addFilterRule = (rule) => {
    this.filter.addFilterRule(rule);
    if (this.pagination) {
      this.pagination.update({
        activePage: 1,
        totalItemsCount: this.list.length,
      });
    }
  }

  /**
   * Method for reset filter
   * & update pagination
   */
  resetFilter = () => {
    this.filter.reset();
    if (this.pagination) {
      this.pagination.update({
        activePage: 1,
        totalItemsCount: this.list.length,
      });
    }
  }

  /**
   * Adding question to the list
   *
   * @function
   * @param {number} id id question
   * @param {object} question Question which will be added
   */
  @action addQuestion = (id, question) => {
    const { Web3Service: { web3 } } = this.rootStore;
    const duplicatedQuestion = this._questions.find((item) => item.caption === question.caption);
    if (!duplicatedQuestion) this._questions.push(new Question(id, question, web3));
  }

  /**
   * Getting question by given id
   *
   * @function
   * @param {number} id id of question
   * @returns {Array} array with lenght == 1, contains question matched by id
   */
  @action getQuestionById = (id) => this._questions.filter((question) => question.id === Number(id))

  @action reset = () => {
    this._questions = [];
    this._questionGroups = [];
    this.interval.cancel();
  }
}

export default QuestionStore;
