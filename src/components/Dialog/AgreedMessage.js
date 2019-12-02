/* eslint-disable react/static-property-placement */
import React from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Dialog from './Dialog';
import { VerifyIcon } from '../Icons';
import { Button } from '../Button';

import styles from './Dialog.scss';

/**
 * Dialog with message about agreed decision
 */
@withTranslation(['dialogs', 'buttons'])
@inject('dialogStore')
class AgreedMessage extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    dialogStore: PropTypes.shape({
      hide: PropTypes.func.isRequired,
    }).isRequired,
  };

  hide = () => {
    const { dialogStore } = this.props;
    dialogStore.hide();
  }

  render() {
    const { t } = this.props;
    return (
      <Dialog
        header={t('dialogs:agreedMessage')}
        name="agreed-message"
        topIcon={(<VerifyIcon width={27} height={27} />)}
        footer={(
          <div className={styles['dialog__footer--agreed-message']}>
            <Button
              onClick={this.hide}
            >
              {t('buttons:continue')}
            </Button>
          </div>
        )}
        className="agreed-message"
      />
    );
  }
}

export default AgreedMessage;
