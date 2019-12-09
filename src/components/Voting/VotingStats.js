import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, LabelList } from 'recharts';
import { Trans, withTranslation } from 'react-i18next';

import styles from './Voting.scss';

const data = [
  {
    name: 'Admins', pros: 20, cons: 40, abstained: 40,
  },
  {
    name: 'Custom', pros: 85, cons: 15, abstained: 0,
  },
];

@withTranslation()
class VotingStats extends React.PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  /**
   * Method for render label in BarChart
   *
   * @param {object} props property label from BarChart
   * @param {string} option custom property for label
   * @returns {Node} ready label
   */
  renderLabel = (props, option) => {
    const {
      x, y, width, value,
    } = props;
    return (
      <text
        x={x + width / 2}
        y={y - 10}
        fill="#000"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        <tspan
          x={x + width / 2}
          dy="-1em"
          style={{
            fontWeight: 'bold',
            fontSize: '11px',
            lineHeight: '13px',
          }}
        >
          {`${value} %`}
        </tspan>
        <tspan
          x={x + width / 2}
          dy="1em"
          style={{
            fontWeight: 'bold',
            fontSize: '11px',
            lineHeight: '13px',
          }}
        >
          {
            option === 'pros'
              ? (<Trans i18nKey="other:agree" />)
              : (<Trans i18nKey="other:against" />)
          }
        </tspan>
      </text>
    );
  }

  render() {
    const { props } = this;
    const { t } = props;
    return (
      <div className={styles.voting__stats}>
        {
          data && data.length
            ? data.map((item, index) => (
              <div
                className={styles['voting__stats-col']}
                key={`voting__stats-col--${index + 1}`}
              >
                <BarChart
                  width={274}
                  height={300}
                  data={[item]}
                  margin={{
                    top: 35,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barGap={0}
                >
                  <Bar
                    dataKey="pros"
                    fill="#fff"
                    stroke="#000"
                  >
                    <LabelList
                      dataKey="pros"
                      position="top"
                      content={(contentProps) => this.renderLabel(contentProps, 'pros')}
                    />
                  </Bar>
                  <Bar
                    dataKey="cons"
                    fill="#000"
                    stroke="#000"
                  >
                    <LabelList
                      dataKey="cons"
                      position="top"
                      content={(contentProps) => this.renderLabel(contentProps, 'cons')}
                    />
                  </Bar>
                </BarChart>
                <div
                  className={styles['voting__stats-col-subtitle']}
                >
                  {
                    item.abstained === 0
                      ? t('other:everyoneVoted')
                      : `${t('other:didNotVote')} ${item.abstained || 0}%`
                  }
                </div>
                <div
                  className={styles['voting__stats-col-title']}
                >
                  {item.name}
                </div>
              </div>
            ))
            : null
        }
      </div>
    );
  }
}

export default VotingStats;
