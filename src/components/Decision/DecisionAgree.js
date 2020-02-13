import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Decision from './Decision';
import { VerifyIcon } from '../Icons';

@withTranslation()
class DecisionAgree extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { props } = this;
    const { t } = props;
    return (
      <Decision
        title={t('dialogs:definetelyAgree')}
        icon={(<VerifyIcon />)}
      />
    );
  }
}

export default DecisionAgree;
