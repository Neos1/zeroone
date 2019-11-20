/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Dialog from './Dialog';
import TokenTransfer from '../TokenTransfer/TokenTransfer';

import styles from './Dialog.scss';

/**
 * Dialog with form for transfer token
 */
@withTranslation()
class TokenTransferDialog extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  }

  /**
   * Handle footer button click
   */
  handleClick = () => {
    /* eslint-disable-next-line */
    console.log('click');
  }

  render() {
    const { props: { t } } = this;
    return (
      <Dialog
        name="token-transfer"
        header={t('dialogs:tokenTransfer')}
        className="token-transfer"
        size="md"
        footer={(
          <div className={styles['dialog__footer--token-transfer']}>
            <button
              type="button"
              className={styles['dialog__footer-button']}
              onClick={this.handleClick}
            >
              {t('buttons:designateGroupAdministrator')}
            </button>
          </div>
        )}
      >
        <TokenTransfer
        // TODO set correct wallet
          wallet="0xD490af05Bf82eF6C6BA034B22D18c39B5D52Cc54"
        />
      </Dialog>
    );
  }
}

export default TokenTransferDialog;
