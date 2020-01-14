/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import SimpleDropdown from '../SimpleDropdown';
import { QuestionUploadingIcon } from '../Icons';
import CreateNewQuestionForm from './CreateNewQuestionForm';
import StepIndicator from '../StepIndicator';

import styles from './CreateNewQuestion.scss';

/**
 * Component for creating a new question
 *
 * @param selected
 */
@withTranslation()
@inject('projectStore')
@observer
class CreateNewQuestion extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    projectStore: PropTypes.shape().isRequired,
  };

  constructor() {
    super();
    this.state = {
      isSelected: false,
      activeTab: 0,
      selectedGroup: 0,
    };
  }

  handleDropdownSelect = (selected) => {
    console.log(selected);
    this.setState({ isSelected: true, selectedGroup: selected.value });
  }

  /**
   * Method for toggle active tab
   *
   * @param {number} number index active tab
   */
  toggleActiveTab = (number) => {
    this.setState({ activeTab: number });
  }

  render() {
    const { isSelected, activeTab, selectedGroup } = this.state;
    const { props } = this;
    const { t, projectStore: { questionStore } } = props;
    return (
      <div className={styles['create-question']}>
        <div className={styles['create-question__top']}>
          <div className={styles['create-question__top-left']}>
            <h2 className={styles['create-question__title']}>
              {t('other:createANewQuestion')}
            </h2>
            {
              isSelected
                ? (
                  <>
                    <div className={styles['create-question__sub-title']}>
                      {t('other:basicInfo')}
                    </div>
                    <div className={styles['create-question__step-progress']}>
                      <StepIndicator
                        stepCount={2}
                        currentStep={activeTab + 1}
                      />
                    </div>
                  </>
                )
                : null
            }
          </div>
          <div className={styles['create-question__top-right']}>
            <div className={styles['create-question__dropdown']}>
              <SimpleDropdown
                options={questionStore.questionGroups}
                onSelect={this.handleDropdownSelect}
              >
                <QuestionUploadingIcon />
              </SimpleDropdown>
            </div>
            {
              isSelected
                ? (
                  <div className={styles['create-question__description']}>
                    {/* TODO change to description for selected group questions */}
                    Description text
                  </div>
                )
                : null
            }
          </div>
        </div>
        <div className={styles['create-question__content']}>
          {
            isSelected
              ? (
                <CreateNewQuestionForm
                  activeTab={activeTab}
                  selectedGroup={selectedGroup}
                  onToggle={this.toggleActiveTab}
                  onComplete={() => this.toggleActiveTab(0)}
                />
              )
              : (
                <div className={styles['create-question__content--empty']}>
                  <p className={styles['create-question__content--empty-text']}>
                    {t('other:selectQuestionGroup')}
                  </p>
                </div>
              )
          }
        </div>
      </div>
    );
  }
}

export default CreateNewQuestion;
