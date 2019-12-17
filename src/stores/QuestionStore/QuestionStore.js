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
  @observable pagination;

  /** List models Question */
  @observable _questions;

  @observable filter;

  constructor(rootStore) {
    this._questions = [];
    this.rootStore = rootStore;
    this.getActualQuestions();
    this.filter = new FilterStore();
    this.pagination = new PaginationStore({
      totalItemsCount: this.list.length,
      // TODO remove after full realization
      itemsCountPerPage: 2,
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
    return this.filter.filteredList(this.questions);
  }

  /**
   * Get paginated list quesiotns
   *
   * @returns {Array} paginated questions list
   */
  @computed
  get paginatedList() {
    const range = this.pagination.paginationRange;
    return this.list.slice(range[0], range[1] + 1);
  }

  @computed get options() {
    return this._questions.map((question) => ({
      value: question.id,
      label: question.caption,
    }));
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
      this.addQuestion(i, question);
    }
  }

  /**
   * Method for getting questions from contract
   * & save then to json file
   *
   * @param {string} address address project for
   * uniq folder
   */
  getQuestionsFromContract = async (address) => {
    await this.fetchQuestions();
    writeDataToFile({
      name: 'questions',
      data: {
        data: this.rawList,
      },
      basicPath: `${PATH_TO_DATA}${address}`,
    });
  }

  /**
   * Method for getting & adding questions
   * from file
   *
   * @param {string} address address project
   * @returns {object} questions object
   */
  getQuestionsFromFile = (address) => {
    const questions = readDataFromFile({
      name: 'questions',
      basicPath: `${PATH_TO_DATA}${address}`,
    });
    const questionsFromFileLength = questions.data && questions.data.length
      ? questions.data.length
      : 0;
    for (let i = 0; i < questionsFromFileLength; i += 1) {
      const question = questions.data[i];
      // For correct work {getMissingQuestions} method
      this.addQuestion(i, question);
    }
    return questions;
  }

  /**
   * Get & add questions that are not in the file,
   * but are in the contract
   *
   * @param {object} param0 data for method
   * @param {object} param0.questions question object data
   * @param {string} param0.address address project
   */
  getMissingQuestions = async ({
    questions,
    address,
  }) => {
    const firstQuestionIndex = 1;
    const { contractService } = this.rootStore;
    const { countOfUploaded } = await contractService.checkQuestions();
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
        basicPath: `${PATH_TO_DATA}${address}`,
      });
    }
  }

  /**
   * Method for getting actual question
   * from the contract & file
   */
  getActualQuestions = async () => {
    const { contractService } = this.rootStore;
    const { address } = contractService._contract.options;
    const questions = this.getQuestionsFromFile(address);
    if (!questions || !questions.data) {
      await this.getQuestionsFromContract(address);
      return;
    }
    this.getMissingQuestions({
      questions,
      address,
    });
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
    this._questions.push(new Question(id, question, web3));
  }

  /**
   * Getting question by given id
   *
   * @function
   * @param {number} id id of question
   * @returns {Array} array with lenght == 1, contains question matched by id
   */
  @action getQuestionById = (id) => this._questions.filter((question) => question.id === Number(id))
}

export default QuestionStore;
