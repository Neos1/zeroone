/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { AdminIcon, Pudding } from '../Icons';

import styles from './VoterList.scss';

@withTranslation()
class VoterListTable extends React.PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        isAdmin: PropTypes.bool,
        wallet: PropTypes.string.isRequired,
        weight: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
  };

  renderTable = () => {
    const { props } = this;
    const { t, list } = props;
    return (
      <table className={styles['voter-list__table']}>
        <tbody>
          <tr>
            {/* eslint-disable-next-line */}
            <th></th>
            {/* eslint-disable-next-line */}
            <th></th>
            <th
              className={`
                ${styles['voter-list__table-th']}
              `}
            >
              {t('other:walletAddress')}
            </th>
            <th
              className={`
                ${styles['voter-list__table-th']}
                ${styles['voter-list__table-th--weight']}
              `}
            >
              {t('other:weightVote')}
            </th>
          </tr>
          {
            list.map((item, index) => (
              <tr
                key={`membersGroupTableTr--${index + 1}`}
                className={`
                  ${styles['voter-list__table-tr']}
                `}
              >
                <td
                  className={`
                    ${styles['voter-list__table-td']}
                    ${styles['voter-list__table-td--is']}
                  `}
                >
                  {item.isAdmin ? <AdminIcon /> : ''}
                </td>
                <td
                  className={`
                    ${styles['voter-list__table-td']}
                    ${styles['voter-list__table-td--img']}
                  `}
                >
                  <img
                    className={styles['voter-list__table-img']}
                    src={`http://tinygraphs.com/spaceinvaders/${item.wallet}?theme=base&numcolors=2&size=22&fmt=svg`}
                    alt="avatar"
                  />
                </td>
                <td
                  className={`
                    ${styles['voter-list__table-td']}
                    ${styles['voter-list__table-td--wallet']}
                  `}
                >
                  {item.wallet}
                </td>
                <td
                  className={`
                    ${styles['voter-list__table-td']}
                    ${styles['voter-list__table-td--weight']}
                  `}
                >
                  {`${item.weight}%`}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }

  render() {
    const { props } = this;
    const { t, list } = props;
    return (
      <>
        {
          list && list.length
            ? this.renderTable()
            : (
              <div className={styles['voter-list__no-data']}>
                <div className={styles['voter-list__no-data-icon']}>
                  <Pudding />
                </div>
                <div className={styles['voter-list__no-data-text']}>
                  {t('other:noData')}
                </div>
              </div>
            )
        }
      </>
    );
  }
}

export default VoterListTable;
