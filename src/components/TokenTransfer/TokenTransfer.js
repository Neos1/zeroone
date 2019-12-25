import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import TransferTokenForm from '../../stores/FormsStore/TransferTokenForm';
import Dialog from '../Dialog/Dialog';
import FinPassFormWrapper from '../FinPassFormWrapper/FinPassFormWrapper';
import FinPassForm from '../../stores/FormsStore/FinPassForm';
import MembersGroup from '../../stores/MembersStore/MembersGroup';
import Input from '../Input';
import { Password, Address, TokenCount } from '../Icons';
import Button from '../Button/Button';
import { EMPTY_DATA_STRING } from '../../constants';

import styles from './TokenTransfer.scss';

/**
 * Component form for transfer token
 */
@withTranslation()
@inject('membersStore', 'userStore', 'dialogStore')
@observer
class TokenTransfer extends React.Component {
  form = new TransferTokenForm({
    hooks: {
      onSuccess: (form) => {
        const {
          groupId, wallet, membersStore, userStore,
        } = this.props;
        const { address, count, password } = form.values();
        userStore.setPassword(password);
        membersStore.setTransferStatus('transfering');
        return membersStore.transferTokens(groupId, wallet, address, count)
          .then(() => {
            membersStore.setTransferStatus('success');
            membersStore.list[groupId].updateMemberBalanceAndWeight(wallet);
            membersStore.list[groupId].updateMemberBalanceAndWeight(address);
          })
          .catch(() => {
            membersStore.setTransferStatus('error');
          });
      },
      onError: () => {
        /* eslint-disable-next-line */
        console.error('form error');
      },
    },
  })

  passwordForm = new FinPassForm({
    hooks: {
      onSuccess: (form) => {
        const {
          wallet,
          groupAddress,
          groupId,
          userStore,
          dialogStore,
          membersStore: {
            rootStore: {
              Web3Service,
              contractService: { _contract },
              contractService,
              projectStore: { historyStore },
            },
          },
        } = this.props;
        const { password } = form.values();
        userStore.setPassword(password);
        dialogStore.show('progress_modal');
        const votingData = _contract.methods
          .setCustomGroupAdmin(groupAddress, wallet).encodeABI();
        const maxGasPrice = 30000000000;
        return userStore.readWallet(password)
          .then(() => {
          // eslint-disable-next-line max-len
            const transaction = contractService.createVotingData(4, 0, Number(groupId), votingData);
            return transaction;
          })
          .then((tx) => Web3Service.createTxData(userStore.address, tx, maxGasPrice)
            .then((formedTx) => userStore.singTransaction(formedTx, password))
            .then((signedTx) => Web3Service.sendSignedTransaction(`0x${signedTx}`))
            .then((txHash) => Web3Service.subscribeTxReceipt(txHash)))
          .then(() => {
            dialogStore.show('success_modal');
            historyStore.getMissingVotings();
          })
          .catch((error) => {
            dialogStore.show('error_modal');
            console.error(error);
          });
      },
      onError: (form) => {
        console.error(form.error);
      },
    },
  })

  static propTypes = {
    t: PropTypes.func.isRequired,
    wallet: PropTypes.string,
    groupAddress: PropTypes.string.isRequired,
    dialogStore: PropTypes.shape({
      show: PropTypes.func.isRequired,
    }).isRequired,
    groupId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    groupType: PropTypes.string.isRequired,
    membersStore: PropTypes.shape({
      transferTokens: PropTypes.func.isRequired,
      setTransferStatus: PropTypes.func.isRequired,
      list: PropTypes.arrayOf(
        PropTypes.instanceOf(MembersGroup),
      ).isRequired,
      rootStore: PropTypes.shape().isRequired,
    }).isRequired,
    userStore: PropTypes.shape({
      setPassword: PropTypes.func.isRequired,
      singTransaction: PropTypes.func.isRequired,
      readWallet: PropTypes.func.isRequired,
      address: PropTypes.string.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    wallet: EMPTY_DATA_STRING,
  }

  handleClick = () => {
    const {
      groupId, dialogStore,
    } = this.props;
    dialogStore.show(`password_form-${groupId}`);
  }

  render() {
    const { form } = this;
    const { props } = this;
    const {
      t, wallet, groupId, groupType,
    } = props;
    console.log(groupId, groupType);
    return (
      <div className={styles['token-transfer']}>
        <h2 className={styles['token-transfer__title']}>
          {t('dialogs:tokenTransfer')}
        </h2>
        <form
          onSubmit={form.onSubmit}
          className={styles['token-transfer__form']}
        >
          <div className={styles.input__wrapper}>
            <Input field={form.$('address')}>
              <Address />
            </Input>
          </div>
          <div className={styles.input__wrapper}>
            <Input field={form.$('count')}>
              <TokenCount />
            </Input>
          </div>
          <div className={styles.input__wrapper}>
            <Input type="password" field={form.$('password')}>
              <Password />
            </Input>
          </div>
          <div className={styles.button__wrapper}>
            <Button
              type="submit"
            >
              {t('buttons:transfer')}
            </Button>
          </div>
          <div className={styles.wallet__wrapper}>{wallet}</div>
        </form>
        {
          groupType !== 'ERC20'
            ? (
              <div className={styles['token-transfer__button-container']}>
                <button
                  type="button"
                  className={styles['token-transfer__button']}
                  onClick={this.handleClick}
                >
                  {t('buttons:designateGroupAdministrator')}
                </button>
              </div>
            )
            : null
        }
        <Dialog
          name={`password_form-${groupId}`}
          size="md"
          footer={null}
          header={t('fields:enterPassword')}
        >
          <FinPassFormWrapper form={this.passwordForm} />
        </Dialog>
      </div>
    );
  }
}

export default TokenTransfer;
