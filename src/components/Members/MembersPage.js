/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react';
import { observable, computed } from 'mobx';
import Container from '../Container';
import MembersTop from './MembersTop';
import MembersGroup from '../../stores/MembersStore/MembersGroup';
import MembersGroupComponent from './MembersGroupComponent';
import Dialog from '../Dialog/Dialog';
import Loader from '../Loader';
import Footer from '../Footer';
import Notification from '../Notification/Notification';
import ProjectStore from '../../stores/ProjectStore/ProjectStore';
import TransactionProgress from '../Message/TransactionProgress';
import SuccessMessage from '../Message/SuccessMessage';
import ErrorMessage from '../Message/ErrorMessage';

import styles from './Members.scss';

/**
 * Component for page with members
 */
@withTranslation()
@inject('membersStore', 'projectStore', 'dialogStore')
@observer
class MembersPage extends React.Component {
  @observable votingIsActive = false;

  @observable _loading = false;

  static propTypes = {
    membersStore: PropTypes.shape({
      addToGroups: PropTypes.func.isRequired,
      list: MobxPropTypes.observableArrayOf(PropTypes.instanceOf(MembersGroup)),
      loading: PropTypes.bool.isRequired,
    }).isRequired,
    dialogStore: PropTypes.shape({
      hide: PropTypes.func.isRequired,
    }).isRequired,
    projectStore: PropTypes.instanceOf(ProjectStore).isRequired,
    t: PropTypes.func.isRequired,
  }

  async componentDidMount() {
    const { projectStore: { historyStore } } = this.props;
    this._loading = true;
    this.votingIsActive = await historyStore.hasActiveVoting();
    this._loading = false;
  }

  @computed
  get loading() {
    const { membersStore } = this.props;
    if (this._loading === true) return true;
    return membersStore.loading;
  }

  render() {
    const { loading, votingIsActive } = this;
    const {
      membersStore: { list }, projectStore, dialogStore, t,
    } = this.props;
    const groups = list.toJS();
    return (
      <Container className="container--small">
        <Notification />
        {
          !loading
            ? (
              <MembersTop
                projectName={projectStore.name}
                votingIsActive={votingIsActive}
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
                  groupType={group.groupType}
                  list={group.list}
                  textForEmptyState={group.textForEmptyState}
                />
              ))
              : <Loader />
          }
        </div>
        <Dialog
          name="progress_modal"
          size="md"
          footer={null}
          header={t('headings:sendingTransaction')}
          closeable={false}
        >
          <TransactionProgress />
        </Dialog>

        <Dialog
          name="success_modal"
          size="md"
          footer={null}
          closeable
        >
          <SuccessMessage onButtonClick={() => { dialogStore.hide(); }} />
        </Dialog>

        <Dialog
          name="error_modal"
          size="md"
          footer={null}
          closeable
        >
          <ErrorMessage onButtonClick={() => { dialogStore.hide(); }} />
        </Dialog>
        <Footer />
      </Container>
    );
  }
}

export default MembersPage;
