import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import FinPassFormWrapper from '../FinPassFormWrapper/FinPassFormWrapper';

import styles from './Decision.scss';

@withTranslation()
class Decision extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    form: PropTypes.shape().isRequired,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
  };


  render() {
    const { props } = this;
    const {
      t, icon, title, form,
    } = props;
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
