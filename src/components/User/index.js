import React from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import UserStore from '../../stores/UserStore/UserStore';

import styles from './User.scss';

@withTranslation()
@inject('userStore')
@observer
class User extends React.Component {
  timeoutCopy = 2000;

  timerId;

  static propTypes = {
    children: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    userStore: PropTypes.instanceOf(UserStore).isRequired,
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

  render() {
    const { isCopied } = this.state;
    const { props } = this;
    const { children, t, userStore } = props;
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
          </div>
        </div>
      </div>
    );
  }
}

export default User;
