import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { VerifyIcon, RejectIcon, NoQuorum } from '../Icons';

import styles from './Voting.scss';

const Decision = ({
  prosState,
  t,
}) => {
  switch (prosState) {
    case true:
      return (
        <div>
          <div className={styles['voting__decision-state']}>
            {t('other:pros')}
          </div>
          <div className={styles['voting__decision-icon']}>
            <VerifyIcon />
          </div>
        </div>
      );
    case false:
      return (
        <div>
          <div className={styles['voting__decision-state']}>
            {t('other:cons')}
          </div>
          <div className={styles['voting__decision-icon']}>
            <RejectIcon />
          </div>
        </div>
      );
    case null:
      return (
        <div>
          <div className={styles['voting__decision-state']}>
            {t('other:notAccepted')}
          </div>
          <div className={styles['voting__decision-icon']}>
            <NoQuorum />
          </div>
        </div>
      );
    default:
      return null;
  }
};

Decision.propTypes = {
  prosState: PropTypes.oneOfType([
    PropTypes.bool,
    () => null,
  ]),
  t: PropTypes.func.isRequired,
};

Decision.defaultProps = {
  prosState: null,
};

const DecisionTranslated = withTranslation()(Decision);

/**
 * Voting decision for pros & cons state
 *
 * @param {object} param0 data for component
 * @param {boolean} param0.prosState decision is pros state
 * @returns {Node} ready component
 */
const VotingDecision = ({
  prosState,
  t,
}) => (
  <div className={styles.voting__decision}>
    {
      prosState === null
        ? (
          <div className={styles['voting__decision-title']}>
            {t('other:decision')}
          </div>
        )
        : (
          <div className={styles['voting__decision-title']}>
            {t('other:decisionIsMade')}
          </div>
        )
    }
    <DecisionTranslated prosState={prosState} />
  </div>
);

VotingDecision.propTypes = {
  prosState: PropTypes.oneOfType([
    PropTypes.bool,
    () => null,
  ]),
  t: PropTypes.func.isRequired,
};

VotingDecision.defaultProps = {
  prosState: null,
};

export default withTranslation()(VotingDecision);
