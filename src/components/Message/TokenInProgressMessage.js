import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import DefaultMessage from './DefaultMessage';
import { TransactionLoader } from '../Progress';

import styles from './Message.scss';

/**
 * Dialog with token transfer in progress
 */
@withTranslation('dialogs')
class TokenInProgressMessage extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  }

  render() {
    const { props } = this;
    const { t } = props;
    return (
      <div className={styles['message--progress']}>
        <DefaultMessage
          title={t('dialogs:transferInProgress')}
        >
          <p className={styles.subtext}>
            {t('dialogs:someTimeText')}
          </p>
          <div className={styles.loader__container}>
            <TransactionLoader />
          </div>
        </DefaultMessage>
      </div>
    );
  }
}

export default TokenInProgressMessage;
