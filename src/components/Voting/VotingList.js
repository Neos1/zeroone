import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import uniqKey from 'react-id-generator';
import { Trans } from 'react-i18next';
import VotingItem from './VotingItem';
import ProjectStore from '../../stores/ProjectStore';

import styles from './Voting.scss';
import { statusStates } from '../../constants';

/**
 * Component for render list of voting
 */
@inject('projectStore')
@observer
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

  handleVotingMouseEnter = (item) => {
    const { props } = this;
    const {
      projectStore: {
        historyStore,
      },
    } = props;
    if (
      item.status === statusStates.active
      && item.newForUser === true
    ) {
      const [voting] = historyStore.getVotingById(item.id);
      if (voting) {
        voting.update({
          newForUser: false,
        });
        historyStore.writeVotingsToFile();
      }
    }
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
                newForUser={item.newForUser}
                date={{ start: Number(item.startTime), end: Number(item.endTime) }}
                onMouseEnter={() => this.handleVotingMouseEnter(item)}
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
