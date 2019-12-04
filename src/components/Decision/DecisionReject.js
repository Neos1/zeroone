import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Decision from './Decision';
import { RejectIcon } from '../Icons';

@withTranslation()
class DecisionReject extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { props } = this;
    const { t } = props;
    return (
      <Decision
        title={t('dialogs:definetelyReject')}
        icon={(<RejectIcon />)}
      />
    );
  }
}

export default DecisionReject;
