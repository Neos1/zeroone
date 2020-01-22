import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import TransferTokenForm from '../../stores/FormsStore/TransferTokenForm';
import Dialog from '../Dialog/Dialog';
import FinPassFormWrapper from '../FinPassFormWrapper/FinPassFormWrapper';
import FinPassForm from '../../stores/FormsStore/FinPassForm';
import ProjectStore from '../../stores/ProjectStore/ProjectStore';
import UserStore from '../../stores/UserStore';
import MembersStore from '../../stores/MembersStore/MembersStore';
import DialogStore from '../../stores/DialogStore';
import Input from '../Input';
import { Password, Address, TokenCount } from '../Icons';
import Button from '../Button/Button';
import { EMPTY_DATA_STRING } from '../../constants';

import styles from './TokenTransfer.scss';

/**
 * Component form for transfer token
 */
@withRouter
@withTranslation()
@inject('membersStore', 'userStore', 'dialogStore', 'projectStore')
@observer
class TokenTransfer extends React.Component {
  votingIsActive = false;

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
          history,
        } = this.props;
        const { password } = form.values();
        userStore.setPassword(password);
        dialogStore.show('progress_modal');
        const votingData = _contract.methods
          .setCustomGroupAdmin(groupAddress, wallet).encodeABI();
        return userStore.readWallet(password)
          .then(() => {
          // eslint-disable-next-line max-len
            const transaction = contractService.createVotingData(4, 0, Number(groupId), votingData);
            return transaction;
          })
          .then((tx) => Web3Service.createTxData(userStore.address, tx)
            .then((formedTx) => userStore.singTransaction(formedTx, password))
            .then((signedTx) => Web3Service.sendSignedTransaction(`0x${signedTx}`))
            .then((txHash) => Web3Service.subscribeTxReceipt(txHash)))
          .then(() => {
            userStore.getEthBalance();
            dialogStore.show('success_modal');
            historyStore.getMissingVotings();
            history.push('/votings');
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
    dialogStore: PropTypes.instanceOf(DialogStore).isRequired,
    groupId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    groupType: PropTypes.string.isRequired,
    membersStore: PropTypes.instanceOf(MembersStore).isRequired,
    userStore: PropTypes.instanceOf(UserStore).isRequired,
    projectStore: PropTypes.instanceOf(ProjectStore).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    form: PropTypes.instanceOf(TransferTokenForm).isRequired,
  }

  static defaultProps = {
    wallet: EMPTY_DATA_STRING,
  }

  async componentDidMount() {
    const {
      projectStore: {
        historyStore,
      },
    } = this.props;
    this.votingIsActive = historyStore.isVotingActive;
  }

  handleClick = () => {
    const {
      groupId, dialogStore,
    } = this.props;
    dialogStore.show(`password_form-${groupId}`);
  }

  render() {
    const { props } = this;
    const {
      t,
      wallet,
      groupId,
      groupType,
      projectStore: { historyStore },
      form,
    } = props;
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
                <Button
                  type="button"
                  className={styles['token-transfer__button']}
                  onClick={this.handleClick}
                  disabled={historyStore.isVotingActive}
                  hint={
                    historyStore.isVotingActive
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
                  {t('buttons:designateGroupAdministrator')}
                </Button>
              </div>
            )
            : null
        }
        {
          groupType !== 'ERC20'
            ? (
              <Dialog
                name={`password_form-${groupId}`}
                size="md"
                footer={null}
                header={t('fields:enterPassword')}
              >
                <FinPassFormWrapper form={this.passwordForm} />
              </Dialog>
            )
            : null
        }

      </div>
    );
  }
}

export default TokenTransfer;
