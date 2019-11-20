/* eslint-disable react/static-property-placement */
import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Dialog from './Dialog';
import Loader from '../Loader';

import styles from './Dialog.scss';

@withTranslation('dialogs')
class TransferTokenInProgress extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  }

  render() {
    const { props } = this;
    const { t } = props;
    return (
      <Dialog
        name="transfer-token-in-progress"
        header={t('dialogs:transferInProgress')}
        size="md"
        closeable={false}
        footer={null}
        className="transfer-progress"
      >
        <p className={styles.dialog__subtext}>
          {t('dialogs:someTimeText')}
        </p>
        <div className={styles.dialog__loader}>
          <Loader />
        </div>
      </Dialog>
    );
  }
}

export default TransferTokenInProgress;
