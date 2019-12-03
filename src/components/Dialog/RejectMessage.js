import React from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Dialog from './Dialog';
import { RejectIcon } from '../Icons';
import Button from '../Button/Button';

import styles from './Dialog.scss';

/**
 * Dialog with message about reject decision
 */
@withTranslation(['dialogs', 'buttons'])
@inject('dialogStore')
class RejectMessage extends React.Component {
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
        header={t('dialogs:rejectMessage')}
        name="reject-message"
        topIcon={(<RejectIcon width={27} height={27} />)}
        footer={(
          <div className={styles['dialog__footer--reject-message']}>
            <Button
              onClick={this.hide}
            >
              {t('buttons:continue')}
            </Button>
          </div>
        )}
        className="reject-message"
      />
    );
  }
}

export default RejectMessage;
