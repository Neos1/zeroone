import React from 'react';
import { Trans, withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import uniqKey from 'react-id-generator';
import ProjectStore from '../../stores/ProjectStore';
import DialogStore from '../../stores/DialogStore';
import { CreateToken } from '../Icons';
import Button from '../Button/Button';
import SimpleDropdown from '../SimpleDropdown';

import styles from './Questions.scss';

@withTranslation()
@inject('projectStore', 'dialogStore')
@observer
class QuestionsHead extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    projectStore: PropTypes.instanceOf(ProjectStore).isRequired,
    dialogStore: PropTypes.instanceOf(DialogStore).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  /**
   * Method for handle sort
   *
   * @param {object} selected new sort data
   * @param {string|number} selected.value new sort value
   * @param {string} selected.label new sort label
   */
  handleSortSelect = (selected) => {
    const { projectStore } = this.props;
    const {
      questionStore: {
        addFilterRule,
      },
    } = projectStore;
    addFilterRule({ groupId: selected.value });
  }

  render() {
    const { t, projectStore, dialogStore } = this.props;
    const {
      questionStore: {
        questionGroups,
      },
      historyStore,
    } = projectStore;
    return (
      <div className={styles.questions__head}>
        <div className={styles['questions__head-create']}>
          <Button
            theme="white"
            icon={<CreateToken />}
            onClick={() => { dialogStore.show('create_group_question'); }}
            disabled={historyStore.isVotingActive}
            hint={
              historyStore.isVotingActive
                ? (
                  <Trans
                    i18nKey="other:hintFunctionalityNotAvailable"
                  >
                    During active voting, this
                    <br />
                    functionality is not available.
                  </Trans>
                )
                : null
            }
          >
            {t('buttons:createQuestionGroup')}
          </Button>
          <Button
            theme="white"
            icon={<CreateToken />}
            onClick={() => { dialogStore.show('create_question'); }}
            disabled={historyStore.isVotingActive}
            hint={
              historyStore.isVotingActive
                ? (
                  <Trans
                    i18nKey="other:hintFunctionalityNotAvailable"
                  >
                    During active voting, this
                    <br />
                    functionality is not available.
                  </Trans>
                )
                : null
            }
          >
            {t('buttons:createQuestion')}
          </Button>
        </div>
        <div className={styles['questions__head-filters']}>
          <SimpleDropdown
            options={questionGroups}
            onSelect={this.handleSortSelect}
            initIndex={this.initIndex}
            key={uniqKey()}
          />
        </div>
      </div>
    );
  }
}

export default QuestionsHead;
