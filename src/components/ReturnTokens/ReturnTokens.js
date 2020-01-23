import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { inject } from 'mobx-react';
import FinPassFormWrapper from '../FinPassFormWrapper/FinPassFormWrapper';
import FinPassForm from '../../stores/FormsStore/FinPassForm';
import UserStore from '../../stores/UserStore';
import DialogStore from '../../stores/DialogStore';
import Dialog from '../Dialog/Dialog';
import TransactionProgress from '../Message/TransactionProgress';
import HistoryStore from '../../stores/HistoryStore';
import NotificationStore from '../../stores/NotificationStore';
import ErrorMessage from '../Message/ErrorMessage';
import SuccessMessage from '../Message/SuccessMessage';

@withTranslation()
@inject('userStore', 'dialogStore', 'projectStore', 'notificationStore')
class ReturnTokens extends React.Component {
  form = new FinPassForm({
    hooks: {
      onSuccess: (form) => {
        const {
          userStore,
          dialogStore,
          notificationStore,
          projectStore: {
            historyStore,
          },
        } = this.props;
        const { password } = form.values();
        userStore.setPassword(password);
        dialogStore.toggle('progress_modal_return_tokens');
        return historyStore.returnTokens()
          .then(() => {
            const notificationId = notificationStore.list[0].id;
            notificationStore.remove(notificationId);
            dialogStore.toggle('success_modal_return_tokens');
            historyStore.fetchAndUpdateLastVoting();
            historyStore.fetchUserReturnTokens();
          })
          .catch((error) => {
            console.error(error);
            dialogStore.toggle('error_modal_return_tokens');
          });
      },
      onError: (form) => {
        console.log(form.error);
      },
    },
  })

  static propTypes = {
    t: PropTypes.func.isRequired,
    userStore: PropTypes.instanceOf(UserStore).isRequired,
    dialogStore: PropTypes.instanceOf(DialogStore).isRequired,
    notificationStore: PropTypes.instanceOf(NotificationStore).isRequired,
    projectStore: PropTypes.shape({
      historyStore: PropTypes.instanceOf(HistoryStore),
    }).isRequired,
  };

  render() {
    const { props, form } = this;
    const { t, dialogStore } = props;
    return (
      <>
        <Dialog
          header={t('other:pickUpTokens')}
          footer={null}
          size="md"
          name="return_tokens"
        >
          <FinPassFormWrapper form={form} buttonText={t('buttons:pickUpTokensCapital')} />
        </Dialog>
        <Dialog
          name="progress_modal_return_tokens"
          size="md"
          footer={null}
          header={t('other:sendingTransaction')}
          closeable={false}
        >
          <TransactionProgress />
        </Dialog>
        <Dialog
          name="error_modal_return_tokens"
          size="md"
          footer={null}
        >
          <ErrorMessage onButtonClick={() => { dialogStore.hide(); }} />
        </Dialog>
        <Dialog
          name="success_modal_return_tokens"
          size="md"
          footer={null}
          closeable
        >
          <SuccessMessage onButtonClick={() => { dialogStore.hide(); }} />
        </Dialog>
      </>
    );
  }
}

export default ReturnTokens;
