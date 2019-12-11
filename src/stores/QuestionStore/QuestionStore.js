import { observable, action, computed } from 'mobx';
import Question from './entities/Question';
import { readDataFromFile, writeDataToFile } from '../../utils/fileUtils/data-manager';
import { PATH_TO_DATA } from '../../constants/windowModules';
import DataManagerStore from '../DataManagerStore/DataManagerStore';

/**
 * Contains methods for working
 */
class QuestionStore {
  @observable dataManager;

  @observable pagination;

  /** List models Question */
  @observable _questions;

  /** List raw data questions (from contract) */
  @observable rawQuestions = [];

  constructor(rootStore) {
    this._questions = [];
    this.rootStore = rootStore;
    this.getActualQuestions();
    this.dataManager = new DataManagerStore({
      list: this.questions,
      // TODO remove after full realization
      itemsCountPerPage: 1,
    });
    this.pagination = this.dataManager.pagination;
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
      this.rawQuestions.push(question);
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
        data: this.rawQuestions,
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
      this.rawQuestions.push(question);
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
        this.rawQuestions.push(question);
        this.addQuestion(i, question);
      }
      writeDataToFile({
        name: 'questions',
        data: {
          data: this.rawQuestions,
        },
        basicPath: `${PATH_TO_DATA}${address}`,
      });
    }
  }

  /**
   * Method for getting actual question
   * from the contract & file
   */
  @action getActualQuestions = async () => {
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

  /**
   * Getting list of questions for displaying
   *
   * @function
   * @returns {Array} list of all questions
   */
  @computed get questions() {
    return this._questions;
  }

  @computed get options() {
    return this._questions.map((question) => ({
      value: question.id,
      label: question.caption,
    }));
  }
}

export default QuestionStore;
