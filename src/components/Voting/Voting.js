import React from 'react';
import VotingTop from './VotingTop';

import styles from './Voting.scss';
import VotingItem from './VotingItem';

class Voting extends React.PureComponent {
  render() {
    return (
      <div
        className={styles.voting}
      >
        <div>
          filter
        </div>
        {/* eslint-disable-next-line */}
        <VotingTop onClick={() => { console.log('voting top click'); }} />
        <div>
          <VotingItem
            index={0}
            title="Launch mining farm "
            description="Some description for voting"
            actualState="progress"
            date={{
              start: new Date('Wed Jan 09 2019 14:45:00 GMT+0700'),
              end: new Date('Wed Jan 09 2019 16:44:00 GMT+0700'),
            }}
          />
          <VotingItem
            index={1}
            title="Withdraw profit"
            description="Some description for voting"
            actualState="pros"
            date={{
              start: new Date('Wed Jan 09 2019 14:45:00 GMT+0700'),
              end: new Date('Wed Jan 09 2019 16:44:00 GMT+0700'),
            }}
          />
          <VotingItem
            index={1}
            title="Withdraw profit"
            description="Stop mining farm"
            actualState="cons"
            date={{
              start: new Date('Wed Jan 09 2019 14:45:00 GMT+0700'),
              end: new Date('Wed Jan 09 2019 16:44:00 GMT+0700'),
            }}
          />
        </div>
        <div>
          pagination
        </div>
      </div>
    );
  }
}

export default Voting;
