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
            rootStore: { Web3Service, contractService },
            votingData,
            votingQuestion,
            votingGroupId,
          },
          userStore,
        } = props;
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
          .then((receipt) => { console.log(receipt); })
          .catch((error) => {
            console.error(error);
          });
      },
      onError: (form) => {
        console.log(form.error);
      },
    },
  });

  static propTypes = {
    dialogStore: PropTypes.shape({
      show: PropTypes.func.isRequired,
      hide: PropTypes.func.isRequired,
    }).isRequired,
    projectStore: PropTypes.shape({
      votingData: PropTypes.string.isRequired,
      votingQuestion: PropTypes.number.isRequired,
      votingGroupId: PropTypes.number.isRequired,
      rootStore: PropTypes.shape().isRequired,
      historyStore: PropTypes.shape({
        votingsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        pagination: PropTypes.instanceOf(PaginationStore).isRequired,
        dataManager: PropTypes.instanceOf(DataManagerStore).isRequired,
      }).isRequired,
    }).isRequired,
    userStore: PropTypes.shape().isRequired,
    t: PropTypes.func.isRequired,
  };

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

  render() {
    const { props } = this;
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
      </Container>
    );
  }
}

export default Voting;
