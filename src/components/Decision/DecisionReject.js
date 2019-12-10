import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import Decision from './Decision';
import { RejectIcon } from '../Icons';
import { RejectMessage } from '../Message';
import Dialog from '../Dialog/Dialog';

@withTranslation()
@inject('dialogStore')
@observer
class DecisionReject extends React.Component {
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
          title={t('dialogs:definetelyReject')}
          icon={(<RejectIcon />)}
          onSuccess={() => dialogStore.show('decision_reject_message')}
        />
        <Dialog
          name="decision_reject_message"
          header={null}
          footer={null}
        >
          <RejectMessage onButtonClick={() => dialogStore.hide()} />
        </Dialog>
      </>
    );
  }
}

export default DecisionReject;
