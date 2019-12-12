/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { Collapse } from 'react-collapse';
import { withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import MemberItem from '../../stores/MembersStore/MemberItem';
import { Pudding } from '../Icons';
import MembersGroupTable from './MembersGroupTable';
import Dialog from '../Dialog/Dialog';
import TokenTransfer from '../TokenTransfer/TokenTransfer';
import {
  TokenInProgressMessage,
  TransferSuccessMessage,
  TransferErrorMessage,
} from '../Message';

import styles from './Members.scss';

/**
 * Group members component
 *
 * @param selectedWallet selected wallet
 * @param item
 */
@withTranslation()
@inject('dialogStore', 'membersStore')
@observer
class MembersGroupComponent extends React.Component {
  transferSteps = {
    input: 0,
    transfering: 1,
    success: 2,
    error: 3,
  }

  static propTypes = {
    /** id group */
    id: PropTypes.number.isRequired,
    /** name group */
    name: PropTypes.string.isRequired,
    /** balance with token */
    fullBalance: PropTypes.string.isRequired,
    /** info about group */
    description: PropTypes.string.isRequired,
    /** wallet group */
    wallet: PropTypes.string.isRequired,
    /** token group */
    token: PropTypes.string.isRequired,
    /** member list */
    list: PropTypes.arrayOf(PropTypes.instanceOf(MemberItem)).isRequired,
    /** text when list is empty */
    textForEmptyState: PropTypes.string.isRequired,
    /** translate method */
    t: PropTypes.func.isRequired,
    dialogStore: PropTypes.shape({
      show: PropTypes.func.isRequired,
      hide: PropTypes.func.isRequired,
    }).isRequired,
    membersStore: PropTypes.shape({
      transferStatus: PropTypes.number.isRequired,
      setTransferStatus: PropTypes.func.isRequired,
    }).isRequired,
  }


  constructor() {
    super();
    this.state = {
      isOpen: false,
      selectedWallet: '',
    };
  }

  /**
   * Return actual modal props state
   *
   * @returns {object} actual modal props
   */
  @computed
  get modalPropsSwitch() {
    const {
      membersStore: { transferStatus },
    } = this.props;
    const { transferSteps } = this;
    switch (transferStatus) {
      case (transferSteps.input):
        return { header: null, footer: null };
      case (transferSteps.transfering):
        return { header: null, footer: null, closeable: false };
      case (transferSteps.success):
        return { header: null, footer: null };
      case (transferSteps.error):
        return { header: null, footer: null };
      default:
        return null;
    }
  }

  /**
   * Method for return actual modal content
   *
   * @returns {Node} actual modal content
   */
  modalContentSwitch = () => {
    const {
      id,
      membersStore: { transferStatus },
      dialogStore,
    } = this.props;
    const { selectedWallet } = this.state;
    const { transferSteps } = this;
    switch (transferStatus) {
      case (transferSteps.input):
        return <TokenTransfer wallet={selectedWallet} groupId={id} />;
      case (transferSteps.transfering):
        return <TokenInProgressMessage />;
      case (transferSteps.success):
        return <TransferSuccessMessage onButtonClick={dialogStore.hide} />;
      case (transferSteps.error):
        return <TransferErrorMessage onButtonClick={dialogStore.hide} />;
      default:
        return null;
    }
  }

  /**
   * Method for change isOpen state
   */
  toggleOpen = () => {
    const { membersStore } = this.props;
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
    membersStore.setTransferStatus('input');
  }

  handleClick = (selectedWallet) => {
    const { membersStore } = this.props;
    membersStore.setTransferStatus('input');
    const { dialogStore, id } = this.props;
    this.setState({ selectedWallet });
    dialogStore.show(`transfer-token-${id}`);
  }

  render() {
    const {
      id,
      name,
      fullBalance,
      description,
      wallet,
      token,
      list,
      textForEmptyState,
      t,
    } = this.props;
    const { isOpen } = this.state;
    return (
      <div className={styles.members__group}>
        <button
          type="button"
          className={styles['members__group-button']}
          onClick={this.toggleOpen}
        >
          <div className={styles['members__group-id']}>{`#${id}`}</div>
          <div className={styles['members__group-main']}>
            <div className={styles['members__group-name']}>
              {name}
            </div>
            <div className={styles['members__group-description']}>
              {description}
            </div>
          </div>
          <div className={styles['members__group-divider']} />
          <div className={styles['members__group-extra']}>
            <div className={styles['members__group-balance']}>
              {fullBalance}
            </div>
            <div className={styles['members__group-token']}>
              {token}
            </div>
          </div>
          <div className={styles['members__group-wallet']}>{wallet}</div>
        </button>
        <Collapse isOpened={isOpen}>
          {
            list && list.length
              ? (
                <div className={styles['members__group-data']}>
                  <MembersGroupTable
                    list={list}
                    onRowClick={this.handleClick}
                  />
                </div>
              )
              : (
                <div className={styles['members__group-no-data']}>
                  <div className={styles['members__group-no-data-icon']}>
                    <Pudding />
                  </div>
                  <div className={styles['members__group-no-data-text']}>
                    {t(textForEmptyState)}
                  </div>
                </div>
              )
          }
        </Collapse>
        <Dialog
          name={`transfer-token-${id}`}
          size="md"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...this.modalPropsSwitch}
        >
          {this.modalContentSwitch()}
        </Dialog>
      </div>
    );
  }
}

export default MembersGroupComponent;
