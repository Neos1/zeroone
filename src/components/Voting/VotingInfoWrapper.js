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
import { AgreedMessage, RejectMessage } from '../Message';
import TransactionProgress from '../Message/TransactionProgress';
import SuccessMessage from '../Message/SuccessMessage';
import ErrorMessage from '../Message/ErrorMessage';
import ProjectStore from '../../stores/ProjectStore/ProjectStore';
import { systemQuestionsId, statusStates, userVotingStates } from '../../constants';
import AppStore from '../../stores/AppStore/AppStore';
import MembersStore from '../../stores/MembersStore/MembersStore';
import UserStore from '../../stores/UserStore/UserStore';

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
            if (voting.status === statusStates.closed) {
              dialogStore.toggle('success_modal_voting_info_wrapper');
              this.updateAfterCompleteVoting(voting);
              return;
            }
            switch (Number(voting.descision)) {
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
          .then(async () => {
            dialogStore.toggle('success_modal_voting_info_wrapper');
            historyStore.fetchAndUpdateLastVoting();
            this.updateQuestionList(voting);
            this.getVotingStats();
            this.getVotes();
            this.updateAfterCompleteVoting(voting);
          })
          .catch(() => {
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
    this.getVotingStats();
    this.getVotes();
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
      },
      membersStore,
    } = props;
    const {
      addingNewQuestion,
      connectGroupUsers,
    } = systemQuestionsId;
    switch (voting.questionId) {
      case addingNewQuestion:
        questionStore.getActualQuestions();
        break;
      case connectGroupUsers:
        membersStore.fetchUserGroups();
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

  @action getVotes = async () => {
    const { props } = this;
    const {
      match: { params: { id } },
      projectStore: {
        historyStore,
      },
    } = props;
    const votes = await historyStore.getVoterList(Number(id));
    await console.log(votes);
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
    const memberGroup = membersStore.getMemberById(Number(groupId) - 1);
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

  // eslint-disable-next-line class-methods-use-this
  prepareParameters(voting, question) {
    const { projectStore: { rootStore: { Web3Service } }, appStore: { parseFormula } } = this.props;
    const { data } = voting;
    const { methodSelector, params, id } = question;
    const votingData = data.replace(methodSelector, '0x');
    let parameters;
    let decodedRawParams;
    let decodedParams;
    if (id !== 1) {
      parameters = params.map((param) => param[1]);
      decodedRawParams = Web3Service.web3.eth.abi.decodeParameters(parameters, votingData);
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
    const [voting] = historyStore.getVotingById(Number(id));
    const [question] = questionStore.getQuestionById(voting.questionId);
    const params = this.prepareParameters(voting, question);
    return (
      <Container className="container--small">
        <VotingInfo
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
              dialogStore.show('voter_list_voting_info_wrapper');
            }
          }
        />
        <Footer />

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
          <ErrorMessage onButtonClick={() => { dialogStore.hide(); }} />
        </Dialog>


      </Container>
    );
  }
}

export default VotingInfoWrapper;
