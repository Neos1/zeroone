/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import Container from '../Container';
import MembersTop from './MembersTop';

// import styles from './nameClass.css';

/**
 * Component for page with members
 */
@withTranslation()
@inject('membersStore')
@observer
class MembersPage extends React.Component {
  static propTypes = {
    membersStore: PropTypes.shape({}).isRequired,
  }

  componentDidMount() {
    const { membersStore } = this.props;
    console.log(membersStore);
  }

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
