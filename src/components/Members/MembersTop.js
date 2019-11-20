import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
import { PlayCircleIcon } from '../Icons';

import styles from './Members.scss';

/**
 * Component in top members page
 *
 * @returns {Node} component
 */
const MembersTop = ({
  onClick,
}) => (
  <div className={styles.members__top}>
    <button
      type="button"
      className={styles['members__top-button']}
      onClick={onClick}
    >
      <span className={styles['members__top-button-icon']}>
        <PlayCircleIcon />
      </span>
      <span className={styles['members__top-button-text']}>
        <Trans
          i18nKey="other:connectOuterGroupToProject"
          values={{
            project: 'test project',
          }}
        />
      </span>
    </button>
  </div>
);

MembersTop.propTypes = {
  onClick: PropTypes.func,
};

MembersTop.defaultProps = {
  onClick: () => {},
};

export default withTranslation('other')(MembersTop);
