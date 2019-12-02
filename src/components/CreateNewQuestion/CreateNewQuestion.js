/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Dropdown from '../Dropdown';
import { QuestionUploadingIcon } from '../Icons';
import CreateNewQuestionForm from './CreateNewQuestionForm';
// import StepProgress from '../StepProgress';

import styles from './CreateNewQuestion.scss';

/**
 * Component for creating a new question
 */
@withTranslation()
class CreateNewQuestion extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      isSelected: false,
      step: null,
      activeTab: 0,
    };
  }

  handleDropdownSelect = () => {
    this.setState({ isSelected: true });
  }

  render() {
    const { step, isSelected, activeTab } = this.state;
    const { props } = this;
    const { t } = props;
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
                      {/* <StepProgress
                        total={2}
                        current={activeTab + 1}
                      /> */}
                    </div>
                  </>
                )
                : null
            }
          </div>
          <div className={styles['create-question__top-right']}>
            <div className={styles['create-question__dropdown']}>
              <Dropdown
                options={[{
                  label: 'Вопросы дизайнеров',
                }]}
                field={{ set: () => {} }}
                onSelect={this.handleDropdownSelect}
              >
                <QuestionUploadingIcon />
              </Dropdown>
            </div>
            {
              isSelected
                ? (
                  <div className={styles['create-question__description']}>
                    {/* TODO change to description for selected group questions */}
                    Все что связано с дизайном. Вопросы по верстке решаем в отдельной группе.
                  </div>
                )
                : null
            }
          </div>
        </div>
        <div className={styles['create-question__content']}>
          {
            isSelected
              ? (<CreateNewQuestionForm activeTab={activeTab} />)
              : (
                <div className={styles['create-question__content--empty']}>
                  <p className={styles['create-question__content--empty-text']}>
                    {t('other:selectQuestionGroup')}
                  </p>
                </div>
              )
          }
          {step}
        </div>
      </div>
    );
  }
}

export default CreateNewQuestion;
