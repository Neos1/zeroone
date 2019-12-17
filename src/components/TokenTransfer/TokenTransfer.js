import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import TransferTokenForm from '../../stores/FormsStore/TransferTokenForm';
import MembersGroup from '../../stores/MembersStore/MembersGroup';
import Input from '../Input';
import { Password, Address, TokenCount } from '../Icons';
import Button from '../Button/Button';
import { EMPTY_DATA_STRING } from '../../constants';

import styles from './TokenTransfer.scss';

/**
 * Component form for transfer token
 */
@withTranslation()
@inject('membersStore', 'userStore')
@observer
class TokenTransfer extends React.Component {
  form = new TransferTokenForm({
    hooks: {
      onSuccess: (form) => {
        const {
          groupId, wallet, membersStore, userStore,
        } = this.props;
        const { address, count, password } = form.values();
        userStore.setPassword(password);
        membersStore.setTransferStatus('transfering');
        return membersStore.transferTokens(groupId, wallet, address, count)
          .then(() => {
            membersStore.setTransferStatus('success');
            membersStore.list[groupId].updateMemberBalanceAndWeight(wallet);
            membersStore.list[groupId].updateMemberBalanceAndWeight(address);
          })
          .catch(() => { membersStore.setTransferStatus('error'); });
      },
      onError: () => {
        /* eslint-disable-next-line */
        console.error('form error');
      },
    },
  })

  static propTypes = {
    t: PropTypes.func.isRequired,
    wallet: PropTypes.string,
    groupId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    membersStore: PropTypes.shape({
      transferTokens: PropTypes.func.isRequired,
      setTransferStatus: PropTypes.func.isRequired,
      list: PropTypes.arrayOf(
        PropTypes.instanceOf(MembersGroup),
      ).isRequired,
    }).isRequired,
    userStore: PropTypes.shape({
      setPassword: PropTypes.func.isRequired,
      singTransaction: PropTypes.func.isRequired,
    }).isRequired,
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
