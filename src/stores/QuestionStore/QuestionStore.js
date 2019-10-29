import { observable, action, computed } from 'mobx';
import Question from './entities/Question';

/**
 * Contains methods for working
 */
class QuestionStore {
  @observable _questions;

  constructor(projectAddress) {
    this._questions = [];
    this.fetchQuestionsCount(projectAddress);
  }

  /**
   * Recieving questions count for fetching them from contract
   * @function
   * @param {string} address user address
   * @returns {number} count of questions
   */
  @action fetchQuestionsCount = (address) => address

  /**
   * Recieving question from contract
   * @function
   * @param {string} address user address
   */
  @action fetchQuestions = (address) => {
    this.fetchQuestionsCount(address);
    /**
     * gets the question
     */
    this.addQuestion();
  }

  /**
   * Adding question to the list
   * @function
   * @param {object} question Question which will be added
   */
  @action addQuestion = (question) => {
    this._questions.push(new Question(question));
  }

  /**
   * Getting question by given id
   * @function
   * @param {number} id id of question
   * @returns {object} question matched by id
   */
  @action getQuestionById = (id) => this._questions.filter((question) => question.id === id)


  /**
   * Getting list of questions for displaying
   * @function
   * @returns {Array} list of all questions
   */
  @computed get questions() {
    return this._questions;
  }
}

export default QuestionStore;
