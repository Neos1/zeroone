/* eslint-disable react/static-property-placement */
import React from 'react';
import { withTranslation } from 'react-i18next';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Dialog from './Dialog';
import { RejectIcon } from '../Icons';
import FinPassForm from '../../stores/FormsStore/FinPassForm';
import FinPassFormWrapper from '../FinPassFormWrapper/FinPassFormWrapper';

import styles from './Dialog.scss';

/**
 * Dialog with financial password
 * form for Agree decision
 */
@inject('dialogStore')
@withTranslation()
class DefinetelyReject extends React.Component {
  form = new FinPassForm({
    hooks: {
      onSuccess() {
        return Promise.resolve();
      },
      onError() {
        /* eslint-disable-next-line */
        console.error('error');
      },
    },
  })

  static propTypes = {
    t: PropTypes.func.isRequired,
    dialogStore: PropTypes.shape({}).isRequired,
  };

  render() {
    const { props, form } = this;
    const { t } = props;
    return (
      <Dialog
        name="definetely-reject"
        header={t('dialogs:definetelyReject')}
        topIcon={(<RejectIcon />)}
        footer={null}
        className="definetely-reject"
        size="md"
      >
        <p className={styles.dialog__subtext}>
          {t('other:enterPassForConfirm')}
        </p>
        <FinPassFormWrapper form={form} />
      </Dialog>
    );
  }
}

export default DefinetelyReject;
