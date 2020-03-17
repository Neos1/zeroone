import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withTranslation, Trans } from 'react-i18next';
import { PlayCircleIcon } from '../Icons';
import Button from '../Button/Button';

import styles from './Members.scss';
import { systemQuestionsId } from '../../constants';

/**
 * Component in top members page
 *
 * @returns {Node} component
 */
const MembersTop = ({
  projectName,
  votingIsActive,
  history,
}) => (
  <div className={styles.members__top}>
    <Button
      icon={(<PlayCircleIcon />)}
      theme="with-play-icon"
      onClick={
        () => history.push(`/votings?modal=start_new_vote&option=${systemQuestionsId.connectGroupUsers}`)
      }
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
      <Trans
        i18nKey="other:connectOuterGroupToProject"
        values={{
          project: projectName,
        }}
      />
    </Button>
  </div>
);

MembersTop.propTypes = {
  projectName: PropTypes.string.isRequired,
  votingIsActive: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(withTranslation('other')(MembersTop));
