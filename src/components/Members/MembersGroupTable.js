import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import MemberItem from '../../stores/MembersStore/MemberItem';

import styles from './Members.scss';
import { AdminIcon, BorderArrowIcon } from '../Icons';

const MembersGroupTable = ({
  list,
  t,
  onRowClick,
}) => (
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
            onClick={() => onRowClick(item)}
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
              {item.fullBalance}
              <span>
                <BorderArrowIcon />
              </span>
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
);

MembersGroupTable.propTypes = {
  list: PropTypes.arrayOf(MemberItem).isRequired,
  t: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
};

export default withTranslation()(MembersGroupTable);
