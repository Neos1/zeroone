import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import DefaultMessage from './DefaultMessage';
import Button from '../Button/Button';

import styles from './Message.scss';

/**
 * Dialog with message about success token transfer
 */
@withTranslation(['dialogs', 'other'])
class ErrorMessage extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onButtonClick: PropTypes.func.isRequired,
  }

  render() {
    const { props: { t, onButtonClick } } = this;
    return (
      <div className={styles['message--transfer-error']}>
        <DefaultMessage
          title="Ошибка отправки транзакции"
        >
          <p className={styles.subtext}>Пожалуйста, повторите попытку</p>
        </DefaultMessage>
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

export default ErrorMessage;