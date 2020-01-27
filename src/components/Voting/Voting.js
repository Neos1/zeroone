import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed, observable } from 'mobx';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import queryString from 'query-string';
import VotingTop from './VotingTop';
import VotingFilter from './VotingFilter';
import Container from '../Container';
import Footer from '../Footer';
import Pagination from '../Pagination';
import Dialog from '../Dialog/Dialog';
import StartNewVote from '../StartNewVote';
import FinPassFormWrapper from '../FinPassFormWrapper/FinPassFormWrapper';
import FinPassForm from '../../stores/FormsStore/FinPassForm';
import TransactionProgress from '../Message/TransactionProgress';
import SuccessMessage from '../Message/SuccessMessage';
import ErrorMessage from '../Message/ErrorMessage';
import Notification from '../Notification/Notification';
import ProjectStore from '../../stores/ProjectStore';
import DialogStore from '../../stores/DialogStore';
import VotingList from './VotingList';
import Loader from '../Loader';

import styles from './Voting.scss';

@withTranslation()
@inject('dialogStore', 'projectStore', 'userStore')
@observer
class Voting extends React.Component {
  @observable votingIsActive = false;

  @observable _loading = false;

  passwordForm = new FinPassForm({
    hooks: {
      onSuccess: (form) => {
        const { props } = this;
        const {
          // eslint-disable-next-line no-unused-vars
          dialogStore,
          projectStore: {
            historyStore,
            rootStore: { Web3Service, contractService },
            votingData,
            votingQuestion,
            votingGroupId,
          },
          userStore,
        } = props;
        dialogStore.toggle('progress_modal_voting');
        const { password } = form.values();
        userStore.setPassword(password);
        return userStore.readWallet(password)
          .then(() => {
            // eslint-disable-next-line max-len
            const transaction = contractService.createVotingData(Number(votingQuestion), 0, Number(votingGroupId), votingData);
            return transaction;
          })
          .then((tx) => Web3Service.createTxData(userStore.address, tx)
            .then((formedTx) => userStore.singTransaction(formedTx, password))
            .then((signedTx) => Web3Service.sendSignedTransaction(`0x${signedTx}`))
            .then((txHash) => Web3Service.subscribeTxReceipt(txHash)))
          .then(() => {
            dialogStore.show('success_modal_voting');
            userStore.getEthBalance();
            historyStore.getActualState();
          })
          .catch((error) => {
            dialogStore.show('error_modal_voting');
            console.error(error);
          });
      },
      onError: (form) => {
        console.log(form.error);
      },
    },
  });

  voteStatus = {
    inProgress: 0,
    success: 1,
    failed: 2,
  }

  static propTypes = {
    dialogStore: PropTypes.instanceOf(DialogStore).isRequired,
    projectStore: PropTypes.instanceOf(ProjectStore).isRequired,
    userStore: PropTypes.shape().isRequired,
    t: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      status: this.voteStatus.inProgress,
    };
  }

  async componentDidMount() {
    const { props } = this;
    const {
      location,
      dialogStore,
      projectStore: {
        historyStore,
        rootStore: {
          eventEmitterService,
        },
        questionStore: {
          options,
        },
      },
    } = props;
    const parsed = queryString.parse(location.search);
    if (parsed.modal && parsed.option) {
      dialogStore.show(parsed.modal);
      const targetOption = options[Number(parsed.option)];
      eventEmitterService.emit('new_vote:toggle', targetOption);
    }
    this.votingIsActive = historyStore.isVotingActive;
  }

  @computed
  get loading() {
    const { projectStore: { historyStore } } = this.props;
    return historyStore.loading;
  }

  closeModal = (name) => {
    const { dialogStore } = this.props;
    dialogStore.hide(name);
  }

  onCloseNewVote = () => {
    const { props } = this;
    const {
      projectStore: {
        rootStore: {
          eventEmitterService,
        },
      },
    } = props;
    eventEmitterService.emit('new_vote:closed');
  }

  render() {
    const {
      props,
      voteStatus,
      state,
      loading,
    } = this;
    const { status } = state;
    const {
      t,
      dialogStore,
      projectStore: {
        historyStore: {
          pagination,
          isVotingActive,
        },
      },
    } = props;
    return (
      <>
        <Container className="container--small">
          <div
            className={styles['voting-page']}
          >
            <Notification />
            {
              !loading
                ? (
                  <>
                    <VotingFilter />
                    <VotingTop
                      onClick={() => { dialogStore.show('start_new_vote'); }}
                      votingIsActive={isVotingActive}
                    />
                    <VotingList />
                    {
                      pagination
                        ? (
                          <Pagination
                            activePage={pagination.activePage}
                            lastPage={pagination.lastPage}
                            handlePageChange={pagination.handleChange}
                            itemsCountPerPage={pagination.itemsCountPerPage}
                            totalItemsCount={pagination.totalItemsCount}
                            pageRangeDisplayed={pagination.pageRangeDisplayed}
                          />
                        )
                        : null
                    }
                  </>
                )
                : (
                  <div
                    className={styles['voting-page__loader']}
                  >
                    <Loader />
                  </div>
                )
            }
          </div>
          <Dialog
            size="xlg"
            name="start_new_vote"
            header={null}
            footer={null}
            onClose={this.onCloseNewVote}
          >
            <StartNewVote />
          </Dialog>
          <Dialog
            name="password_form"
            size="md"
            footer={null}
            header={t('fields:enterPassword')}
          >
            <FinPassFormWrapper form={this.passwordForm} />
          </Dialog>
          <Dialog
            name="progress_modal_voting"
            size="md"
            footer={null}
            header={t('headings:sendingTransaction')}
            closeable={!(status === voteStatus.inProgress)}
          >
            <TransactionProgress />
          </Dialog>
          <Dialog
            name="success_modal_voting"
            size="md"
            footer={null}
            closeable
          >
            <SuccessMessage onButtonClick={() => { dialogStore.hide(); }} />
          </Dialog>
          <Dialog
            name="error_modal_voting"
            size="md"
            footer={null}
            closeable
          >
            <ErrorMessage
              onButtonClick={() => { dialogStore.back(3); }}
              buttonText={t('buttons:retry')}
            />
          </Dialog>
        </Container>
        <Footer />
      </>
    );
  }
}

export default Voting;
