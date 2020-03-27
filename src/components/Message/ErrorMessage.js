import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
import DefaultMessage from './DefaultMessage';
import Button from '../Button/Button';

import styles from './Message.scss';

/**
 * Dialog with message about success token transfer
 */
@withTranslation(['dialogs', 'other', 'headings'])
class ErrorMessage extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onButtonClick: PropTypes.func,
    buttonText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({}),
    ]),
  }

  static defaultProps = {
    onButtonClick: null,
    buttonText: <Trans i18nKey="buttons:continue" />,
  }

  render() {
    const { props: { t, onButtonClick, buttonText } } = this;
    return (
      <div className={styles['message--transfer-error']}>
        <DefaultMessage
          title={t('headings:failedTransaction.heading')}
        >
          <p className={styles.subtext}>{t('headings:failedTransaction.subheading')}</p>
        </DefaultMessage>
        {
          onButtonClick
            ? (
              <div className={styles.footer}>
                <Button
                  onClick={onButtonClick}
                >
                  {buttonText}
                </Button>
              </div>
            )
            : null
        }
      </div>
    );
  }
}

export default ErrorMessage;
