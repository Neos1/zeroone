import { observable, action, computed } from 'mobx';

/**
 * Contains methods for working
 */
class QuestionStore {
  @observable questions;


  constructor() {
    this.questions = [];
  }

  /**
   * Recieving question from contract
   * @function
   */
  @action recieveQuestions = () => {

  }

  /**
   * Adding question to the list
   * @function
   * @param {object} question Question which will be added
   */
  @action addQuestion = (question) => {
    this.questions.push(question);
  }

  /**
   * Getting question by given id
   * @function
   * @param {number} id id of question
   * @returns {object} question matched by id
   */
  @action getQuestionById = (id) => this.questions.filter((question) => question.id === id)


  /**
   * Getting list of questions for displaying
   * @function
   * @returns {Array} list of all questions
   */
  @computed get questions() {

  }
}

export default QuestionStore;
