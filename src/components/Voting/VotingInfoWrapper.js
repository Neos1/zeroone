import React from 'react';
import VotingInfo from './VotingInfo';
import Container from '../Container';

class VotingInfoWrapper extends React.PureComponent {
  render() {
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
          onVerifyClick={() => { console.log('onVerifyClick'); }}
          /* eslint-disable-next-line */
          onRejectClick={() => { console.log('onRejectClick'); }}
        />
      </Container>
    );
  }
}

export default VotingInfoWrapper;
