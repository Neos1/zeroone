import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { VerifyIcon, RejectIcon, NoQuorum } from '../Icons';

import styles from './Voting.scss';

// eslint-disable-next-line consistent-return
const Descision = ({ prosState }) => {
  switch (prosState) {
    case true:
      return (
        <div>
          <div className={styles['voting__decision-state']}>
            PROS
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
            CONS
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
            Не принято
          </div>
          <div className={styles['voting__decision-icon']}>
            <NoQuorum />
          </div>
        </div>
      );
    default:
      break;
  }
};
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
    <div className={styles['voting__decision-title']}>
      {t('other:decisionIsMade')}
    </div>
    <Descision prosState={prosState} />
  </div>
);

VotingDecision.propTypes = {
  prosState: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(VotingDecision);
