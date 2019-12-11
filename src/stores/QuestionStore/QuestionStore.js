import { observable, action, computed } from 'mobx';
import Question from './entities/Question';

/**
 * Contains methods for working
 */
class QuestionStore {
  @observable _questions;

  constructor(rootStore) {
    this._questions = [];
    this.rootStore = rootStore;
    this.fetchQuestions();
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
   * Adding question to the list
   *
   * @function
   * @param id
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
