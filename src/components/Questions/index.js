import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import { withRouter } from 'react-router-dom';
import uniqKey from 'react-id-generator';
import Container from '../Container';
import Button from '../Button/Button';
import { CreateToken } from '../Icons';
import SimpleDropdown from '../SimpleDropdown';
import Footer from '../Footer';
import Dialog from '../Dialog/Dialog';
import CreateGroupQuestions from '../CreateGroupQuestions/CreateGroupQuestions';
import CreateNewQuestion from '../CreateNewQuestion/CreateNewQuestion';
import FinPasswordFormWrapper from '../FinPassFormWrapper/FinPassFormWrapper';
import FinPassForm from '../../stores/FormsStore/FinPassForm';
import Pagination from '../Pagination';
import Loader from '../Loader';
import Notification from '../Notification/Notification';
import TransactionProgress from '../Message/TransactionProgress';
import SuccessMessage from '../Message/SuccessMessage';
import ErrorMessage from '../Message/ErrorMessage';
import ProjectStore from '../../stores/ProjectStore';
import DialogStore from '../../stores/DialogStore';
import UserStore from '../../stores/UserStore/UserStore';

import styles from './Questions.scss';
import QuestionsList from './QuestionsList';

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
            rootStore: { Web3Service, contractService },
            votingData,
            votingQuestion,
            votingGroupId,
          },
          userStore,
        } = props;
        dialogStore.show('progress_modal_questions');
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
            userStore.getEthBalance();
            dialogStore.hide();
            history.push('/votings');
            historyStore.getActualState();
          })
          .catch((error) => {
            dialogStore.show('error_modal_questions');
            console.error(error);
          });
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

  /**
   * Method for handle sort
   *
   * @param {object} selected new sort data
   * @param {string|number} selected.value new sort value
   * @param {string} selected.label new sort label
   */
  handleSortSelect = (selected) => {
    const { projectStore } = this.props;
    const {
      questionStore: {
        addFilterRule,
      },
    } = projectStore;
    addFilterRule({ groupId: selected.value });
  }

  render() {
    const { loading } = this;
    const { t, projectStore, dialogStore } = this.props;
    const {
      questionStore: {
        pagination,
        questionGroups,
      },
      historyStore,
    } = projectStore;
    return (
      <Container className="container--small">
        <Notification />
        <div className={styles.questions}>
          {
              !loading
                ? (
                  <div className={styles.questions__head}>
                    <div className={styles['questions__head-create']}>
                      <Button
                        theme="white"
                        icon={<CreateToken />}
                        onClick={() => { dialogStore.show('create_group_question'); }}
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
                        {t('buttons:createQuestionGroup')}
                      </Button>
                      <Button
                        theme="white"
                        icon={<CreateToken />}
                        onClick={() => { dialogStore.show('create_question'); }}
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
                        {t('buttons:createQuestion')}
                      </Button>
                    </div>
                    <div className={styles['questions__head-filters']}>
                      <SimpleDropdown
                        options={questionGroups}
                        onSelect={this.handleSortSelect}
                        initIndex={this.initIndex}
                        key={uniqKey()}
                      />
                    </div>
                  </div>
                )
                : null
            }

          <div className={styles.questions__wrapper}>
            {
              !loading
                ? <QuestionsList />
                : <Loader />
            }
          </div>
          {
            !loading
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
          <FinPasswordFormWrapper form={this.passwordForm} />
        </Dialog>
        <Dialog
          name="progress_modal_questions"
          size="md"
          footer={null}
          header={t('headings:sendingTransaction')}
          closeable={false}
        >
          <TransactionProgress />
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
        <Footer />
      </Container>
    );
  }
}

export default Questions;
