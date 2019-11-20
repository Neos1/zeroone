import React from 'react';
import { withTranslation } from 'react-i18next';
import Container from '../Container';
import MembersTop from './MembersTop';

// import styles from './nameClass.css';

/**
 * Component for page with members
 */
@withTranslation()
class MembersPage extends React.Component {
  render() {
    return (
      <Container>
        <MembersTop
          onClick={() => {
            console.log('click');
          }}
        />
      </Container>
    );
  }
}

export default MembersPage;
