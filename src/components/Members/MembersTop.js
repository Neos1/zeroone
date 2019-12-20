import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTranslation, Trans } from 'react-i18next';
import { PlayCircleIcon } from '../Icons';

import styles from './Members.scss';

/**
 * Component in top members page
 *
 * @returns {Node} component
 */
const MembersTop = ({
  projectName,
}) => (
  <div className={styles.members__top}>
    <Link
      className={styles['members__top-button']}
      to="/votings?modal=start_new_vote&option=2"
    >
      <span className={styles['members__top-button-icon']}>
        <PlayCircleIcon />
      </span>
      <span className={styles['members__top-button-text']}>
        <Trans
          i18nKey="other:connectOuterGroupToProject"
          values={{
            project: projectName,
          }}
        />
      </span>
    </Link>
  </div>
);

MembersTop.propTypes = {
  projectName: PropTypes.string.isRequired,
};

export default withTranslation('other')(MembersTop);
