import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { VerifyIcon, RejectIcon } from '../Icons';

import styles from './Voting.scss';

/**
 * Component for render decision buttons
 *
 * @returns {Node} element with decision buttons
 */
const VotingInfoButtons = ({
  onVerifyClick,
  onRejectClick,
  t,
}) => (
  <div
    className={styles['voting-info__buttons']}
  >
    <button
      type="button"
      onClick={onVerifyClick}
    >
      <div
        className={styles['voting-info__button-icon']}
      >
        <VerifyIcon />
      </div>
      {t('other:iAgree')}
    </button>
    <button
      type="button"
      onClick={onRejectClick}
    >
      <div
        className={styles['voting-info__button-icon']}
      >
        <RejectIcon />
      </div>
      {t('other:iAmAgainst')}
    </button>
  </div>
);

VotingInfoButtons.propTypes = {
  onVerifyClick: PropTypes.func.isRequired,
  onRejectClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(VotingInfoButtons);
