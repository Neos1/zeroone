/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Dialog from './Dialog';

import styles from './Dialog.scss';

/**
 * Dialog with message about error token transfer
 */
@withTranslation(['dialogs', 'other'])
class TokenTransferError extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  }

  render() {
    const { props: { t } } = this;
    return (
      <Dialog
        name="token-transfer-error"
        header={t('dialogs:tokenTransferError')}
        className="transfer-error"
        size="md"
      >
        <p className={styles.dialog__subtext}>{t('other:notEnoughTokens')}</p>
      </Dialog>
    );
  }
}

export default TokenTransferError;
