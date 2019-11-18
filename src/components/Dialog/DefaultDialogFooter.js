import React from 'react';
import { withTranslation } from 'react-i18next';
import { PropTypes } from 'prop-types';
import { inject } from 'mobx-react';
import { Button } from '../Button';

import styles from './Dialog.scss';

@withTranslation('buttons')
@inject('dialogStore')
class DefaultDialogFooter extends React.Component {
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
          className="btn--default btn--black"
          onClick={hide}
        >
          {t('buttons:continue')}
        </Button>
      </div>
    );
  }
}

DefaultDialogFooter.propTypes = {
  t: PropTypes.func.isRequired,
  dialogStore: PropTypes.shape({
    hide: PropTypes.func.isRequired,
  }).isRequired,
};

export default DefaultDialogFooter;
