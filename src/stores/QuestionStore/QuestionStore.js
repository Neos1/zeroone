import { observable, action, computed } from 'mobx';
import Question from './entities/Question';
import { readDataFromFile, writeDataToFile } from '../../utils/fileUtils/data-manager';

/**
 * Contains methods for working
 */
class QuestionStore {
  /** List models Question */
  @observable _questions;

  /** List raw data questions (from contract) */
  @observable rawQuestions = [];

  constructor(rootStore) {
    this._questions = [];
    this.rootStore = rootStore;
    this.getActualQuestions();
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
   * Method for getting actual question
   * from the contract & file
   */
  @action getActualQuestions = async () => {
    const firstQuestionIndex = 1;
    const { contractService } = this.rootStore;
    const { countOfUploaded } = await contractService.checkQuestions();
    const questions = readDataFromFile({ name: 'questions' });
    // If there are no questions in the file, then
    // we will get them FROM THE CONTRACT
    if (!questions || !questions.data) {
      await this.fetchQuestions();
      writeDataToFile({
        name: 'questions',
        data: {
          data: this.rawQuestions,
        },
      });
      return;
    }
    const questionsFromFileLength = questions.data.length;
    const countQuestionFromContract = countOfUploaded - firstQuestionIndex;
    // Add questions FROM THE FILE
    for (let i = 0; i < questionsFromFileLength; i += 1) {
      const question = questions.data[i];
      this.rawQuestions.push(question);
      this.addQuestion(i, question);
    }
    // Add questions that are not in the file,
    // but are in the contract
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
