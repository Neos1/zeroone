import { observable, action, computed } from 'mobx';
import Question from './entities/Question';
import { readDataFromFile, writeDataToFile } from '../../utils/fileUtils/data-manager';
import { PATH_TO_DATA } from '../../constants/windowModules';
import FilterStore from '../FilterStore/FilterStore';
import PaginationStore from '../PaginationStore';

/**
 * Contains methods for working
 */
class QuestionStore {
  interval = '';

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
    this.fetchActualQuestionGroups();
    this.getActualQuestions();
    this.filter = new FilterStore();
    this.pagination = new PaginationStore({
      totalItemsCount: this.list.length,
    });
    this.interval = setInterval(() => {
      this.getActualQuestions();
      this.fetchActualQuestionGroups();
    }, UPDATE_INTERVAL);
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
    const range = this.pagination.paginationRange;
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

  @action
  fetchQuestionGroups = async () => {
    const { contractService } = this.rootStore;
    const length = await contractService.callMethod('getQuestionGroupsLength');
    for (let index = 1; index < length; index += 1) {
      // eslint-disable-next-line no-await-in-loop
      const element = await contractService.callMethod('getQuestionGroup', index);
      element.groupId = index;
      this._questionGroups.push(element);
    }
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
  @action fetchQuestions = async () => {
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
   *
   * uniq folder
   */
  getQuestionsFromContract = async () => {
    const { contractService, userStore } = this.rootStore;
    const userAddress = userStore.address;
    const projectAddress = contractService._contract.options.address;
    await this.fetchQuestions();
    writeDataToFile({
      name: 'questions',
      data: {
        data: this.rawList,
      },
      basicPath: `${PATH_TO_DATA}${userAddress}\\${projectAddress}`,
    });
  }

  /**
   * Method for getting & adding questions
   * from file
   *
   * @returns {object} questions object
   */
  getQuestionsFromFile = () => {
    const { contractService, userStore } = this.rootStore;
    const userAddress = userStore.address;
    const projectAddress = contractService._contract.options.address;
    let questions;
    try {
      questions = readDataFromFile({
        name: 'questions',
        basicPath: `${PATH_TO_DATA}${userAddress}\\${projectAddress}`,
      });
    } catch {
      questions = [];
    }
    const questionsFromFileLength = questions.data && questions.data.length
      ? questions.data.length
      : 0;
    for (let i = 0; i < questionsFromFileLength; i += 1) {
      const question = questions.data[i];
      // For correct work {getMissingQuestions} method
      this.addQuestion(i + 1, question);
    }
    return questions;
  }

  /**
   * Get & add questions that are not in the file,
   * but are in the contract
   *
   * @param {object} param0 data for method
   * @param {object} param0.questions question object data
   */
  getMissingQuestions = async ({
    questions,
  }) => {
    const firstQuestionIndex = 1;
    const { contractService, userStore } = this.rootStore;
    const { countOfUploaded } = await contractService.checkQuestions();
    const userAddress = userStore.address;
    const projectAddress = contractService._contract.options.address;
    const questionsFromFileLength = questions.data.length;
    const countQuestionFromContract = countOfUploaded - firstQuestionIndex;
    if (countQuestionFromContract > questionsFromFileLength) {
      for (let i = questionsFromFileLength + firstQuestionIndex; i < countOfUploaded; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const question = await contractService.fetchQuestion(i);
        this.addQuestion(i, question);
      }
      writeDataToFile({
        name: 'questions',
        data: {
          data: this.rawList,
        },
        basicPath: `${PATH_TO_DATA}${userAddress}\\${projectAddress}`,
      });
    }
  }

  /**
   * Method for getting actual question
   * from the contract & file
   */
  getActualQuestions = async () => {
    this.loading = true;
    const questions = this.getQuestionsFromFile();
    if (!questions || !questions.data) {
      await this.getQuestionsFromContract();
      this.loading = false;
      return;
    }
    await this.getMissingQuestions({
      questions,
    });
    this.loading = false;
  }

  /**
   * Add new filter rule
   *
   * @param {object} rule object with rules
   */
  addFilterRule = (rule) => {
    this.filter.addFilterRule(rule);
    this.pagination.update({
      activePage: 1,
      totalItemsCount: this.list.length,
    });
  }

  /**
   * Method for reset filter
   * & update pagination
   */
  resetFilter = () => {
    this.filter.reset();
    this.pagination.update({
      activePage: 1,
      totalItemsCount: this.list.length,
    });
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
    const duplicatedQuestion = this._questions.find((item) => item.id === id);
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
    this.interval = '';
    clearInterval(this.interval);
  }
}

export default QuestionStore;
