import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import { EMPTY_DATA_STRING } from '../../constants';
import renderDecisionIcon from './utils';

import styles from './Voting.scss';

const VotingInfoResult = ({
  voting: { userVote, descision },
  date,
  t,
}) => {
  const startDate = moment(date.start * 1000);
  const endDate = moment(date.end * 1000);
  return (
    <div
      className={styles['voting-info__result']}
    >
      <div
        className={styles['voting-info__result-item']}
      >
        {t('other:decisionWasMade')}
        <div>
          {renderDecisionIcon({ state: Number(descision) })}
        </div>
      </div>
      <div
        className={styles['voting-info__result-item']}
      >
        {t('other:yourDecision')}
        <div>
          {renderDecisionIcon({ state: Number(userVote) })}
        </div>
      </div>
      <div
        className={styles['voting-info__result-item']}
      >
        {t('other:totalVoted')}
        <div
          className={styles['voting-info__result-item-value']}
        >
          {/* TODO add total from stats */}
          {EMPTY_DATA_STRING}
        </div>
      </div>
      <div
        className={styles['voting-info__result-item']}
      >
        {t('other:theVoteLasted')}
        <div
          className={styles['voting-info__result-item-value']}
        >
          {endDate.from(startDate)}
        </div>
      </div>
    </div>
  );
};

VotingInfoResult.propTypes = {
  t: PropTypes.func.isRequired,
  date: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
  }).isRequired,
  voting: PropTypes.shape({
    descision: PropTypes.string.isRequired,
    userVote: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  }).isRequired,
};

export default withTranslation()(VotingInfoResult);
