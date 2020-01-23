import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Trans } from 'react-i18next';
import Question from './Question';
import ProjectStore from '../../stores/ProjectStore';

import styles from './Questions.scss';

@inject('projectStore')
@observer
class QuestionsList extends React.Component {
  static propTypes = {
    projectStore: PropTypes.instanceOf(ProjectStore).isRequired,
  };

  @computed
  get paginatedQuestions() {
    const { props } = this;
    const {
      projectStore: { questionStore },
    } = props;
    return questionStore.paginatedList;
  }

  render() {
    const { paginatedQuestions, props } = this;
    const {
      projectStore: { historyStore },
    } = props;
    return (
      <>
        {
          paginatedQuestions
          && paginatedQuestions.length
            ? (
              paginatedQuestions.map((question) => (
                <Question
                  votingIsActive={historyStore.isVotingActive}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...question}
                  key={`question__item--${question.id}`}
                />
              ))
            )
            : (
              <div className={styles['questions__list-empty']}>
                <p>
                  <Trans
                    i18nKey="other:noQuestionsInThisGroup"
                  >
                    No questions have been
                    <br />
                    created in this group yet
                  </Trans>
                </p>
              </div>
            )
        }
      </>
    );
  }
}

export default QuestionsList;
