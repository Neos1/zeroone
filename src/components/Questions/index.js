/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import { withRouter } from 'react-router-dom';
import ProjectStore from '../../stores/ProjectStore';
import DialogStore from '../../stores/DialogStore';
import UserStore from '../../stores/UserStore/UserStore';
import Container from '../Container';
import Footer from '../Footer';
import Dialog from '../Dialog/Dialog';
import CreateGroupQuestions from '../CreateGroupQuestions/CreateGroupQuestions';
import CreateNewQuestion from '../CreateNewQuestion/CreateNewQuestion';
import FinPassFormWrapper from '../FinPassFormWrapper/FinPassFormWrapper';
import FinPassForm from '../../stores/FormsStore/FinPassForm';
import Pagination from '../Pagination';
import Loader from '../Loader';
import Notification from '../Notification/Notification';
import TransactionProgress from '../Message/TransactionProgress';
import SuccessMessage from '../Message/SuccessMessage';
import ErrorMessage from '../Message/ErrorMessage';
import QuestionsList from './QuestionsList';
import QuestionsHead from './QuestionsHead';

import styles from './Questions.scss';

@withRouter
@withTranslation()
@inject('projectStore', 'dialogStore', 'userStore')
@observer
class Questions extends Component {
  @observable votingIsActive = false;

  @observable _loading = false;

  passwordForm = new FinPassForm({
    hooks: {
      onSuccess: (form) => {
        const { props } = this;
        const {
          history,
          dialogStore,
          projectStore: {
            historyStore,
            rootStore: { Web3Service, contractService, appStore },
            votingData,
            votingQuestion,
            votingGroupId,
          },
          userStore,
        } = props;
        dialogStore.show('progress_modal_questions');
        const { password } = form.values();
        userStore.setPassword(password);
        appStore.setTransactionStep('compileOrSign');
        return userStore.readWallet(password)
          .then(() => {
            // eslint-disable-next-line max-len
            const transaction = contractService.createVotingData(Number(votingQuestion), Number(votingGroupId), votingData);
            return transaction;
          })
          .then((tx) => Web3Service.createTxData(userStore.address, tx)
            .then((formedTx) => userStore.singTransaction(formedTx, password))
            .then((signedTx) => {
              appStore.setTransactionStep('sending');
              return Web3Service.sendSignedTransaction(`0x${signedTx}`);
            })
            .then((txHash) => {
              appStore.setTransactionStep('txReceipt');
              return Web3Service.subscribeTxReceipt(txHash);
            })
            .then(() => {
              appStore.setTransactionStep('success');
              userStore.getEthBalance();
              dialogStore.hide();
              history.push('/votings');
              historyStore.getActualState();
            })
            .catch((error) => {
              dialogStore.show('error_modal_questions');
              console.error(error);
            }));
      },
      onError: () => Promise.reject(),
    },
  });

  static propTypes = {
    t: propTypes.func.isRequired,
    projectStore: propTypes.instanceOf(ProjectStore).isRequired,
    dialogStore: propTypes.instanceOf(DialogStore).isRequired,
    userStore: propTypes.instanceOf(UserStore).isRequired,
    history: propTypes.shape({
      push: propTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const { projectStore: { historyStore, questionStore } } = this.props;
    this._loading = true;
    this.votingIsActive = historyStore.isVotingActive;
    questionStore.fetchActualQuestionGroups();
    this._loading = false;
  }

  @computed
  get loading() {
    const { projectStore: { questionStore } } = this.props;
    if (this._loading === true) return true;
    return questionStore.loading;
  }

  /**
   * Method for getting init index
   * for dropdown sort option
   *
   * @returns {number} index number
   */
  get initIndex() {
    const { projectStore } = this.props;
    const {
      questionStore: {
        questionGroups,
        filter: { rules },
      },
    } = projectStore;
    let initIndex = 0;
    questionGroups.forEach((option, index) => {
      if (option.value === rules.groupId) {
        initIndex = index;
      }
    });
    return initIndex;
  }

  render() {
    const { loading } = this;
    const {
      t,
      projectStore,
      dialogStore,
    } = this.props;
    const {
      questionStore: {
        pagination,
      },
      rootStore: { contractService: { transactionStep } },
    } = projectStore;
    return (
      <>
        <Container className="container--small">
          {/* FIXME remove comment */}
          <Notification />
          <div className={styles.questions}>
            {
                !loading
                  ? (
                    <>
                      <QuestionsHead />
                      <div className={styles.questions__wrapper}>
                        <QuestionsList />
                      </div>
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
                    <div className={styles.questions__loader}>
                      <Loader
                        theme="gray"
                      />
                    </div>
                  )
              }
          </div>
          <Dialog name="create_group_question" size="md" footer={null}>
            <CreateGroupQuestions />
          </Dialog>
          <Dialog name="create_question" size="xlg" footer={null}>
            <CreateNewQuestion />
          </Dialog>
          <Dialog
            name="password_form_questions"
            size="md"
            footer={null}
            header={t('fields:enterPassword')}
          >
            <FinPassFormWrapper form={this.passwordForm} buttonText={t('buttons:continue')} />
          </Dialog>
          <Dialog
            name="progress_modal_questions"
            size="xlg"
            footer={null}
            header={t('headings:sendingTransaction')}
            closeable={false}
          >
            <TransactionProgress step={transactionStep} />
          </Dialog>
          <Dialog
            name="success_modal_questions"
            size="md"
            footer={null}
            closeable
          >
            <SuccessMessage onButtonClick={() => { dialogStore.hide(); }} />
          </Dialog>
          <Dialog
            name="error_modal_questions"
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

export default Questions;
