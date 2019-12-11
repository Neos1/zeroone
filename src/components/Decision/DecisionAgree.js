import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import Decision from './Decision';
import { VerifyIcon } from '../Icons';
import Dialog from '../Dialog/Dialog';
import { AgreedMessage } from '../Message';

@withTranslation()
@inject('dialogStore')
@observer
class DecisionAgree extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    dialogStore: PropTypes.shape({
      show: PropTypes.func.isRequired,
      hide: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    const { props } = this;
    const { t, dialogStore } = props;
    return (
      <>
        <Decision
          title={t('dialogs:definetelyAgree')}
          icon={(<VerifyIcon />)}
          onSuccess={() => dialogStore.show('decision_agreed_message')}
        />
        <Dialog
          name="decision_agreed_message"
          header={null}
          footer={null}
        >
          <AgreedMessage onButtonClick={() => dialogStore.hide()} />
        </Dialog>
      </>
    );
  }
}

export default DecisionAgree;
