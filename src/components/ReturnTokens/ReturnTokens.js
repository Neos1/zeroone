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
        dialogStore.show('progress_modal');
        return historyStore.returnTokens()
          .then(() => {
            const notificationId = notificationStore.list[0].id;
            notificationStore.remove(notificationId);
          })
          .catch((error) => {
            console.error(error);
            dialogStore.toggle('error_modal');
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
          <FinPassFormWrapper form={form} />
        </Dialog>
        <Dialog
          name="progress_modal"
          size="md"
          footer={null}
          header={t('other:sendingTransaction')}
          closeable={false}
        >
          <TransactionProgress />
        </Dialog>
        <Dialog
          name="error_modal"
          size="md"
          footer={null}
        >
          <ErrorMessage onButtonClick={() => { dialogStore.hide(); }} />
        </Dialog>
      </>
    );
  }
}

export default ReturnTokens;
