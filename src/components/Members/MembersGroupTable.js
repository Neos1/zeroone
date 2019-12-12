/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import MemberItem from '../../stores/MembersStore/MemberItem';
import { AdminIcon, BorderArrowIcon } from '../Icons';

import styles from './Members.scss';

/**
 * Component for displaying table with members
 */
@withTranslation('other')
@observer
class MembersGroupTable extends React.PureComponent {
  static propTypes = {
    /** List members */
    list: PropTypes.arrayOf(PropTypes.instanceOf(MemberItem)).isRequired,
    /** Method for translate */
    t: PropTypes.func.isRequired,
    /** Method for handle table row click */
    onRowClick: PropTypes.func.isRequired,
  }

  render() {
    const {
      list,
      t,
      onRowClick,
    } = this.props;
    if (!list || !list.length) return null;
    return (
      <table className={styles['members__group-table']}>
        <tbody>
          <tr>
            {/* eslint-disable-next-line */}
            <th className={styles['members__group-table-th']}></th>
            {/* eslint-disable-next-line */}
            <th className={styles['members__group-table-th']}></th>
            <th className={styles['members__group-table-th']}>
              {t('other:walletAddress')}
            </th>
            <th
              className={`
                ${styles['members__group-table-th']}
                ${styles['members__group-table-th--weight']}
              `}
            >
              {t('other:weightVote')}
            </th>
            <th
              className={`
                ${styles['members__group-table-th']}
                ${styles['members__group-table-th--balance']}
              `}
            >
              {t('other:balance')}
            </th>
          </tr>
          {
            list.map((item, index) => (
              <tr
                key={`membersGroupTableTr--${index + 1}`}
                className={`
                  ${styles['members__group-table-tr']}
                `}
              >
                <td
                  className={`
                    ${styles['members__group-table-td']}
                    ${styles['members__group-table-td--is']}
                  `}
                >
                  {item.isAdmin ? <AdminIcon /> : ''}
                </td>
                <td
                  className={`
                    ${styles['members__group-table-td']}
                    ${styles['members__group-table-td--img']}
                  `}
                >
                  <img
                    className={styles['members__group-table-img']}
                    src={`http://tinygraphs.com/spaceinvaders/${item.wallet}?theme=base&numcolors=2&size=22&fmt=svg`}
                    alt="avatar"
                  />
                </td>
                <td
                  className={`
                    ${styles['members__group-table-td']}
                    ${styles['members__group-table-td--wallet']}
                  `}
                >
                  {item.wallet}
                </td>
                <td
                  className={`
                    ${styles['members__group-table-td']}
                    ${styles['members__group-table-td--weight']}
                  `}
                >
                  {`${item.weight}%`}
                </td>
                <td
                  className={`
                    ${styles['members__group-table-td']}
                    ${styles['members__group-table-td--balance']}
                  `}
                >
                  <button
                    type="button"
                    onClick={() => { onRowClick(item.wallet); }}
                  >
                    {item.fullBalance}
                    <span>
                      <BorderArrowIcon />
                    </span>
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

export default MembersGroupTable;
