import React from 'react';
import ToHome from './ToHome';
import MembersPage from '../Members/MembersPage';

class MembersPresentationPage extends React.PureComponent {
  render() {
    return (
      <>
        <div
          style={{
            width: '100%',
            maxWidth: '1120px',
            height: '100vh',
            margin: '0 auto',
            marginTop: '120px',
          }}
        >
          <ToHome />
          <MembersPage />
        </div>
      </>
    );
  }
}

export default MembersPresentationPage;
