/* eslint-disable react/static-property-placement */
import React from 'react';
import { withTranslation } from 'react-i18next';
import { PropTypes } from 'prop-types';
import { inject } from 'mobx-react';
import { Button } from '../Button';

import styles from './Dialog.scss';

/**
 * Default component for dialog footer
 */
@withTranslation('buttons')
@inject('dialogStore')
class DefaultDialogFooter extends React.Component {
  static propTypes = {
    t: PropTypes.func,
    dialogStore: PropTypes.shape({
      hide: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    t: (k) => (k),
  };

  render() {
    const { props } = this;
    const { dialogStore, t } = props;
    const hide = () => dialogStore.hide();
    return (
      <div
        className={`
          ${styles.dialog__footer}
          ${styles['dialog__footer--default']}
        `}
      >
        <Button
          className={`btn--default btn--black ${styles.footer__button}`}
          onClick={hide}
        >
          {t('buttons:continue')}
        </Button>
      </div>
    );
  }
}

// DefaultDialogFooter.propTypes = {
//   t: PropTypes.func,
//   dialogStore: PropTypes.shape({
//     hide: PropTypes.func.isRequired,
//   }).isRequired,
// };

// DefaultDialogFooter.defaultProps = {
//   t: (k) => (k),
// };

export default DefaultDialogFooter;
