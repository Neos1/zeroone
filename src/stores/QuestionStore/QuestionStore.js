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
   */
  @action recieveQuestions = () => {

  }

  /**
   * Adding question to the list
   * @param {object} question Question which will be added
   */
  @action addQuestion = (question) => {
    this.questions.push(question);
  }

  /**
   * Getting question by given id
   * @param {number} id id of question
   */
  @action getQuestionById = (id) => this.questions.filter((question) => question.id === id)


  /**
   * Getting list of questions for displaying
   */
  @computed get questions() {

  }
}

export default QuestionStore;
