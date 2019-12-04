import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { EMPTY_DATA_STRING } from '../../constants';
import DefaultMessage from './DefaultMessage';
import Button from '../Button/Button';

import styles from './Message.scss';

/**
 * Dialog with message about success token transfer
 */
@withTranslation(['dialogs', 'other'])
class TransferSuccessMessage extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onButtonClick: PropTypes.func.isRequired,
    value: PropTypes.string,
  }

  static defaultProps = {
    value: EMPTY_DATA_STRING,
  }

  render() {
    const { props: { onButtonClick, t, value } } = this;
    return (
      <div className={styles['message--transfer-success']}>
        <DefaultMessage
          title={t('dialogs:tokenTransferSuccess')}
        >
          <p className={styles.subtext}>{t('other:yourBalance')}</p>
          <div className={styles.value}>{value}</div>
        </DefaultMessage>
        <div className={styles.footer}>
          <Button
            onClick={onButtonClick}
          >
            {t('buttons:continue')}
          </Button>
        </div>
      </div>
    );
  }
}

export default TransferSuccessMessage;
