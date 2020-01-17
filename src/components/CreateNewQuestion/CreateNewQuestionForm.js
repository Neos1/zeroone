/* eslint-disable no-unused-vars */
/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { observer, inject } from 'mobx-react';
import CreateQuestionBasicForm from '../../stores/FormsStore/CreateQuestionBasicForm';
import CreateQuestionDynamicForm from '../../stores/FormsStore/CreateQuestionDynamicForm';
import FormBasic from './FormBasic';
import Question from '../../services/ContractService/entities/Question';
import FormDynamic from './FormDynamic';

import styles from './CreateNewQuestion.scss';

@withTranslation()
@inject('dialogStore', 'projectStore')
@observer
class CreateNewQuestionForm extends React.PureComponent {
  /** Form with basic info for new question */

  formBasic = new CreateQuestionBasicForm({
    hooks: {
      onSuccess: (form) => {
        this.onBasicSubmit(form);
        const { data: { groupId } } = this;
        console.log(groupId);
        return Promise.resolve();
      },
      onError: () => {
        console.log('error');
      },
    },
  })

  /** Form with additional info for new question */
  formDynamic = new CreateQuestionDynamicForm({
    hooks: {
      onSuccess: (form) => {
        this.onDynamicSubmit(form);
        return Promise.resolve();
      },
      onError: () => {
        console.log('error');
      },
    },
  });

  static propTypes = {
    /** Current active tab */
    activeTab: PropTypes.number.isRequired,
    /** Method called on toggle tab */
    onToggle: PropTypes.func.isRequired,
    /** Method called on success fill all data */
    onComplete: PropTypes.func.isRequired,
    dialogStore: PropTypes.shape({
      toggle: PropTypes.func.isRequired,
    }).isRequired,
    projectStore: PropTypes.shape().isRequired,
    selectedGroup: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.data = {
      name: '',
      description: '',
      groupId: '',
      time: 0,
      formula: '',
      target: '',
      methodSelector: '',
    };
  }

  /**
   * Action on basic form submit
   *
   * @param form
   */
  onBasicSubmit = (form) => {
    const { props, data } = this;
    const { selectedGroup } = props;
    const { onToggle } = props;
    const {
      question_title: Name,
      question_life_time: time,
      description,
      target,
      methodSelector,
      voting_formula: formula,
    } = form.values();
    data.name = Name.trim();
    data.time = time;
    data.formula = formula.trim();
    data.target = target.trim();
    data.description = description.trim();
    data.methodSelector = methodSelector.trim() || '0x00000000';
    data.groupId = selectedGroup;
    onToggle(1);
  }

  /**
   * Method for getting uniq key for
   * similar fields (input & select)
   *
   * @param {string} key name field
   * @returns {string} uniq key for
   * select & input
   */
  getUniqKey = (key) => {
    if (!key || !key.split) return '';
    return key.split('--')[1] || '';
  }

  /**
   * Method for getting parameters array
   * from form with dynamic fields
   *
   * @param {object} form form
   * @returns {Array} array parameters
   */
  getParametersFromForm = (form) => {
    const values = form.values();
    const parameters = [];
    Object.keys(values).forEach((key, index) => {
      if (Number.isInteger(index / 2) === false) return;
      const uniqKey = this.getUniqKey(key);
      const selectValue = values[`select--${uniqKey}`];
      const inputValue = values[`input--${uniqKey}`];
      parameters.push(inputValue, selectValue);
    });
    console.log(parameters);
    return parameters;
  }

  /**
   * Action on dynamic form submit
   *
   * @param form
   */
  onDynamicSubmit = (form) => {
    const { data } = this;
    // eslint-disable-next-line max-len
    const {
      dialogStore,
      projectStore: { questionStore, rootStore: { contractService } },
      projectStore,
      onComplete,
    } = this.props;
    const futureQuestionId = questionStore.questions.length + 1;
    const parameters = this.getParametersFromForm(form);
    const question = new Question({
      id: futureQuestionId,
      group: data.groupId,
      name: data.name,
      caption: data.description,
      time: Number(data.time),
      method: data.methodSelector,
      formula: data.formula,
      parameters,
    });
    const rawVotingData = question.getUploadingParams(data.target);
    const votingData = contractService._contract
      .methods.saveNewQuestion(...rawVotingData).encodeABI();
    projectStore.setVotingData(1, 0, votingData);
    dialogStore.toggle('password_form_questions');
    this.formBasic.clear();
    form.clear();
    onComplete();
  }

  renderStep = () => {
    const { props, formBasic, formDynamic } = this;
    const { activeTab, onToggle } = props;
    switch (activeTab) {
      case 0:
        return (
          <FormBasic formBasic={formBasic} />
        );
      case 1:
        return (
          <FormDynamic
            formDynamic={formDynamic}
            onToggle={onToggle}
          />
        );
      default:
        return (
          <FormBasic formBasic={formBasic} />
        );
    }
  }

  render() {
    return (
      <div
        className={styles['create-question__form']}
      >
        {this.renderStep()}
      </div>
    );
  }
}

export default CreateNewQuestionForm;
