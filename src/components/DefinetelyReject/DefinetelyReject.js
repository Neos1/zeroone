import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { RejectIcon } from '../Icons';
import FinPassForm from '../../stores/FormsStore/FinPassForm';
import FinPassFormWrapper from '../FinPassFormWrapper/FinPassFormWrapper';

import styles from './DefinetelyReject.scss';

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
  };

  render() {
    const { props, form } = this;
    const { t } = props;
    return (
      <div className={styles['definetely-reject']}>
        <div className={styles['definetely-reject__icon']}>
          <RejectIcon />
        </div>
        <h2 className={styles['definetely-reject__title']}>
          {t('dialogs:definetelyReject')}
        </h2>
        <p className={styles['definetely-reject__subtext']}>
          {t('other:enterPassForConfirm')}
        </p>
        <FinPassFormWrapper form={form} />
      </div>
    );
  }
}

export default DefinetelyReject;
