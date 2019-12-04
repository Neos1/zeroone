import React from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Container from '../Container';
import Dialog from '../Dialog/Dialog';
import RejectMessage from '../Messages/RejectMessage';

@inject('dialogStore')
class TestPage extends React.PureComponent {
  static propTypes = {
    dialogStore: PropTypes.shape({
      show: PropTypes.func,
    }).isRequired,
  };

  render() {
    const { props } = this;
    const { dialogStore } = props;
    return (
      <div
        style={{
          width: '100%',
          marginTop: '120px',
        }}
      >
        <Container>
          <button
            onClick={() => {
              dialogStore.show('decision-reject');
            }}
            type="button"
          >
              open dialog
          </button>
          <Dialog
            name="decision-reject"
            header={null}
            footer={null}
          >
            <RejectMessage onButtonClick={() => {}} />
          </Dialog>
        </Container>
      </div>
    );
  }
}

export default TestPage;
