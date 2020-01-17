import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
import { VerifyIcon, RejectIcon } from '../Icons';
import Button from '../Button/Button';

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
  disabled,
}) => (
  <div
    className={styles['voting-info__buttons']}
  >
    <Button
      theme="voting-decision"
      icon={(<VerifyIcon />)}
      iconPosition="top"
      onClick={onVerifyClick}
      disabled={disabled}
      hint={
        disabled
          ? (
            <Trans
              i18nKey="other:returnTokensFirst"
            >
              Return tokens first
            </Trans>
          )
          : null
      }
    >
      {t('other:iAgree')}
    </Button>
    <Button
      theme="voting-decision"
      icon={(<RejectIcon />)}
      iconPosition="top"
      onClick={onRejectClick}
      disabled={disabled}
      hint={
        disabled
          ? (
            <Trans
              i18nKey="other:returnTokensFirst"
            >
              Return tokens first
            </Trans>
          )
          : null
      }
    >
      {t('other:iAmAgainst')}
    </Button>
  </div>
);

VotingInfoButtons.propTypes = {
  onVerifyClick: PropTypes.func.isRequired,
  onRejectClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default withTranslation()(VotingInfoButtons);
