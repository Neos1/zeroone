import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import NotificationStore from '../../stores/NotificationStore';
import ProjectStore from '../../stores/ProjectStore/ProjectStore';
import NotificationItem from './NotificationItem';
import TokensWithoutActiveVoting from '../Notifications/TokensWithoutActiveVoting';
import TokensWithActiveVoting from '../Notifications/TokensWithActiveVoting';

import styles from './Notification.scss';

/**
 * Class for render notification
 */
@inject('notificationStore', 'projectStore')
@observer
class Notification extends React.Component {
  timeoutInterval = 60000; // ms

  idTimer = null;

  static propTypes = {
    notificationStore: PropTypes.instanceOf(NotificationStore).isRequired,
    projectStore: PropTypes.instanceOf(ProjectStore).isRequired,
  };

  componentDidMount() {
    const { projectStore: { rootStore } } = this.props;
    const { configStore: { config } } = rootStore;
    this.updateReturnTokensNotification();
    this.idTimer = setInterval(() => {
      this.updateReturnTokensNotification();
    }, config.interval);
  }

  componentWillUnmount() {
    clearInterval(this.idTimer);
  }

  /**
   * Method for remove notification
   *
   * @param {string} id id notification
   */
  removeNotification = (id) => {
    const { props } = this;
    const {
      notificationStore,
    } = props;
    notificationStore.remove(id);
  }

  resetNotification = () => {
    const { props } = this;
    const {
      notificationStore,
    } = props;
    notificationStore.reset();
  }

  updateReturnTokensNotification = async () => {
    const { props } = this;
    const {
      projectStore: {
        historyStore,
      },
      notificationStore,
    } = props;
    const hasActiveVoting = historyStore.isVotingActive;
    const userTokenReturns = await historyStore.isUserReturnTokens();
    const lastUserVoting = await historyStore.lastUserVoting();
    const countOfVoting = await historyStore.fetchVotingsCount();
    const lastVoteIndex = countOfVoting - 1;
    if (Number(lastUserVoting) === 0 && userTokenReturns === false) return;
    if (Number(lastVoteIndex) !== Number(lastUserVoting) && userTokenReturns === false) {
      this.resetNotification();
      // TODO maybe make other notification description?
      notificationStore.add({
        isOpen: true,
        content: <TokensWithoutActiveVoting />,
      });
      return;
    }
    if (hasActiveVoting === true && userTokenReturns === false) {
      this.resetNotification();
      notificationStore.add({
        isOpen: true,
        content: <TokensWithActiveVoting />,
        status: 'important',
      });
    }
    if (hasActiveVoting === false && userTokenReturns === false) {
      this.resetNotification();
      notificationStore.add({
        isOpen: true,
        content: <TokensWithoutActiveVoting />,
      });
    }
  }

  render() {
    const { props } = this;
    const {
      notificationStore: {
        list,
      },
    } = props;
    return (
      <div className={styles.notification__container}>
        {
          list && list.length
            ? (
              list.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  isOpen={notification.isOpen}
                  content={notification.content}
                  status={notification.status}
                  handleRemove={() => this.removeNotification(notification.id)}
                />
              ))
            )
            : null
        }
      </div>
    );
  }
}

export default Notification;
