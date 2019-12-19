/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react';
import Container from '../Container';
import MembersTop from './MembersTop';
import MembersGroup from '../../stores/MembersStore/MembersGroup';
import MembersGroupComponent from './MembersGroupComponent';
import Loader from '../Loader';
import Footer from '../Footer';
import Notification from '../Notification/Notification';

import styles from './Members.scss';

/**
 * Component for page with members
 */
@withTranslation()
@inject('membersStore')
@observer
class MembersPage extends React.Component {
  static propTypes = {
    membersStore: PropTypes.shape({
      addToGroups: PropTypes.func.isRequired,
      list: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(MembersGroup)),
      loading: PropTypes.bool.isRequired,
    }).isRequired,
  }

  componentDidMount() {

  }

  render() {
    const { membersStore: { list, loading } } = this.props;
    const groups = list.toJS();
    return (
      <Container className="container--small">
        <Notification />
        {
          !loading
            ? (
              <MembersTop
                projectName="project test"
                onClick={() => {
                  console.log('click');
                }}
              />
            )
            : null
        }
        <div className={styles.members__page}>
          {
            !loading
              ? groups.map((group, index) => (
                <MembersGroupComponent
                  id={index}
                  name={group.name}
                  fullBalance={group.fullBalance}
                  key={`memberGroup--${index + 1}`}
                  description={group.description}
                  wallet={group.wallet}
                  token={group.tokenName}
                  list={group.list}
                  textForEmptyState={group.textForEmptyState}
                />
              ))
              : <Loader />
          }
        </div>
        <Footer />
      </Container>
    );
  }
}

export default MembersPage;
