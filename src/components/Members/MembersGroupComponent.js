/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import { withTranslation } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import MemberItem from '../../stores/MembersStore/MemberItem';
import { Pudding } from '../Icons';
import MembersGroupTable from './MembersGroupTable';
import Dialog from '../Dialog/Dialog';
import TokenTransfer from '../TokenTransfer/TokenTransfer';

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
    }).isRequired,
    membersStore: PropTypes.shape({
      transferStatus: PropTypes.number.isRequired,
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
   * Method for change isOpen state
   */
  toggleOpen = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  }

  handleClick = (selectedWallet) => {
    const { dialogStore, id } = this.props;
    this.setState({ selectedWallet });
    dialogStore.show(`transfer-token-${id}`);
  }

  // eslint-disable-next-line consistent-return
  modalContentSwitch(step) {
    const { id } = this.props;
    const { selectedWallet } = this.state;
    const { transferSteps } = this;
    switch (step) {
      case (transferSteps.input):
        return <TokenTransfer wallet={selectedWallet} groupId={id} />;
      case (transferSteps.transfering):
        return null;
      case (transferSteps.success):
        return null;
      case (transferSteps.error):
        return null;
      default:
        return null;
    }
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
      membersStore: { transferStatus },
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
        <Dialog name={`transfer-token-${id}`} size="md" footer={null}>
          {this.modalContentSwitch(transferStatus)}
        </Dialog>
      </div>
    );
  }
}

export default MembersGroupComponent;
