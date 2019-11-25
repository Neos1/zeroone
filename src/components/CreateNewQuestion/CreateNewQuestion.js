/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Dropdown from '../Dropdown';
import { QuestionUploadingIcon } from '../Icons';

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
    };
  }

  handleSelect = () => {
    this.setState({ isSelected: true });
  }

  render() {
    const { step, isSelected } = this.state;
    const { props } = this;
    const { t } = props;
    return (
      <div className={styles['create-question']}>
        <div className={styles['create-question__top']}>
          <h2 className={styles['create-question__title']}>
            {t('other:createANewQuestion')}
          </h2>
          <div className={styles['create-question__dropdown']}>
            <Dropdown
              options={[{
                label: 'Вопросы дизайнеров',
              }]}
              field={{ set: () => {} }}
              onSelect={this.handleSelect}
            >
              <QuestionUploadingIcon />
            </Dropdown>
          </div>
        </div>
        <div className={styles['create-question__content']}>
          {
            isSelected
              ? (
                <div>some logic</div>
              )
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
