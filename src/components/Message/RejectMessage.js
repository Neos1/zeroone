import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
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
    onButtonClick: PropTypes.func,
    buttonText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({}),
    ]),
  };

  static defaultProps = {
    onButtonClick: null,
    buttonText: <Trans i18nKey="buttons:continue" />,
  }

  render() {
    const {
      props: {
        onButtonClick,
        t,
        buttonText,
      },
    } = this;
    return (
      <div className={styles['message--reject']}>
        <RejectIcon width={27} height={27} />
        <DefaultMessage
          title={t('dialogs:rejectMessage')}
        />
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

export default RejectMessage;
