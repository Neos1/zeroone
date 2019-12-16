import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';
import VotingInfo from './VotingInfo';
import Container from '../Container';
import Dialog from '../Dialog/Dialog';
import DecisionAgree from '../Decision/DecisionAgree';
import DecisionReject from '../Decision/DecisionReject';
import VoterList from '../VoterList/VoterList';
import Footer from '../Footer';
import FinPassForm from '../../stores/FormsStore/FinPassForm';
import { AgreedMessage, RejectMessage } from '../Message';
import TransactionProgress from '../Message/TransactionProgress';

@inject('dialogStore', 'projectStore', 'userStore')
@observer
class VotingInfoWrapper extends React.PureComponent {
  votingId = 0;

  form = new FinPassForm({
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
        } = this.props;
        console.log(descision, votingId, form.values());
        const { password } = form.values();
        userStore.setPassword(password);
        dialogStore.toggle('progress_modal');
        contractService.sendVote(votingId, descision)
          .then(() => {
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
          });
      },
      onError: (form) => {
        console.log(form.error);
      },
    },
  })

  static propTypes = {
    dialogStore: PropTypes.shape({
      show: PropTypes.func.isRequired,
      hide: PropTypes.func.isRequired,
      toggle: PropTypes.func.isRequired,
    }).isRequired,
    projectStore: PropTypes.shape({
      historyStore: PropTypes.shape({
        getVotingById: PropTypes.func.isRequired,
        fetchAndUpdateLastVoting: PropTypes.func.isRequired,
      }).isRequired,
      questionStore: PropTypes.shape({
        getQuestionById: PropTypes.func.isRequired,
      }).isRequired,
      rootStore: PropTypes.shape({
        Web3Service: PropTypes.shape({
          web3: PropTypes.shape().isRequired,
        }).isRequired,
        contractService: PropTypes.shape({
          sendVote: PropTypes.func.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
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

  @action
  closeVoting = () => {
    const { props } = this;
    const {
      match: { params: { id } },
      projectStore: {
        historyStore,
        rootStore: {
          contractService,
        },
      },
    } = props;
    // The decision can be both positive and negative.
    // It does not affect the outcome of the vote.
    // TODO refactor after adding needed method
    // in contractService
    const [voting] = historyStore.getVotingById(Number(id));
    voting.update({
      closeVoteInProgress: true,
    });
    contractService.sendVote(Number(id), 1)
      .then(() => {
        historyStore.fetchAndUpdateLastVoting();
      })
      .finally(() => {
        voting.update({
          closeVoteInProgress: false,
        });
      });
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
    const { props } = this;
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
          onCompleteVoteClick={this.closeVoting}
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
          <DecisionAgree form={this.form} />
        </Dialog>

        <Dialog
          name="decision_reject"
          size="md"
          header={null}
          footer={null}
        >
          <DecisionReject form={this.form} />
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
      </Container>
    );
  }
}

export default VotingInfoWrapper;
