import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import Decision from './Decision';
import { VerifyIcon } from '../Icons';

@withTranslation()
@inject('dialogStore')
@observer
class DecisionAgree extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    form: PropTypes.shape().isRequired,
  };

  render() {
    const { props } = this;
    const { t, form } = props;
    return (
      <>
        <Decision
          title={t('dialogs:definetelyAgree')}
          icon={(<VerifyIcon />)}
          form={form}
          buttonText={t('buttons:vote')}
        />
      </>
    );
  }
}

export default DecisionAgree;
