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
}) => (
  <div className={styles.voting__top}>
    <Button
      icon={(<PlayCircleIcon />)}
      theme="with-play-icon"
      onClick={onClick}
    >
      <Trans
        i18nKey="buttons:startNewVote"
      />
    </Button>
  </div>
);

VotingTop.propTypes = {
  onClick: PropTypes.func,
};

VotingTop.defaultProps = {
  onClick: () => {},
};

export default withTranslation('other')(VotingTop);
