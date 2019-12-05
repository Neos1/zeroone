import React from 'react';
import { withTranslation } from 'react-i18next';
import { PropTypes } from 'prop-types';
import { inject } from 'mobx-react';
import Button from '../Button/Button';

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
        {/* TODO refactor after new button */}
        <Button
          onClick={hide}
        >
          {t('buttons:continue')}
        </Button>
      </div>
    );
  }
}

export default DefaultDialogFooter;
