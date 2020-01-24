/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import { observable, computed } from 'mobx';
import Container from '../Container';
import MembersTop from './MembersTop';
import MembersGroupComponent from './MembersGroupComponent';
import Dialog from '../Dialog/Dialog';
import Loader from '../Loader';
import Footer from '../Footer';
import Notification from '../Notification/Notification';
import ProjectStore from '../../stores/ProjectStore/ProjectStore';
import MembersStore from '../../stores/MembersStore/MembersStore';
import DialogStore from '../../stores/DialogStore';
import TransactionProgress from '../Message/TransactionProgress';
import SuccessMessage from '../Message/SuccessMessage';
import ErrorMessage from '../Message/ErrorMessage';
import AsyncInterval from '../../utils/AsyncUtils';

import styles from './Members.scss';

/**
 * Component for page with members
 */
@withTranslation()
@inject('membersStore', 'projectStore', 'dialogStore')
@observer
class MembersPage extends React.Component {
  asyncUpdater = null;

  timeoutInterval = 60000; // ms

  @observable votingIsActive = false;

  @observable _loading = false;

  static propTypes = {
    membersStore: PropTypes.instanceOf(MembersStore).isRequired,
    dialogStore: PropTypes.instanceOf(DialogStore).isRequired,
    projectStore: PropTypes.instanceOf(ProjectStore).isRequired,
    t: PropTypes.func.isRequired,
  }

  async componentDidMount() {
    const { membersStore } = this.props;
    const { rootStore: { configStore: { UPDATE_INTERVAL } } } = membersStore;
    this._loading = true;
    this._loading = false;
    this.asyncUpdater = new AsyncInterval({
      timeoutInterval: UPDATE_INTERVAL,
      cb: membersStore.fetchUserGroups,
    });
  }

  componentWillUnmount() {
    this.asyncUpdater.cancel();
  }

  @computed
  get loading() {
    const { membersStore } = this.props;
    if (this._loading === true) return true;
    return membersStore.loading;
  }

  render() {
    const { loading } = this;
    const {
      membersStore: { list }, projectStore, dialogStore, t,
    } = this.props;
    const { historyStore } = projectStore;
    const groups = list.toJS();
    return (
      <Container className="container--small">
        <Notification />
        {
          !loading
            ? (
              <MembersTop
                projectName={projectStore.name}
                votingIsActive={historyStore.isVotingActive}
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
                  admin={group.groupAdmin}
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
          <ErrorMessage
            onButtonClick={() => { dialogStore.back(3); }}
            buttonText={t('buttons:retry')}
          />
        </Dialog>
        <Footer />
      </Container>
    );
  }
}

export default MembersPage;
