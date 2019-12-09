import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import styles from './Voting.scss';
import ProgressBar from '../ProgressBar/ProgressBar';

/**
 * Component render voting decision
 * in progress state
 *
 * @param {object} param0 data for component
 * @param {number} param0.progress progress in percent
 * @param {string} param0.remained time remained
 * @returns {Node} ready component
 */
const VotingDecisionProgress = ({
  progress,
  remained,
  t,
}) => (
  <div className={styles['voting__decision--progress']}>
    <div className={styles['voting__decision-title']}>
      Voting
    </div>
    <ProgressBar progress={progress} />
    <div
      className={`
        ${styles['voting__decision-text']}
        ${styles['voting__decision-text--remained']}
      `}
    >
      {t('other:timeLeft')}
      <br />
      {`~${remained}`}
    </div>
  </div>
);

VotingDecisionProgress.propTypes = {
  progress: PropTypes.number.isRequired,
  remained: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(VotingDecisionProgress);
