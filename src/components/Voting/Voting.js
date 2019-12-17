import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import VotingTop from './VotingTop';
import VotingItem from './VotingItem';
import VotingFilter from './VotingFilter';
import Container from '../Container';
import Footer from '../Footer';
import Pagination from '../Pagination';
import Dialog from '../Dialog/Dialog';
import StartNewVote from '../StartNewVote';
import PaginationStore from '../../stores/PaginationStore';
import DataManagerStore from '../../stores/DataManagerStore';
import CreateGroupQuestions from '../CreateGroupQuestions/CreateGroupQuestions';
import CreateNewQuestion from '../CreateNewQuestion/CreateNewQuestion';
import FinPassFormWrapper from '../FinPassFormWrapper/FinPassFormWrapper';
import FinPassForm from '../../stores/FormsStore/FinPassForm';
import TransactionProgress from '../Message/TransactionProgress';
import SuccessMessage from '../Message/SuccessMessage';
import ErrorMessage from '../Message/ErrorMessage';

import styles from './Voting.scss';

@withTranslation()
@inject('dialogStore', 'projectStore', 'userStore')
@observer
class Voting extends React.Component {
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
            historyStore,
          },
          userStore,
        } = props;
        dialogStore.toggle('progress_modal');
        const { password } = form.values();
        const maxGasPrice = 30000000000;
        userStore.setPassword(password);
        return userStore.readWallet(password)
          .then(() => {
            // eslint-disable-next-line max-len
            const transaction = contractService.createVotingData(Number(votingQuestion), 0, Number(votingGroupId), votingData);
            return transaction;
          })
          .then((tx) => Web3Service.createTxData(userStore.address, tx, maxGasPrice)
            .then((formedTx) => userStore.singTransaction(formedTx, password))
            .then((signedTx) => Web3Service.sendSignedTransaction(`0x${signedTx}`))
            .then((txHash) => Web3Service.subscribeTxReceipt(txHash)))
          .then(() => {
            historyStore.getActualVotings();
            dialogStore.show('success_modal');
            historyStore.getMissingVotings();
          })
          .catch((error) => {
            dialogStore.show('error_modal');
            console.log(error);
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
    dialogStore: PropTypes.shape({
      show: PropTypes.func.isRequired,
      hide: PropTypes.func.isRequired,
      toggle: PropTypes.func.isRequired,
    }).isRequired,
    projectStore: PropTypes.shape({
      votingData: PropTypes.string.isRequired,
      votingQuestion: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]).isRequired,
      votingGroupId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]).isRequired,
      rootStore: PropTypes.shape().isRequired,
      historyStore: PropTypes.shape({
        getMissingVotings: PropTypes.func.isRequired,
        rawVotings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        votingsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        pagination: PropTypes.instanceOf(PaginationStore).isRequired,
        dataManager: PropTypes.instanceOf(DataManagerStore).isRequired,
        getActualVotings: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
    userStore: PropTypes.shape().isRequired,
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      status: this.voteStatus.inProgress,
    };
  }

  componentDidMount() {
    const { projectStore } = this.props;
    const {
      historyStore: {
        pagination,
        dataManager,
      },
    } = projectStore;
    pagination.update({
      key: 'activePage',
      value: 1,
    });
    dataManager.reset();
  }

  closeModal = (name) => {
    const { dialogStore } = this.props;
    dialogStore.hide(name);
  }

  render() {
    const { props, voteStatus, state } = this;
    const { status } = state;
    const { t, dialogStore, projectStore: { historyStore: { pagination, dataManager } } } = props;
    const votings = dataManager.list();
    return (
      <Container className="container--small">
        <div
          className={styles['voting-page']}
        >
          <VotingFilter />
          {/* eslint-disable-next-line */}
          <VotingTop onClick={() => { dialogStore.show('start_new_vote'); }} />
          <div>
            {
              votings && votings.length
                ? votings.map((item, index) => (
                  <VotingItem
                    key={`voting__item--${index + 1}`}
                    index={item.id}
                    title={item.caption}
                    description={item.text}
                    actualStatus={item.status}
                    actualDecisionStatus={item.descision}
                    date={{ start: Number(item.startTime), end: Number(item.endTime) }}
                  />
                ))
                : null
            }
          </div>
          <Pagination
            activePage={pagination.activePage}
            lastPage={pagination.lastPage}
            handlePageChange={pagination.handleChange}
            itemsCountPerPage={pagination.itemsCountPerPage}
            totalItemsCount={pagination.totalItemsCount}
            pageRangeDisplayed={pagination.pageRangeDisplayed}
          />
        </div>
        <Footer />
        <Dialog
          size="xlg"
          name="start_new_vote"
          header={null}
          footer={null}
        >
          <StartNewVote />
        </Dialog>
        <Dialog name="create_group_question" size="md" footer={null}>
          <CreateGroupQuestions />
        </Dialog>
        <Dialog name="create_question" size="xlg" footer={null}>
          <CreateNewQuestion />
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
          name="progress_modal"
          size="md"
          footer={null}
          header="Отправка транзакции"
          closable={!(status === voteStatus.inProgress)}
        >
          <TransactionProgress />
        </Dialog>

        <Dialog
          name="success_modal"
          size="md"
          footer={null}
          closable
        >
          <SuccessMessage onButtonClick={() => { dialogStore.hide(); }} />
        </Dialog>

        <Dialog
          name="error_modal"
          size="md"
          footer={null}
          closable
        >
          <ErrorMessage onButtonClick={() => { dialogStore.hide(); }} />
        </Dialog>
      </Container>
    );
  }
}

export default Voting;
