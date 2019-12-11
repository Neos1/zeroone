import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
import { PlayCircleIcon } from '../Icons';

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
    <button
      type="button"
      className={styles['voting__top-button']}
      onClick={onClick}
    >
      <span className={styles['voting__top-button-icon']}>
        <PlayCircleIcon />
      </span>
      <span className={styles['voting__top-button-text']}>
        <Trans
          i18nKey="buttons:startNewVote"
        />
      </span>
    </button>
  </div>
);

VotingTop.propTypes = {
  onClick: PropTypes.func,
};

VotingTop.defaultProps = {
  onClick: () => {},
};

export default withTranslation('other')(VotingTop);
