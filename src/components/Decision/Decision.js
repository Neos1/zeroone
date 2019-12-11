import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import FinPassForm from '../../stores/FormsStore/FinPassForm';
import FinPassFormWrapper from '../FinPassFormWrapper/FinPassFormWrapper';

import styles from './Decision.scss';

@withTranslation()
class Decision extends React.Component {
  form = new FinPassForm({
    hooks: {
      onSuccess: () => {
        this.onSuccess();
        return Promise.resolve();
      },
      onError: () => {
        /* eslint-disable-next-line */
        console.error('error');
      },
    },
  })

  static propTypes = {
    t: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
  };

  onSuccess = () => {
    const { props } = this;
    const { onSuccess } = props;
    onSuccess();
  }

  render() {
    const { props, form } = this;
    const { t, icon, title } = props;
    return (
      <div className={styles.decision}>
        <div className={styles.decision__icon}>
          {icon}
        </div>
        <h2 className={styles.decision__title}>
          {title}
        </h2>
        <p className={styles.decision__subtext}>
          {t('other:enterPassForConfirm')}
        </p>
        <FinPassFormWrapper form={form} />
      </div>
    );
  }
}

export default Decision;
