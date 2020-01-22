import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { inject } from 'mobx-react';
import uniqKey from 'react-id-generator';
import { Trans } from 'react-i18next';
import VotingItem from './VotingItem';
import ProjectStore from '../../stores/ProjectStore';

import styles from './Voting.scss';

/**
 * Component for render list of voting
 */
@inject('projectStore')
class VotingList extends React.Component {
  static propTypes = {
    projectStore: PropTypes.instanceOf(ProjectStore).isRequired,
  };

  @computed
  get paginatedVotings() {
    const { props } = this;
    const {
      projectStore: {
        historyStore,
      },
    } = props;
    return historyStore.paginatedList;
  }

  render() {
    const {
      paginatedVotings,
      props,
    } = this;
    const {
      projectStore: {
        historyStore: {
          votings,
        },
      },
    } = props;
    if (!votings || !votings.length) {
      return (
        <div className={styles['voting-page__list']}>
          <div className={styles['voting-page__list-empty']}>
            <p>
              <Trans
                i18nKey="other:votingListIsEmpty"
              >
                No polls created
                <br />
                They will be displayed here later
              </Trans>
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className={styles['voting-page__list']}>
        {
          paginatedVotings && paginatedVotings.length
            ? paginatedVotings.map((item) => (
              <VotingItem
                key={uniqKey()}
                index={item.id}
                title={item.caption}
                description={item.text}
                actualStatus={item.status}
                actualDecisionStatus={item.descision}
                date={{ start: Number(item.startTime), end: Number(item.endTime) }}
              />
            ))
            : (
              <div className={styles['voting-page__list-empty']}>
                <p>
                  <Trans
                    i18nKey="other:noVotingFilterMatches"
                  >
                    No voting matches
                    <br />
                    the selected filter
                  </Trans>
                </p>
              </div>
            )
        }
      </div>
    );
  }
}

export default VotingList;