/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import TransferTokenForm from '../../stores/FormsStore/TransferTokenForm';
import Input from '../Input';
import { Password, Address, TokenCount } from '../Icons';
import { Button } from '../Button';
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

  render() {
    const { form } = this;
    const { props } = this;
    const { t, wallet } = props;
    return (
      <form onSubmit={form.onSubmit}>
        <div className={styles.input__wrapper}>
          <Input field={form.$('wallet')}>
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
          {/* TODO refactor after finalize buttons component */}
          <Button
            type="submit"
            className="btn--default btn--black"
          >
            {t('buttons:transfer')}
          </Button>
        </div>
        <div className={styles.wallet__wrapper}>{wallet}</div>
      </form>
    );
  }
}

export default TokenTransfer;
