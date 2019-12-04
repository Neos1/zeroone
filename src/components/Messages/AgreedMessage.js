import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { VerifyIcon } from '../Icons';
import DefaultMessage from './DefaultMessage';
import Button from '../Button/Button';

import styles from './Message.scss';

/**
 * Message about agreed decision
 */
@withTranslation(['dialogs'])
class AgreedMessage extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onButtonClick: PropTypes.func.isRequired,
  };

  render() {
    const { t, onButtonClick } = this.props;
    return (
      <div className={styles['message--agreed']}>
        <VerifyIcon width={27} height={27} />
        <DefaultMessage
          title={t('dialogs:agreedMessage')}
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

export default AgreedMessage;
