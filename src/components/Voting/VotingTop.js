import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
import { PlayCircleIcon } from '../Icons';
import Button from '../Button/Button';

import styles from './Voting.scss';

/**
 * Component in top voting page
 *
 * @returns {Node} component
 */
const VotingTop = ({
  onClick,
  votingIsActive,
  t,
}) => (
  <div className={styles.voting__top}>
    <Button
      icon={(<PlayCircleIcon />)}
      theme="with-play-icon"
      onClick={onClick}
      disabled={votingIsActive}
      hint={
        votingIsActive
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
      {t('buttons:startNewVote')}
    </Button>
  </div>
);

VotingTop.propTypes = {
  onClick: PropTypes.func,
  t: PropTypes.func.isRequired,
  votingIsActive: PropTypes.bool.isRequired,
};

VotingTop.defaultProps = {
  onClick: () => {},
};

export default withTranslation('other')(VotingTop);
