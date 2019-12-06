/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import CreateQuestionBasicForm from '../../stores/FormsStore/CreateQuestionBasicForm';
import CreateQuestionDynamicForm from '../../stores/FormsStore/CreateQuestionDynamicForm';
import FormBasic from './FormBasic';
import FormDynamic from './FormDynamic';

import styles from './CreateNewQuestion.scss';

@withTranslation()
@observer
class CreateNewQuestionForm extends React.PureComponent {
  /** Form with basic info for new question */
  formBasic = new CreateQuestionBasicForm({
    hooks: {
      onSuccess: () => {
        this.onBasicSubmit();
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
      onSuccess: () => {
        this.onDynamicSubmit();
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
  };

  /** Action on basic form submit */
  onBasicSubmit = () => {
    const { props } = this;
    const { onToggle } = props;
    onToggle(1);
  }

  /** Action on dynamic form submit */
  onDynamicSubmit = () => {
    console.log('dynamic submit');
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
