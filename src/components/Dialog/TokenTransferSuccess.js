import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Dialog from './Dialog';
import { EMPTY_DATA_STRING } from '../../constants';

import styles from './Dialog.scss';

/**
 * Dialog with message about success token transfer
 */
@withTranslation(['dialogs', 'other'])
class TokenTransferSuccess extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    value: PropTypes.string,
  }

  static defaultProps = {
    value: EMPTY_DATA_STRING,
  }

  render() {
    const { props: { t, value } } = this;
    return (
      <Dialog
        name="token-transfer-success"
        header={t('dialogs:tokenTransferSuccess')}
        className="transfer-success"
        size="md"
      >
        <p className={styles.dialog__subtext}>{t('other:yourBalance')}</p>
        <div className={styles.dialog__value}>{value}</div>
      </Dialog>
    );
  }
}

export default TokenTransferSuccess;
