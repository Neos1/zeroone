/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import { withTranslation } from 'react-i18next';
import MemberItem from '../../stores/MembersStore/MemberItem';
import { Pudding } from '../Icons';

import styles from './Members.scss';
import MembersGroupTable from './MembersGroupTable';

/**
 * Group members component
 */
@withTranslation()
class MembersGroupComponent extends React.Component {
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
    list: PropTypes.arrayOf(MemberItem).isRequired,
    /** text when list is empty */
    textForEmptyState: PropTypes.string.isRequired,
    /** translate method */
    t: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = {
      isOpen: false,
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
                    onRowClick={() => { console.log('row click'); }}
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
      </div>
    );
  }
}

export default MembersGroupComponent;
