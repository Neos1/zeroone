import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { userVotingStates } from '../../constants';
import renderDecisionIcon from './utils';

import styles from './Voting.scss';

/**
 * Component for render user decision
 *
 * @returns {Node} user decision Node element
 */
const VotingInfoUserDecision = ({
  voting: { userVote },
  t,
}) => {
  switch (userVote) {
    case userVotingStates.decisionFor:
      return (
        <div className={styles['voting-info__decision']}>
          <div className={styles['voting-info__decision-text']}>
            {t('other:youVoted')}
          </div>
          {renderDecisionIcon({ state: userVotingStates.decisionFor })}
        </div>
      );
    case userVotingStates.decisionAgainst:
      return (
        <div className={styles['voting-info__decision']}>
          <div className={styles['voting-info__decision-text']}>
            {t('other:youVoted')}
          </div>
          {renderDecisionIcon({ state: userVotingStates.decisionAgainst })}
        </div>
      );
    default:
      return null;
  }
};

VotingInfoUserDecision.propTypes = {
  t: PropTypes.func.isRequired,
  voting: PropTypes.shape({
    userVote: PropTypes.number.isRequired,
  }).isRequired,
};

export default withTranslation()(VotingInfoUserDecision);
