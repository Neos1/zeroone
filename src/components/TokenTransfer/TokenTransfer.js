import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import TransferTokenForm from '../../stores/FormsStore/TransferTokenForm';
import Input from '../Input';
import { Password, Address, TokenCount } from '../Icons';
import Button from '../Button/Button';
import { EMPTY_DATA_STRING } from '../../constants';

import styles from './TokenTransfer.scss';

/**
 * Component form for transfer token
 */
@withTranslation()
class TokenTransfer extends React.Component {
  form = new TransferTokenForm({
    hooks: {
      onSuccess(form) {
        return Promise.resolve(form);
      },
      onError() {
        /* eslint-disable-next-line */
        console.error('form error');
      },
    },
  })

  static propTypes = {
    t: PropTypes.func.isRequired,
    wallet: PropTypes.string,
  }

  static defaultProps = {
    wallet: EMPTY_DATA_STRING,
  }

  handleClick = () => {
    /* eslint-disable-next-line */
    console.log('click');
  }

  render() {
    const { form } = this;
    const { props } = this;
    const { t, wallet } = props;
    return (
      <div className={styles['token-transfer']}>
        <h2 className={styles['token-transfer__title']}>
          {t('dialogs:tokenTransfer')}
        </h2>
        <form
          onSubmit={form.onSubmit}
          className={styles['token-transfer__form']}
        >
          <div className={styles.input__wrapper}>
            <Input field={form.$('address')}>
              <Address />
            </Input>
          </div>
          <div className={styles.input__wrapper}>
            <Input field={form.$('count')}>
              <TokenCount />
            </Input>
          </div>
          <div className={styles.input__wrapper}>
            <Input type="password" field={form.$('password')}>
              <Password />
            </Input>
          </div>
          <div className={styles.button__wrapper}>
            <Button
              type="submit"
            >
              {t('buttons:transfer')}
            </Button>
          </div>
          <div className={styles.wallet__wrapper}>{wallet}</div>
        </form>
        <div className={styles['token-transfer__button-container']}>
          <button
            type="button"
            className={styles['token-transfer__button']}
            onClick={this.handleClick}
          >
            {t('buttons:designateGroupAdministrator')}
          </button>
        </div>
      </div>
    );
  }
}

export default TokenTransfer;
