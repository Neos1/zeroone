import React from 'react';
import VotingTop from './VotingTop';

import styles from './Voting.scss';

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
          Voting list
        </div>
        <div>
          pagination
        </div>
      </div>
    );
  }
}

export default Voting;
