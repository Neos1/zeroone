import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
import DefaultMessage from './DefaultMessage';
import Button from '../Button/Button';

import styles from './Message.scss';

/**
 * Message about agreed decision
 */
@withTranslation(['dialogs'])
class ERC20TokensUsed extends React.Component {
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
    buttonText: <Trans i18nKey="buttons:clear" />,
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
      <div className={styles['message--erc20']}>
        <DefaultMessage
          title={t('dialogs:ERC20TokensUsed')}
        >
          <p className={styles.subtext}>
            {t('other:erc20ListIsNotViewable')}
          </p>
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

export default ERC20TokensUsed;
