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
  data = {
    name: '',
    description: '',
    groupId: 0,
    time: 0,
    formula: '',
    target: '',
    methodSelector: '',
  }

  formBasic = new CreateQuestionBasicForm({
    hooks: {
      onSuccess: (form) => {
        this.onBasicSubmit(form);
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
    dialogStore: PropTypes.shape({
      toggle: PropTypes.func.isRequired,
    }).isRequired,
    projectStore: PropTypes.shape().isRequired,
  };

  /**
   * Action on basic form submit
   *
   * @param form
   */
  onBasicSubmit = (form) => {
    const { props, data } = this;
    const { onToggle } = props;
    const {
      question_title: Name,
      question_life_time: time,
      description,
      target,
      methodSelector,
      voting_formula: formula,
    } = form.values();
    data.name = Name;
    data.time = time;
    data.formula = formula;
    data.target = target;
    data.description = description;
    data.methodSelector = methodSelector;
    console.log(Name, time, description, target, formula);
    onToggle(1);
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
    } = this.props;
    const values = form.values();
    const length = Object.keys(values).length / 2;
    const selectId = 'select--id';
    const inputId = 'input--id';
    const parameters = [];
    for (let i = 0; i < length; i += 1) {
      const selectValue = values[`${selectId}${i}`];
      const inputValue = values[`${inputId}${i}`];
      parameters.push(inputValue, selectValue);
    }
    const futureQuestionId = questionStore.questions.length + 1;

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
    projectStore.setVotingData(1, 0, rawVotingData);
    dialogStore.toggle('password_form');
    this.formBasic.clear();
    form.clear();
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
