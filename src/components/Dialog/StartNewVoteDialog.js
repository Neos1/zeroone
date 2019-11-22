import React from 'react';
import Dialog from './Dialog';
import StartNewVote from '../StartNewVote';

class StartNewVoteDialog extends React.PureComponent {
  render() {
    return (
      <Dialog
        name="new-vote"
        header={null}
        footer={null}
        size="xlg"
        className="new-vote"
      >
        <StartNewVote />
      </Dialog>
    );
  }
}

export default StartNewVoteDialog;
