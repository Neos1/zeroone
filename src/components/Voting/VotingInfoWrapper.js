import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { withTranslation } from 'react-i18next';
import VotingInfo from './VotingInfo';
import Container from '../Container';
import Dialog from '../Dialog/Dialog';
import DecisionAgree from '../Decision/DecisionAgree';
import DecisionClose from '../Decision/DecisionClose';
import DecisionReject from '../Decision/DecisionReject';
import VoterList from '../VoterList/VoterList';
import Footer from '../Footer';
import FinPassForm from '../../stores/FormsStore/FinPassForm';
import { AgreedMessage, RejectMessage, ERC20TokensUsed } from '../Message';
import TransactionProgress from '../Message/TransactionProgress';
import SuccessMessage from '../Message/SuccessMessage';
import ErrorMessage from '../Message/ErrorMessage';
import ProjectStore from '../../stores/ProjectStore/ProjectStore';
import {
  systemQuestionsId,
  statusStates,
  userVotingStates,
  tokenTypes,
} from '../../constants';
import AppStore from '../../stores/AppStore/AppStore';
import MembersStore from '../../stores/MembersStore/MembersStore';
import UserStore from '../../stores/UserStore/UserStore';
import AsyncInterval from '../../utils/AsyncUtils';

@withTranslation()
@inject(
  'dialogStore',
  'projectStore',
  'userStore',
  'membersStore',
  'appStore',
)
@observer
class VotingInfoWrapper extends React.PureComponent {
  question;

  @observable dataStats = [];

  @observable dataVotes = {
    positive: [],
    negative: [],
  };

  votingId = 0;

  votingForm = new FinPassForm({
    hooks: {
      onSuccess: (form) => {
        const { votingId } = this;
        const { descision } = this.state;
        const {
          userStore,
          dialogStore,
          userStore: {
            rootStore: {
              contractService,
            },
          },
          projectStore: {
            historyStore,
          },
        } = this.props;
        const { password } = form.values();
        userStore.setPassword(password);
        dialogStore.toggle('progress_modal_voting_info_wrapper');
        return contractService.sendVote(votingId, descision)
          .then(async () => {
            await historyStore.fetchAndUpdateLastVoting();
            const [voting] = historyStore.getVotingById(Number(votingId));
            this.getVotingStats();
            this.getVotes();
            if (String(voting.status) === statusStates.closed) {
              dialogStore.toggle('success_modal_voting_info_wrapper');
              this.updateAfterCompleteVoting(voting);
              return;
            }
            switch (Number(voting.userVote)) {
              case (userVotingStates.decisionFor):
                dialogStore.toggle('decision_agree_voting_info_wrapper_message');
                break;
              case (userVotingStates.decisionAgainst):
                dialogStore.toggle('decision_reject_voting_info_wrapper_message');
                break;
              default:
                dialogStore.toggle('success_modal_voting_info_wrapper');
                break;
            }
          })
          .catch((error) => {
            console.log(error);
            dialogStore.toggle('error_modal_voting_info_wrapper');
          });
      },
      onError: (form) => {
        console.log(form.error);
      },
    },
  })

  closingForm = new FinPassForm({
    hooks: {
      onSuccess: (form) => {
        const { props } = this;
        const {
          match: { params: { id } },
          userStore,
          projectStore: {
            historyStore,
            rootStore: {
              contractService,
            },
          },
          dialogStore,
        } = props;
        const { password } = form.values();
        userStore.setPassword(password);
        dialogStore.toggle('progress_modal_voting_info_wrapper');
        const [voting] = historyStore.getVotingById(Number(id));
        voting.update({
          closeVoteInProgress: true,
        });
        return contractService.closeVoting()
          .then(() => {
            historyStore.fetchAndUpdateLastVoting();
            this.updateAfterCompleteVoting(voting);
            this.getVotingStats();
            this.getVotes();
            dialogStore.toggle('success_modal_voting_info_wrapper');
          })
          .catch((e) => {
            console.error(e);
            dialogStore.toggle('error_modal_voting_info_wrapper');
          })
          .finally(() => {
            voting.update({
              closeVoteInProgress: false,
            });
          });
      },
      onError: () => {},
    },
  })

  static propTypes = {
    dialogStore: PropTypes.instanceOf(AppStore).isRequired,
    membersStore: PropTypes.instanceOf(MembersStore).isRequired,
    projectStore: PropTypes.instanceOf(ProjectStore).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    userStore: PropTypes.instanceOf(UserStore).isRequired,
    appStore: PropTypes.instanceOf(AppStore).isRequired,
    t: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      descision: 0,
    };
  }

  componentDidMount() {
    const { props } = this;
    const {
      match: { params: { id } },
      projectStore: {
        historyStore,
        questionStore,
        rootStore: {
          configStore: { UPDATE_INTERVAL },
        },
      },
    } = props;
    const [voting] = historyStore.getVotingById(Number(id));
    const [question] = questionStore.getQuestionById(Number(voting.questionId));
    this.question = question;
    this.getVotingStats();
    this.getVotes();
    this.interval = new AsyncInterval({
      timeoutInterval: UPDATE_INTERVAL,
      cb: this.updateData,
    });
  }

  componentWillUnmount() {
    this.interval.cancel();
    this.interval = null;
  }

  /**
   * Method for checking whether the type
   * of voting is ERC20
   *
   * @returns {boolean} is ERC20 or not
   */
  get isERC20Type() {
    const { props } = this;
    const { membersStore } = props;
    if (!this.question) return false;
    const { groupId } = this.question;
    const targetGroup = membersStore.getMemberById(groupId);
    if (!targetGroup || !targetGroup.groupType) return false;
    return targetGroup.groupType === tokenTypes.ERC20;
  }

  /**
   * Method for update question list
   * if close voting have questionId=1
   *
   * @param {object} voting voting object
   * @param {string} voting.questionId voting question id
   */
  updateAfterCompleteVoting = (voting) => {
    const { props } = this;
    const {
      projectStore: {
        questionStore,
        historyStore,
      },
      membersStore,
    } = props;
    const {
      addingNewQuestion,
      connectGroupUsers,
      connectGroupQuestions,
      assignGroupAdmin,
    } = systemQuestionsId;
    historyStore.getActualState();
    switch (Number(voting.questionId)) {
      case addingNewQuestion:
        questionStore.getActualQuestions();
        break;
      case connectGroupUsers:
        membersStore.fetchUserGroups();
        break;
      case connectGroupQuestions:
        questionStore.fetchActualQuestionGroups();
        break;
      case assignGroupAdmin:
        membersStore.getAddressesForAdminDesignate(voting.data)
          .then(([group]) => {
            membersStore.updateAdmin(group);
          });
        break;
      default:
        break;
    }
  }

  onVerifyClick = () => {
    const { dialogStore } = this.props;
    this.setState({
      descision: 1,
    });
    dialogStore.toggle('decision_agree_voting_info_wrapper');
  }

  onRejectClick = () => {
    const { dialogStore } = this.props;
    this.setState({
      descision: 2,
    });
    dialogStore.toggle('decision_reject_voting_info_wrapper');
  }

  onClosingClick = () => {
    const { dialogStore } = this.props;
    dialogStore.toggle('descision_close_voting_info_wrapper');
  }

  updateData = () => {
    this.getVotes();
    this.getVotingStats();
  }

  @action getVotes = async () => {
    const { props } = this;
    const {
      match: { params: { id } },
      projectStore: {
        historyStore,
      },
    } = props;
    const votes = await historyStore.getVoterList(Number(id));
    this.dataVotes = await Object.assign(this.dataVotes, votes);
  }

  @action
  getVotingStats = async () => {
    const { props } = this;
    const {
      match: { params: { id } },
      membersStore,
      projectStore: {
        historyStore,
        questionStore,
        rootStore: {
          contractService: {
            _contract: {
              methods,
            },
          },
        },
      },
    } = props;
    const [voting] = historyStore.getVotingById(Number(id));
    const [question] = questionStore.getQuestionById(Number(voting.questionId));
    const { groupId } = question;
    const memberGroup = membersStore.getMemberById(Number(groupId));
    if (!memberGroup) {
      this.dataStats = [];
      return;
    }
    let [positive, negative, totalSupply] = await methods.getVotes(id).call();
    positive = parseInt(positive, 10);
    negative = parseInt(negative, 10);
    totalSupply = parseInt(totalSupply, 10);
    const decimalPercent = totalSupply / 100;
    const abstained = (totalSupply - (positive + negative)) / decimalPercent;
    this.dataStats = [
      {
        name: memberGroup.name,
        pros: positive / decimalPercent,
        cons: negative / decimalPercent,
        abstained,
      },
    ];
  }

  /**
   * Method for opening previous dialog
   */
  openPreviousDialog = () => {
    const { props } = this;
    const { dialogStore } = props;
    dialogStore.back(3);
  }

  // eslint-disable-next-line class-methods-use-this
  prepareParameters(voting, question) {
    const { projectStore: { rootStore: { Web3Service } }, appStore: { parseFormula } } = this.props;
    const { data } = voting;
    const { params, id } = question;
    const votingData = `0x${data.slice(10)}`;
    let parameters;
    let decodedRawParams;
    let decodedParams;
    if (id !== 1) {
      parameters = params[0] !== undefined
        ? params.map((param) => param[1])
        : [];

      decodedRawParams = votingData !== '0x'
        ? Web3Service.web3.eth.abi.decodeParameters(parameters, votingData)
        : [];
      decodedParams = params.map((param, index) => [param[0], decodedRawParams[index]]);
    } else {
      parameters = ['uint[]', 'uint8', 'string', 'string', 'address', 'bytes4', 'uint[]', 'bytes32[]'];
      decodedRawParams = Web3Service.web3.eth.abi.decodeParameters(parameters, votingData);
      // PARAMETERS FOR FIRST QUESTION
      const FQP = ['Group ID', 'Status', 'Name', 'Text', 'Target', 'MethodSelector', 'Formula', 'parameters'];
      decodedParams = [
        [FQP[0], decodedRawParams[0][1]],
        [FQP[1], decodedRawParams[1] === '0' ? 'Active' : 'Disabled'],
        [FQP[2], decodedRawParams[2]],
        [FQP[3], decodedRawParams[3]],
        [FQP[4], decodedRawParams[4]],
        [FQP[5], decodedRawParams[5]],
        [FQP[6], parseFormula(decodedRawParams[6])],
      ];
    }
    return decodedParams;
  }

  render() {
    const { props, dataStats } = this;
    const {
      dialogStore,
      projectStore: { historyStore, questionStore },
      match: { params: { id } },
      t,
    } = props;
    this.votingId = Number(id);
    const { isUserReturnTokensActual } = historyStore;
    const [voting] = historyStore.getVotingById(Number(id));
    const [question] = questionStore.getQuestionById(voting.questionId);
    const params = this.prepareParameters(voting, question);
    return (
      <>
        <Container className="container--small">
          <VotingInfo
            isUserReturnTokensActual={isUserReturnTokensActual}
            dataStats={dataStats}
            date={{
              start: Number(voting.startTime),
              end: Number(voting.endTime),
            }}
            voting={voting}
            index={id}
            title={question.caption}
            duration={Number(question.time)}
            addressContract={question.target}
            description={question.text}
            formula={question.getFormula()}
            params={params}
            onVerifyClick={() => { this.onVerifyClick(); }}
            onRejectClick={() => { this.onRejectClick(); }}
            onCompleteVoteClick={() => { this.onClosingClick(); }}
            onBarClick={
              () => {
                if (this.isERC20Type === true) {
                  dialogStore.show('is_erc20_modal_voting_info_wrapper');
                  return;
                }
                dialogStore.show('voter_list_voting_info_wrapper');
              }
            }
          />

          <Dialog
            name="decision_agree_voting_info_wrapper"
            size="md"
            header={null}
            footer={null}
          >
            <DecisionAgree form={this.votingForm} />
          </Dialog>

          <Dialog
            name="decision_reject_voting_info_wrapper"
            size="md"
            header={null}
            footer={null}
          >
            <DecisionReject form={this.votingForm} />
          </Dialog>

          <Dialog
            name="descision_close_voting_info_wrapper"
            header={null}
            footer={null}
          >
            <DecisionClose form={this.closingForm} />
          </Dialog>

          <Dialog
            name="voter_list_voting_info_wrapper"
            size="lg"
            header={null}
            footer={null}
          >
            <VoterList data={this.dataVotes} />
          </Dialog>

          <Dialog
            name="decision_agree_voting_info_wrapper_message"
            header={null}
            footer={null}
          >
            <AgreedMessage onButtonClick={() => dialogStore.hide()} />
          </Dialog>

          <Dialog
            name="decision_reject_voting_info_wrapper_message"
            header={null}
            footer={null}
          >
            <RejectMessage onButtonClick={() => dialogStore.hide()} />
          </Dialog>

          <Dialog
            name="progress_modal_voting_info_wrapper"
            size="md"
            footer={null}
            header={t('other:sendingTransaction')}
            closeable={false}
          >
            <TransactionProgress />
          </Dialog>

          <Dialog
            name="success_modal_voting_info_wrapper"
            size="md"
            footer={null}
            closeable
          >
            <SuccessMessage onButtonClick={() => { dialogStore.hide(); }} />
          </Dialog>

          <Dialog
            name="error_modal_voting_info_wrapper"
            size="md"
            footer={null}
            closeable
          >
            <ErrorMessage
              onButtonClick={() => { dialogStore.back(3); }}
              buttonText={t('buttons:retry')}
            />
          </Dialog>
          <Dialog
            name="is_erc20_modal_voting_info_wrapper"
            size="md"
            footer={null}
            closeable
          >
            <ERC20TokensUsed onButtonClick={() => { dialogStore.hide(); }} />
          </Dialog>
        </Container>
        <Footer />
      </>
    );
  }
}

export default VotingInfoWrapper;
