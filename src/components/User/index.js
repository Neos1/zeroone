import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import uniqKey from 'react-id-generator';
import AppStore from '../../stores/AppStore';
import UserStore from '../../stores/UserStore/UserStore';
import { MembersStore } from '../../stores/MembersStore';
import ProjectStore from '../../stores/ProjectStore';
import NotificationStore from '../../stores/NotificationStore';
import Button from '../Button/Button';

import styles from './User.scss';

@withRouter
@withTranslation()
@inject(
  'userStore',
  'membersStore',
  'projectStore',
  'appStore',
  'notificationStore',
)
@observer
class User extends React.Component {
  timeoutCopy = 2000;

  timerId;

  static propTypes = {
    children: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    userStore: PropTypes.instanceOf(UserStore).isRequired,
    membersStore: PropTypes.instanceOf(MembersStore).isRequired,
    projectStore: PropTypes.instanceOf(ProjectStore).isRequired,
    appStore: PropTypes.instanceOf(AppStore).isRequired,
    notificationStore: PropTypes.instanceOf(NotificationStore).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      isCopied: false,
    };
  }

  componentDidMount() {
    const { props } = this;
    const { userStore } = props;
    userStore.getEthBalance();
  }

  /**
   * Method for handle copy event
   */
  handleCopy = () => {
    if (this.timerId) clearTimeout(this.timerId);
    this.setState({ isCopied: true });
    this.timerId = setTimeout(() => {
      this.setState({ isCopied: false });
    }, this.timeoutCopy);
  }

  handleToggleUser = () => {
    const { props } = this;
    const {
      appStore,
      userStore,
      projectStore,
      projectStore: {
        historyStore,
      },
      membersStore,
      notificationStore,
      history,
    } = props;
    history.push('/');
    appStore.reset();
    userStore.reset();
    historyStore.reset();
    projectStore.reset();
    membersStore.reset();
    notificationStore.reset();
  }

  render() {
    const { isCopied } = this.state;
    const { props } = this;
    const {
      children,
      t,
      userStore,
      membersStore: {
        groups,
      },
    } = props;
    return (
      <div className={`${styles.user}`}>
        <img className={styles.user__image} src={`http://tinygraphs.com/spaceinvaders/${children}?theme=base&numcolors=2&size=22&fmt=svg`} alt="avatar" />
        <CopyToClipboard
          text={children}
          onCopy={this.handleCopy}
        >
          <span className={`${styles.user__wallet} ${styles['user__wallet--full']}`}>{children}</span>
        </CopyToClipboard>
        <span className={`${styles.user__wallet} ${styles['user__wallet--half']}`}>{`${children.substr(0, 8)}...${children.substr(35, 41)}`}</span>
        <div className={`${styles.user__info}`}>
          <div className={`${styles.user__copy}`}>
            {
              isCopied
                ? t('other:copied')
                : t('other:clickOnAddressForCopy')
            }
          </div>
          <div className={`${styles.user__balances}`}>
            <div className={`${styles['user__balances-top']}`}>
              <span>{t('other:groups')}</span>
              <span>{t('other:tokens')}</span>
            </div>
            <div className={`${styles['user__balance-item']}`}>
              <span>
                {t('other:privateBalance')}
              </span>
              <span>
                {userStore.userBalance}
              </span>
            </div>
            {
              groups
              && groups.length
                ? (
                  groups.map((item) => (
                    <div
                      className={`${styles['user__balance-item']}`}
                      key={uniqKey()}
                    >
                      <span>
                        {item.name}
                      </span>
                      <span>
                        {item.fullUserBalance}
                      </span>
                    </div>
                  ))
                )
                : null
            }
          </div>
          <div className={`${styles.user__button}`}>
            <Button
              theme="toggle-user"
              onClick={this.handleToggleUser}
            >
              {t('other:toggleUser')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
