import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import VotingInfo from './VotingInfo';
import Container from '../Container';
import Dialog from '../Dialog/Dialog';
import DecisionAgree from '../Decision/DecisionAgree';
import DecisionReject from '../Decision/DecisionReject';

@inject('dialogStore')
@observer
class VotingInfoWrapper extends React.PureComponent {
  static propTypes = {
    dialogStore: PropTypes.shape({
      show: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    const { props } = this;
    const { dialogStore } = props;
    return (
      <Container className="container--small">
        <VotingInfo
          date={{
            start: new Date('Wed Jan 09 2019 14:45:00 GMT+0700'),
            end: new Date('Wed Jan 09 2019 16:44:00 GMT+0700'),
            application: new Date('Wed Jan 09 2019 16:44:00 GMT+0700'),
          }}
          index={0}
          title="Set no free tickets for old players"
          duration={50}
          addressContract="0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54"
          description="Устанавливает количество бесплатных билетов у новых игроков. Иногда описания могут не влазить и оно сокращается до троеточия. Зато в карточке голосвания можно уместить гораздно больше текста
          Устанавливает количество бесплатных билетов у новых игроков. Иногда описания могут не влазить и оно сокращается до троеточия. Зато в карточке голосвания можно уместить гораздно больше текста
          Устанавливает количество бесплатных билетов у новых игроков. Иногда описания могут не влазить и оно сокращается до троеточия. Зато в карточке голосвания можно уместить гораздно больше текста"
          formula="(group (0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54)→condition (quorum=20%))"
          /* eslint-disable-next-line */
          onVerifyClick={() => { dialogStore.show('decision_agree'); }}
          /* eslint-disable-next-line */
          onRejectClick={() => { dialogStore.show('decision_reject'); }}
        />
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
      </Container>
    );
  }
}

export default VotingInfoWrapper;
