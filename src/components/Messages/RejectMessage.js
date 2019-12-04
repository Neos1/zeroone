import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { RejectIcon } from '../Icons';
import Button from '../Button/Button';
import DefaultMessage from './DefaultMessage';

import styles from './Message.scss';

/**
 * Message about reject decision
 */
@withTranslation(['dialogs', 'buttons'])
class RejectMessage extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onButtonClick: PropTypes.func.isRequired,
  };

  render() {
    const { t, onButtonClick } = this.props;
    return (
      <div className={styles['message--reject']}>
        <RejectIcon width={27} height={27} />
        <DefaultMessage
          title={t('dialogs:rejectMessage')}
        />
        <div className={styles.footer}>
          <Button
            onClick={onButtonClick}
          >
            {t('buttons:continue')}
          </Button>
        </div>
      </div>
    );
  }
}

export default RejectMessage;
