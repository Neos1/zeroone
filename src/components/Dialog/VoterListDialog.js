import React from 'react';
import Dialog from './Dialog';
import VoterList from '../VoterList/VoterList';

class VoterListDialog extends React.PureComponent {
  render() {
    return (
      <Dialog
        header={null}
        name="voter-list"
        footer={null}
        size="lg"
        className="voter-list"
      >
        <VoterList />
      </Dialog>
    );
  }
}

export default VoterListDialog;
