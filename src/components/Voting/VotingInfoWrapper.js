import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
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

@inject(
  'dialogStore',
  'projectStore',
  'userStore',
  'membersStore',
)
@observer
class VotingInfoWrapper extends React.PureComponent {
  @observable dataStats = [];

  votingId = 0;

  votingForm = new FinPassForm({
    hooks: {
      onSuccess: (form) => {
        const { votingId } = this;
        const { descision } = this.state;
        const {
          match: { params: { id } },
          userStore,
          dialogStore,
          userStore: {
            rootStore: {
              contractService,
            },
          },
          projectStore: {
            historyStore,
            addReturnTokensNotification,
          },
        } = this.props;
        const [voting] = historyStore.getVotingById(Number(id));
        console.log('voting', voting);
        console.log(descision, votingId, form.values());
        const { password } = form.values();
        userStore.setPassword(password);
        dialogStore.toggle('progress_modal');
        return contractService.sendVote(votingId, descision)
          .then(() => {
            voting.update({ userVote: Number(descision) });
            historyStore.writeVotingsToFile();
            addReturnTokensNotification();
            switch (descision) {
              case (1):
                dialogStore.toggle('decision_agreed_message');
                break;
              case (2):
                dialogStore.toggle('decision_reject_message');
                break;
              default:
                break;
            }
          })
          .catch((error) => {
            console.log(error);
            dialogStore.toggle('error_modal');
          });
      },
      onError: (form) => {
        console.log(form.error);
      },
    },
  })

  closingForm = new FinPassForm({
    hooks: {
      onSuccess: () => {
        const { props } = this;
        const {
          match: { params: { id } },
          projectStore: {
            historyStore,
            rootStore: {
              contractService,
            },
          },
          dialogStore,
        } = props;
        dialogStore.toggle('progress_modal');
        const [voting] = historyStore.getVotingById(Number(id));
        voting.update({
          closeVoteInProgress: true,
        });
        return contractService.closeVoting()
          .then(() => {
            dialogStore.toggle('success_modal');
            historyStore.fetchAndUpdateLastVoting();
          })
          .catch(() => {
            dialogStore.toggle('error_modal');
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
    dialogStore: PropTypes.shape({
      show: PropTypes.func.isRequired,
      hide: PropTypes.func.isRequired,
      toggle: PropTypes.func.isRequired,
    }).isRequired,
    membersStore: PropTypes.shape({
      getMemberById: PropTypes.func.isRequired,
    }).isRequired,
    projectStore: PropTypes.instanceOf(ProjectStore).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    userStore: PropTypes.shape().isRequired,
  };

  constructor() {
    super();
    this.state = {
      descision: 0,
    };
  }

  componentDidMount() {
    this.getVotingStats();
  }

  onVerifyClick = () => {
    const { dialogStore } = this.props;
    this.setState({
      descision: 1,
    });
    dialogStore.toggle('decision_agree');
  }

  onRejectClick = () => {
    const { dialogStore } = this.props;
    this.setState({
      descision: 2,
    });
    dialogStore.toggle('decision_reject');
  }

  onClosingClick = () => {
    const { dialogStore } = this.props;
    dialogStore.toggle('descision_close');
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
    const { projectStore: { rootStore: { Web3Service } } } = this.props;
    const { data } = voting;
    const { methodSelector, params } = question;
    const votingData = data.replace(methodSelector, '0x');
    const parameters = params.map((param) => param[1]);
    const decodedRawParams = Web3Service.web3.eth.abi.decodeParameters(parameters, votingData);
    const decodedParams = params.map((param, index) => [param[0], decodedRawParams[index]]);
    return decodedParams;
  }

  render() {
    const { props, dataStats } = this;
    const {
      dialogStore,
      projectStore: { historyStore, questionStore },
      match: { params: { id } },
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
            (name, data) => {
              console.log('name', name);
              console.log('data', data);
              dialogStore.show('voter_list');
            }
          }
        />
        <Footer />

        <Dialog
          name="decision_agree"
          size="md"
          header={null}
          footer={null}
        >
          <DecisionAgree form={this.votingForm} />
        </Dialog>

        <Dialog
          name="decision_reject"
          size="md"
          header={null}
          footer={null}
        >
          <DecisionReject form={this.votingForm} />
        </Dialog>

        <Dialog
          name="descision_close"
          header={null}
          footer={null}
        >
          <DecisionClose form={this.closingForm} />
        </Dialog>

        <Dialog
          name="voter_list"
          size="lg"
          header={null}
          footer={null}
        >
          <VoterList />
        </Dialog>

        <Dialog
          name="decision_agreed_message"
          header={null}
          footer={null}
        >
          <AgreedMessage onButtonClick={() => dialogStore.hide()} />
        </Dialog>

        <Dialog
          name="decision_reject_message"
          header={null}
          footer={null}
        >
          <RejectMessage onButtonClick={() => dialogStore.hide()} />
        </Dialog>

        <Dialog
          name="progress_modal"
          size="md"
          footer={null}
          header="Отправка транзакции"
          closable={false}
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

export default VotingInfoWrapper;
