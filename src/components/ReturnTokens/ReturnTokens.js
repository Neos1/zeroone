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

@withTranslation()
@inject('userStore', 'dialogStore')
class ReturnTokens extends React.Component {
  form = new FinPassForm({
    hooks: {
      onSuccess: (form) => {
        const {
          userStore,
          dialogStore,
        } = this.props;
        const { password } = form.values();
        userStore.setPassword(password);
        dialogStore.toggle('progress_modal');
        setTimeout(() => {
          dialogStore.hide();
        }, 5000);
        return Promise.resolve();
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
  };

  render() {
    const { props, form } = this;
    const { t } = props;
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
      </>
    );
  }
}

export default ReturnTokens;
