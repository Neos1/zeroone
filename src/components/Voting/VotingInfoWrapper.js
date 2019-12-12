import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import VotingInfo from './VotingInfo';
import Container from '../Container';
import Dialog from '../Dialog/Dialog';
import DecisionAgree from '../Decision/DecisionAgree';
import DecisionReject from '../Decision/DecisionReject';
import VoterList from '../VoterList/VoterList';
import Footer from '../Footer';

@inject('dialogStore', 'projectStore')
@observer
class VotingInfoWrapper extends React.PureComponent {
  static propTypes = {
    dialogStore: PropTypes.shape({
      show: PropTypes.func.isRequired,
    }).isRequired,
    projectStore: PropTypes.shape({
      historyStore: PropTypes.shape({
        getVotingById: PropTypes.func.isRequired,
      }).isRequired,
      questionStore: PropTypes.shape({
        getQuestionById: PropTypes.func.isRequired,
      }).isRequired,
      rootStore: PropTypes.shape({
        Web3Service: PropTypes.shape({
          web3: PropTypes.shape().isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };


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
          index={id}
          title={question.caption}
          duration={Number(question.time)}
          addressContract={question.target}
          description={question.text}
          formula={question.getFormula()}
          params={params}
          onVerifyClick={() => { dialogStore.show('decision_agree'); }}
          onRejectClick={() => { dialogStore.show('decision_reject'); }}
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
          <DecisionAgree />
        </Dialog>
        <Dialog
          name="decision_reject"
          size="md"
          header={null}
          footer={null}
        >
          <DecisionReject />
        </Dialog>
        <Dialog
          name="voter_list"
          size="lg"
          header={null}
          footer={null}
        >
          <VoterList />
        </Dialog>
      </Container>
    );
  }
}

export default VotingInfoWrapper;
